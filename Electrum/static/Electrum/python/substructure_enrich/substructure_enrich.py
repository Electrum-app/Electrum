"""License Information
substructure-enrich
Electrum utility for enrichment analysis of metabolite substructures
https://github.com/Electrum-app/Electrum/
alias: substructure-enrich

Copyright (C) 2020-2021 Jordan A. Berg
Email: jordan<dot>berg<at>biochem<dot>utah<dot>edu

This program is free software: you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free Software
Foundation, either version 3 of the License, or (at your option) any later
version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with
this program.  If not, see <https://www.gnu.org/licenses/>.
"""
from __future__ import print_function

"""Import dependencies
"""
from django.http import HttpResponse
from collections import Counter
from fisher import pvalue_npy
import statsmodels.api as sm
import pandas as pd
import numpy as np
import json
import re
import sys
import os

MIDAS_DATA = "MIDAS_unified-latest.txt"
CHEMONTID_DICTIONARY = "CHEMONTID-mapper.json"
DATA_PATH = os.path.join(
    os.path.dirname(__file__),
    "..",
    "..",
    "data"
)


"""Set global variables
"""
def test_path():
    DATA_PATH = os.path.join(
        os.getcwd(),
        "data"
    )


def import_table(
        _path,
        _file,
        index_col=None):
    """Import URL as tab-delimited table
    """

    return pd.read_csv(
        os.path.join(_path, _file),
        sep='\t',
        index_col=index_col,
        low_memory=False
    )


def import_database_str(
        database,
        index_col=None):
    """Import URL as tab-delimited table
    """

    from io import StringIO
    return pd.read_csv(
        StringIO(database),
        sep='\t',
        index_col=index_col,
        low_memory=False
    )


def import_json(
        _path,
        _file):
    """Import URL as JSON-formatted dictionary
    """
    with open(os.path.join(_path, _file)) as json_file:
        data = json.load(json_file)

    return data



def crossref_databases(
        midas_table,
        substructure_dictionary,
        metabolite_reference):
    """Crossreference MIDAS data with the substructure database using the Electrum metabolite mapping reference
    """
    # Use to prevent excessive warning messages
    non_mappers = set()
    non_matchers = set()
    non_hmdb = set()

    midas_table_c = midas_table.copy()

    # Add HMDB ID to MIDAS table
    # Add substructure annotations to MIDAS table
    for index, row in midas_table_c.iterrows():

        if ';' in row['metabolite']:
            metabolite = row['metabolite'].split(';')[0]
        else:
            metabolite = row['metabolite']

        metabolite_simplified = re.sub(r'\W+', '', metabolite).lower()

        if metabolite_simplified in metabolite_reference:
            hmdb_id = metabolite_reference[metabolite_simplified]['hmdb_id']

            if 'hmdb' in str(hmdb_id).lower():

                # Add HMDB ID
                midas_table_c.at[index, 'HMDB_ID'] = str(hmdb_id)

                # Add sub-structure IDs and names
                i = 0
                while i < 12:
                    hmdb_id = 'HMDB' + hmdb_id.replace('HMDB', '').zfill(i)
                    if hmdb_id in substructure_dictionary:
                        midas_table_c.at[index, 'taxonomy_ids'] = (
                            substructure_dictionary[hmdb_id]['taxonomy_ids']
                        )
                        midas_table_c.at[index, 'taxonomy_terms'] = (
                            substructure_dictionary[hmdb_id]['taxonomy_terms']
                        )
                        break
                    else:
                        i += 1
                else:
                    if metabolite not in non_hmdb:
                        print(
                            'Unable to find', hmdb_id,
                            '(', metabolite, ') in substructure database')
                        non_hmdb.add(metabolite)

            else:
                if metabolite not in non_mappers:
                    print("HMDB ID not available for", metabolite)
                    non_mappers.add(metabolite)
        else:
            if metabolite not in non_matchers:
                print('Unable to match', metabolite)
                non_matchers.add(metabolite)

    return midas_table_c


def substructure_enrichment(
        unified_table,
        chemontid_reference,
        TARGET,
        THRESHOLD):
    """Perform enrichment analysis
    """ 
    # Target selection table 
    unified_table_target = unified_table.loc[unified_table['query_protein'] == TARGET]

    print("----")
    print("Input table:")
    print("----")
    print(unified_table_target)
    print("----")

    # Init results table 
    results_table = pd.DataFrame()
    results_table["CHEMONTID"] = unified_table_target["taxonomy_ids"].str.split(';').explode('taxonomy_ids').unique().tolist()
    results_table.index = results_table["CHEMONTID"]
    results_table.index.name = None

    # Generate EXPECTED CHEMONTID distributions

    ### (C) Get expected 
    expected_counter = Counter(unified_table_target["taxonomy_ids"].str.split(';').explode('taxonomy_ids').tolist())
    results_table["C"] = 0
    results_table["C"] = results_table["CHEMONTID"].map(expected_counter).fillna(results_table["C"])

    ### (D) Total number of metabolites in library
    LIBRARY_SIZE = len(unified_table["metabolite"].unique().tolist()) 
    results_table["D"] = LIBRARY_SIZE - results_table["C"]

    # Generate OBSERVED CHEMONTID distributions
    unified_table_threshold = unified_table_target.loc[unified_table_target['q_value'] < THRESHOLD]

    ### (A) Get observed 
    observed_counter = Counter(unified_table_threshold["taxonomy_ids"].str.split(';').explode('taxonomy_ids').tolist())
    results_table["A"] = 0
    results_table["A"] = results_table["CHEMONTID"].map(observed_counter).fillna(results_table["A"])

    ### (B) Total number of observed metabolites
    OBSERVED_COUNT = len(unified_table_threshold["metabolite"].unique().tolist()) 
    results_table["B"] = OBSERVED_COUNT - results_table["A"]

    results_table = results_table[["CHEMONTID", "A", "B", "C", "D"]]


    #Fisher Exact Test. For each row, runs Fisher Exact on 4 columns and outputs final result to new column.
    #Vectorizing the below could speed it up if we still want live p-value updates:
    #https://stackoverflow.com/questions/34947578/how-to-vectorize-fishers-exact-test
    
    # Remove any substructures where there are 0 or 1 counts to prevent weighting downstream FDR
    results_table = results_table.loc[results_table["A"] > 1]

    results_table["Fold_change"] = (results_table["A"] / results_table["B"]) / (results_table["C"] / results_table["D"])

    _arr = results_table[['A', 'B', 'C', 'D']].to_numpy(dtype=np.uint, copy=True)
    _, _, twosided = pvalue_npy(_arr[:, 0], _arr[:, 1], _arr[:, 2], _arr[:, 3])
    results_table["P_value"] = twosided
    results_table = results_table.sort_values(by="P_value")

    _, results_table["FDR"], _, _ = sm.stats.multipletests(
        results_table["P_value"].values,
        alpha=THRESHOLD,
        method="fdr_bh",
        is_sorted=True
    )

    # Add common substructure names to results table 
    results_table["Term"] = results_table["CHEMONTID"].map(chemontid_reference).fillna(results_table["CHEMONTID"])

    return results_table


def __main__(TARGET, THRESHOLD, DATABASE):
    """
    Import reference files and MIDAS database
    Cross-reference MIDAS with sub-structure annotations
    Output enrichment table for each sub-structure per MIDAS query protein
    """

    TARGET = str(TARGET)
    THRESHOLD = float(THRESHOLD)
    DATABASE = str(DATABASE)

    # Import MIDAS database
    unified_table = import_database_str(
        database=DATABASE)

    # Import metabolite reference for HMDB ID mapping between databases
    metabolite_reference = import_json(
        _path=DATA_PATH,
        _file="metabolites.json")

    substructure_dictionary = import_json(
        _path=DATA_PATH,
        _file="CHEMONTID-substructure-dictionary.json")

    unified_table = crossref_databases(
        midas_table=unified_table,
        substructure_dictionary=substructure_dictionary,
        metabolite_reference=metabolite_reference)

    chemontid_reference = import_json(
        _path=DATA_PATH,
        _file=CHEMONTID_DICTIONARY)

    results = substructure_enrichment(
        unified_table=unified_table,
        chemontid_reference=chemontid_reference,
        TARGET=TARGET,
        THRESHOLD=THRESHOLD)

    print("----")
    print("Results table:")
    print("----")
    print(results)
    print("----")

    return HttpResponse(results.to_json(), content_type="application/json")

if __name__ == '__main__':
    __main__()