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
from collections import Counter
from fisher import pvalue_npy
import statsmodels.api as sm
import pandas as pd
import numpy as np
import json
import re
import sys
import os


"""Set global variables
"""
MIDAS_DATA = "MIDAS_unified-latest.txt"
CHEMONTID_DICTIONARY = "CHEMONTID-mapper.json"
DATA_PATH = os.path.join(
    os.path.dirname(__file__),
    "..",
    "..",
    "data"
)
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

def import_json(
        _path,
        _file):
    """Import URL as JSON-formatted dictionary
    """
    with open(os.path.join(_path, _file)) as json_file:
        data = json.load(json_file)

    return data

def substructure_enrichment(
        unified_table,
        chemontid_reference,
        TARGET,
        THRESHOLD):
    """Perform enrichment analysis
    """ 
    # Target selection table 
    unified_table_target = unified_table.loc[unified_table['query_protein'] == TARGET]

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


def __main__():
    """
    Import reference files and MIDAS database
    Cross-reference MIDAS with sub-structure annotations
    Output enrichment table for each sub-structure per MIDAS query protein
    """

    # Get sys.args 
    if len(sys.argv) != 3:
        raise Exception("Inproper number of variables provided. Exiting...")
    TARGET = str(sys.argv[1]) #"CS"
    THRESHOLD = float(sys.argv[2]) #0.1

    # Import MIDAS database
    unified_table = import_table(
        _path=DATA_PATH,
        _file=MIDAS_DATA)

    chemontid_reference = import_json(
        _path=DATA_PATH,
        _file=CHEMONTID_DICTIONARY)

    results = substructure_enrichment(
        unified_table=unified_table,
        chemontid_reference=chemontid_reference,
        TARGET=TARGET,
        THRESHOLD=THRESHOLD)
    
    #results.to_csv(os.path.join(
    #    DATA_PATH,
    #    "results.csv"
    #))
    print(results.to_json(), file = sys.stdout)


if __name__ == '__main__':
    __main__()