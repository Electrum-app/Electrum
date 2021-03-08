"""Import dependencies
"""
import os
import re
import json
import numpy as np
import pandas as pd

"""Set global variables
"""
MIDAS_DATA = "MIDAS-latest.txt"
SUBSTRUCTURE_DATA = "Substructures-DB-latest.tsv"
METABOLITE_DICTIONARY = "metabolites.json"
DATA_PATH = os.path.join(
    os.path.dirname(__file__),
    "..",
    "..",
    "..",
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

def __main__():
    """
    Import reference files and MIDAS database
    Cross-reference MIDAS with sub-structure annotations
    Output enrichment table for each sub-structure per MIDAS query protein
    """

    # Import MIDAS database
    midas_table = import_table(
        _path=DATA_PATH,
        _file=MIDAS_DATA)

    # Import parsed ClassyFire sub-structure database
    substructure_table = import_table(
        _path=DATA_PATH,
        _file=SUBSTRUCTURE_DATA,
        index_col=0)
    substructure_table.index = substructure_table['hmdb_id']
    substructure_dictionary = substructure_table.T.to_dict()

    # Import metabolite reference for HMDB ID mapping between databases
    metabolite_reference = import_json(
        _path=DATA_PATH,
        _file=METABOLITE_DICTIONARY)

    unified_table = crossref_databases(
        midas_table=midas_table,
        substructure_dictionary=substructure_dictionary,
        metabolite_reference=metabolite_reference)

    # Perform enrichment analysis



    # Output enrichment table 




if __name__ == '__main__':
    __main__()



def __test__():
    """
    """
    output = 'C:\\Users\\jorda\\Desktop\\'
    __file__ = 'C:\\Users\\jorda\\Desktop\\projects\\Electrum\\bin\\python\\get_enrichment_sets\\__main__.py'
