"""Import dependencies
"""
from datetime import datetime

import os
import sys
import io
import requests
import zipfile
import itertools
import xml.etree.ElementTree as et
import numpy as np
import pandas as pd
import cudf
import cugraph
import networkx as nx
from pysmiles import read_smiles

"""Define globals
"""
XML_TAG = '{http://www.hmdb.ca}'

"""Functions
"""
def generate_hmdb(
        output,
        url='https://hmdb.ca/system/downloads/current/hmdb_metabolites.zip',
        file_name='hmdb_metabolites',
        xml_tag=XML_TAG):
    """Get metabolite names, IDs, and SMILES
    """

    output_file = output + file_name
    hmdb_url = requests.get(url)
    if hmdb_url.ok:
        print("Unzipping HMDB metabolite reference...")
        hmdb_zip = zipfile.ZipFile(io.BytesIO(hmdb_url.content))
        hmdb_zip.extractall(output)
        hmdb_zip = None
    else:
        raise Exception("Unable to download file at: " + url)

    print("Parsing HMDB metabolite records...")
    hmdb_contents = et.parse(output_file + '.xml')
    contents = hmdb_contents.getroot()

    return contents

def get_xml_length(
        xml_object,
        xml_type='metabolite',
        xml_tag=XML_TAG):

    _index = 0
    for x in xml_object:
        if x.tag == xml_tag + xml_type:
            _index += 1

    return _index

def build_database(
        hmdb_contents,
        xml_type='metabolite',
        xml_tag=XML_TAG):
    """Build graph database
    """

    _len = get_xml_length(
        xml_object=hmdb_contents)

    cols = ['id', 'name', 'smiles', 'graph', 'subgraphs', 'similarities']
    database = pd.DataFrame(index=list(range(0, _len)), columns=cols)

    _index = 0
    for x in hmdb_contents:
        if x.tag == xml_tag + 'metabolite':
            for y in x:
                if y.tag == xml_tag + 'accession':
                    database['id'][_index] = y.text

                if y.tag == xml_tag + 'name':
                    database['name'][_index] = y.text

                if y.tag == xml_tag + 'smiles':
                    database['smiles'][_index] = y.text

            _index += 1

    return database

def get_graphs(
        smiles):
    """Build metabolite graph from SMILES string
    """
    print(smiles)
    graph = read_smiles(smiles, explicit_hydrogen=True)
    for n in graph.nodes():
        del graph.nodes()[n]['aromatic']
        del graph.nodes()[n]['charge']
    for n in graph.edges():
        del graph.edges()[n]['order']
    print(type(graph))
    return graph

def get_subgraphs(
        graph):
    """Parse out all possible sub-graphs from a given graph
    """

    counter = 0
    all_connected_subgraphs = []
    for nb_nodes in range(2, graph.number_of_nodes() + 1):
        for SG in (graph.subgraph(selected_nodes) \
        for selected_nodes in itertools.combinations(graph, nb_nodes)):
            print(counter)
            counter += 1
            if nx.is_connected(SG):
                all_connected_subgraphs.append(SG)

    return all_connected_subgraphs

def parse_subgraphs(
        database,
        _this_index,
        _this_graph):
    """For each graph, parse whether it is a subgraph of any other graph and its
        subgraphs
    """



def write_output(
        _object,
        output):
    """
    """

    _object.to_csv(output + 'output.txt', sep='\t')

def showtime():
    # datetime object containing current date and time
    now = datetime.now()

    # dd/mm/YY H:M:S
    dt_string = now.strftime("%d/%m/%Y %H:%M:%S")
    print("--> ", dt_string)

def __main__():
    """
    """

    # define user variables
    if len(sys.argv) != 2:
        raise Exception('Incorrect number of variables.')
    if os.path.isdir(sys.argv[1]) == False:
        raise Exception('Specified output directory does not exist')
    OUTPUT = sys.argv[1] # output directory

    # Get HMDB database information
    print('Reading HMDB data...')
    hmdb = generate_hmdb(
        output=OUTPUT)

    print('Building graphical database of HMDB metabolites...')
    database = build_database(
        hmdb_contents=hmdb)
    print('getting graphs...')
    showtime()
    database["graph"] = np.frompyfunc(get_graphs,1,1)(database["smiles"])
    showtime()
    print(database.shape)
    print(database.head())

    print('--------------------')
    print('getting subgraphs...')
    showtime()
    database["subgraphs"] = np.frompyfunc(get_subgraphs,1,1)(database["graph"])
    showtime()
    print(database.shape)
    print(database.head())
    # Search for other graphs in all sub-graphs of a given SMILES structure


    #write_output(
    #    _object=database,
    #    output=OUTPUT)


def __test__():
    OUTPUT = '/home/jordan/Desktop/'

if __name__ == '__main__':
    __main__()
