"""License Information
electrum-utils
Back-end utils tool for Electrum
https://github.com/Electrum-app/Electrum/
alias: electrum-utils

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
from datetime import datetime
import pandas as pd
import itertools
import requests
import zipfile
import json
import sys
import io
import re
import os

SUBSTRUCTURE_DATA = "Substructures-DB-latest.txt"
CHEMONTID_DICTIONARY = "CHEMONTID-mapper.json"
METABOLITE_DICTIONARY = "metabolites.json"

ONT_URL = 'http://classyfire.wishartlab.com/system/downloads/1_0/chemont/ChemOnt_2_1.obo.zip'
ONT_FILE = 'ChemOnt_2_1.obo'
ONT_DELIMITER = '[Term]'

SDF_URL = 'https://hmdb.ca/system/downloads/current/structures.zip'
SDF_FILE = 'structures.sdf'
SDF_DELIMITER = '$$$$'
ENCODING = 'utf-8'
CLASSYFIRE_HMDB_URL = 'http://classyfire.wishartlab.com/system/downloads/1_0/datasets/HMDB_36_classyfire_21_annotations.csv.zip'
CLASSYFIRE_HMDB_FILE = 'HMDB_36_classyfire_21_annotations.csv'
CLASSYFIRE_CHEBI_URL = 'http://classyfire.wishartlab.com/system/downloads/1_0/datasets/ChEBI_126_classyfire_21_annotations.csv.zip'
CLASSYFIRE_CHEBI_FILE = 'ChEBI_126_classyfire_21_annotations.csv'

HMDB_KEY = 'HMDB_ID'
ID_KEY = 'DATABASE_ID'
DATABASE_KEY = 'DATABASE_NAME'
SMILES_KEY = 'SMILES'
FORMULA_KEY = 'FORMULA'
IUPAC_KEY = 'JCHEM_IUPAC'
NAME_KEY = 'GENERIC_NAME'
SYNONYMS_KEY = 'SYNONYMS'
SYNONYM_DELIMITER = ';'

CLASSYFIER_ID_COLUMN = 0
CLASSYFIER_ONT_COLUMN = 1
CLASSYFIER_CLASS_COLUMN = 2


"""Classes
"""
class Metabolite:
    def __init__(
            self,
            record):
        self.sdf_record = record
        self.hmdb_id = self.lookup_sdf_info(HMDB_KEY)
        self.iupac_id = self.lookup_sdf_info(IUPAC_KEY)
        self.common_name = self.lookup_sdf_info(NAME_KEY)
        self.smiles = self.lookup_sdf_info(SMILES_KEY)
        self.synonyms = self.lookup_sdf_info(SYNONYMS_KEY)
        self.taxonomy_ids = []
        self.taxonomy_terms = []

        del self.sdf_record

    def lookup_sdf_info(
            self,
            _key,
            _delimiter=SYNONYM_DELIMITER):
        """
        """

        for index in range(len(self.sdf_record)):
            if _key in self.sdf_record[index]:
                contents = self.sdf_record[index + 1] \
                    .replace('\n', '') \
                    .replace(' ', '')
                if _delimiter in contents:
                    contents = contents.split(_delimiter)
                return contents


"""Functions
"""
def download_zip_archive(
        output,
        zip_url,
        file_name):
    """ Download HMDB SDF file containing all database SDF records
    """
    output_file = os.path.join(output, file_name)
    this_url = requests.get(zip_url)
    if this_url.ok:
        print("Unzipping HMDB metabolite SDF reference...")
        this_zip = zipfile.ZipFile(io.BytesIO(this_url.content))
        this_zip.extractall(output)
        this_zip = None
    else:
        raise Exception("Unable to download file at: " + zip_url)
    return output_file


def parse_records_as_list(
        sdf_file,
        _delimiter=SDF_DELIMITER,
        _encoding=ENCODING):
    """
    """
    output_records = []
    with open(sdf_file, "r", encoding=_encoding) as _f:
        for key, group in itertools.groupby(_f, lambda _l: _delimiter in _l):
            if not key:
                group = [x for x in list(group) if x != '\n']
                output_records.append(group)
    return output_records


def parse_records_as_datatable(
        input_file,
        _delimiter=','):
    """
    """
    output_records = pd.read_csv(
        input_file,
        sep=_delimiter,
        error_bad_lines=False,
        warn_bad_lines=True)
    return output_records


def dict_from_datatable(
        input_source,
        id_col=CLASSYFIER_ID_COLUMN,
        ont_col=CLASSYFIER_ONT_COLUMN):
    """
    """
    table_dict = {}
    for index, row in input_source.iterrows():
        if row[id_col] in table_dict:
            table_dict[row[id_col]].append(row[CLASSYFIER_ONT_COLUMN])
        else:
            table_dict[row[id_col]] = [row[CLASSYFIER_ONT_COLUMN]]
    return table_dict


def make_ontology_dictionary(
        hmdb_source,
        chebi_source,
        ont_col=CLASSYFIER_ONT_COLUMN,
        name_col=CLASSYFIER_CLASS_COLUMN):
    """
    """

    def add_ontology(
            ont_dict,
            data_source,
            ont_col,
            name_col):
        for index, row in data_source.iterrows():
            if row[ont_col] in ontology_dictionary:
                if ont_dict[row[ont_col]] != row[name_col]:
                    print(
                        'Mismatched ID & Name for: '
                        + str(row[ont_col])
                        + '\n- ' + str(ont_dict[row[ont_col]])
                        + '\n- ' + str(row[name_col])
                        + '\n')
            else:
                ont_dict[row[ont_col]] = row[name_col]
        return ont_dict

    ontology_dictionary = {}
    ontology_dictionary = add_ontology(
        ontology_dictionary,
        chebi_source,
        ont_col,
        name_col)
    ontology_dictionary = add_ontology(
        ontology_dictionary,
        hmdb_source,
        ont_col,
        name_col)
    print('Found ' + str(len(ontology_dictionary.keys())) + ' terms')
    return ontology_dictionary


def parse_metadata_from_records(
        records):
    """
    """
    output_metadata = []
    for r in records:
        thisSDF = Metabolite(record=r)
        output_metadata.append(thisSDF)
    return output_metadata


def retrieve_substructures(
        records,
        hmdb_dictionary,
        chebi_dictionary,
        ontology_dictionary):
    """
    """
    for r in range(len(records)):
        base_id = records[r].hmdb_id \
            .replace('HMDB', '') \
            .lstrip('0')
        for x in range(12):
            this_id = ('HMDB' + base_id.zfill(x + 1))
            if this_id in hmdb_dictionary:
                records[r].taxonomy_ids = hmdb_dictionary[this_id]
                for t in records[r].taxonomy_ids:
                    if t in ontology_dictionary:
                        records[r].taxonomy_terms \
                            .append(ontology_dictionary[t])
                break
    return records


def write_output(
        output_database,
        output_location,
        synonym_key='synonyms',
        tax_id_key='taxonomy_ids',
        tax_term_key='taxonomy_terms'):
    """
    """
    def try_join(
            l,
            sep=';'):
        try:
            return str(sep).join(map(str, l))
        except TypeError:
            return ''

    mod_output = [d.__dict__ for d in output_database]
    output_table = pd.DataFrame(mod_output)
    output_table[synonym_key] = [
        try_join(l) for l in output_table[synonym_key]]
    output_table[tax_id_key] = [
        try_join(l) for l in output_table[tax_id_key]]
    output_table[tax_term_key] = [
        try_join(l) for l in output_table[tax_term_key]]
    output_table.to_csv(
        os.path.join(
            str(output_location), SUBSTRUCTURE_DATA),
        sep='\t')


def write_dictionary(
        output_dictionary,
        output_location,
        output_name='CHEMONTID-mapper.json'):
    """
    """
    with open(os.path.join(output_location, output_name), 'w') as fp:
        json.dump(output_dictionary, fp)


def clean_downloads(
        output_files):
    """
    """
    for o in output_files:
        try:
            os.remove(o)
        except:
            print('Unable to remove file ' + o)


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

def parse_ont_as_list(
        ont_file,
        _delimiter=ONT_DELIMITER,
        _encoding=ENCODING):
    """
    """
    output_records = []
    with open(ont_file, "r", encoding=_encoding) as _f:
        for key, group in itertools.groupby(_f, lambda _l: _delimiter in _l):
            if not key:
                group = [x for x in list(group) if x != '\n']
                output_records.append(group)
    return output_records

def parse_dict_from_records(
        ont_data):

    ont_dict = {}
    for x in ont_data:
        id = ""
        name = ""
        is_a = ""
        
        _x = [i for i in x if "is_a"]
        if len(_x) > 0:
            for i in x:
                if "id: " in i:
                    id = i.split("id: ")[1].split("\n")[0]
                if "name: " in i:
                    name = i.split("name: ")[1].split("\n")[0]
                if "is_a: " in i:
                    is_a = i.split("is_a: ")[1].split(" ! ")[0]
        
        ont_dict[id] = {
            "id": id,
            "name": name,
            "is_a": is_a
        }
    
    return ont_dict

def __main__(args_dict):
    """
    """

    # Parse all HMDB SDF records
    sdf_file = download_zip_archive(
        output=args_dict["output"],
        zip_url=SDF_URL,
        file_name=SDF_FILE)
    record_list = parse_records_as_list(
        sdf_file=sdf_file)
    output_metadata = parse_metadata_from_records(
        records=record_list)

    # Parse ClassyFire HMDB records
    cf_hmdb_file = download_zip_archive(
        output=args_dict["output"],
        zip_url=CLASSYFIRE_HMDB_URL,
        file_name=CLASSYFIRE_HMDB_FILE)
    hmdb_records = parse_records_as_datatable(
        input_file=cf_hmdb_file)
    hmdb_dictionary = dict_from_datatable(
        input_source=hmdb_records)

    # Parse ClassyFire CHEBI records
    cf_chebi_file = download_zip_archive(
        output=args_dict["output"],
        zip_url=CLASSYFIRE_CHEBI_URL,
        file_name=CLASSYFIRE_CHEBI_FILE)
    chebi_records = parse_records_as_datatable(
        input_file=cf_chebi_file)
    chebi_dictionary = dict_from_datatable(
        input_source=chebi_records)

    # Make ontology reference
    ontology_dictionary = make_ontology_dictionary(
        hmdb_source=hmdb_records,
        chebi_source=chebi_records)

    write_dictionary(
        output_dictionary=ontology_dictionary,
        output_location=args_dict["output"])

    # Add ontology IDs and terms to each SDF record
    output_substructures = retrieve_substructures(
        records=output_metadata,
        hmdb_dictionary=hmdb_dictionary,
        chebi_dictionary=chebi_dictionary,
        ontology_dictionary=ontology_dictionary)

    # Output and clean
    write_output(
        output_database=output_substructures,
        output_location=args_dict["output"])

    # Prepare unified table for downstream usage

    # Import MIDAS database
    midas_table = pd.read_csv(
        args_dict["database"],
        sep='\t',
        index_col=None,
        low_memory=False
    )

    # Import parsed ClassyFire sub-structure database
    substructure_table = import_table(
        _path=args_dict["output"],
        _file=SUBSTRUCTURE_DATA,
        index_col=0)
    substructure_table.index = substructure_table['hmdb_id']
    substructure_dictionary = substructure_table.T.to_dict()

    # Import metabolite reference for HMDB ID mapping between databases
    metabolite_reference = import_json(
        _path=args_dict["output"],
        _file=METABOLITE_DICTIONARY)

    unified_table = crossref_databases(
        midas_table=midas_table,
        substructure_dictionary=substructure_dictionary,
        metabolite_reference=metabolite_reference)

    unified_table.to_csv(
        os.path.join(
            args_dict["output"],
            "MIDAS_unified-latest.txt"
        ),
        sep="\t"
    )

    # Generate CHEMONTID hierarchal structure reference 
    ont_file = download_zip_archive(
        output=args_dict["output"],
        zip_url=ONT_URL,
        file_name=ONT_FILE)
    ont_data = parse_ont_as_list(
        ont_file=ont_file)
    ont_dict = parse_dict_from_records(
        ont_data=ont_data)
    write_dictionary(
        output_dictionary=ont_dict,
        output_location=args_dict["output"],
        output_name='CHEMONTID-hierarchy-dictionary.json')

    clean_downloads(
        output_files=[
            sdf_file,
            cf_hmdb_file,
            cf_chebi_file,
            ont_file])

