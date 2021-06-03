"""Import dependencies
"""
from datetime import datetime

import os
import sys
import io
import re
import requests
import zipfile
import itertools
import pandas as pd


"""Define globals
"""
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
def get_user_args():
    """Get user args
    """
    output = os.path.abspath(sys.argv[1])
    print("Generating sub-structure database...")
    print("Outputting to %s" % (sys.argv[1]))
    return output


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
        str(output_location) + 'Substructures-DB-latest.tsv',
        sep='\t')


def clean_downloads(
        output_files):
    """
    """
    for o in output_files:
        try:
            os.remove(o)
        except:
            print('Unable to remove file ' + o)


def __main__():
    """
    """
    output = get_user_args()

    # Parse all HMDB SDF records
    sdf_file = download_zip_archive(
        output=output,
        zip_url=SDF_URL,
        file_name=SDF_FILE)
    record_list = parse_records_as_list(
        sdf_file=sdf_file)
    output_metadata = parse_metadata_from_records(
        records=record_list)

    # Parse ClassyFire HMDB records
    cf_hmdb_file = download_zip_archive(
        output=output,
        zip_url=CLASSYFIRE_HMDB_URL,
        file_name=CLASSYFIRE_HMDB_FILE)
    hmdb_records = parse_records_as_datatable(
        input_file=cf_hmdb_file)
    hmdb_dictionary = dict_from_datatable(
        input_source=hmdb_records)

    # Parse ClassyFire CHEBI records
    cf_chebi_file = download_zip_archive(
        output=output,
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

    # Add ontology IDs and terms to each SDF record
    output_substructures = retrieve_substructures(
        records=output_metadata,
        hmdb_dictionary=hmdb_dictionary,
        chebi_dictionary=chebi_dictionary,
        ontology_dictionary=ontology_dictionary)

    # Output and clean
    write_output(
        output_database=output_substructures,
        output_location=output)
    clean_downloads(
        output_files=[
            sdf_file,
            cf_hmdb_file,
            cf_chebi_file])


if __name__ == '__main__':
    __main__()
else:
    sys.exit(1)


def __test__():
    output = 'C:\\Users\\jorda\\Desktop\\'

    hmdb_records.loc[~hmdb_records['ParentName'].isna()]
    chebi_records.loc[~chebi_records['ParentName'].isna()]

    missing = []
    for x in output_substructures:
        if x.taxonomy_terms == []:
            missing.append(x.common_name)
    print(len(output_substructures))
    print(len(missing))
