"""Import dependencies
"""
import os
import sys
import io
import requests
import numpy as np
import pandas as pd
import networkx as nx
from pysmiles import read_smiles
import cugraph
import zipfile
import itertools
import xml.etree.ElementTree as et

"""Define globals
"""


"""Functions
"""
def generate_hmdb(
        output,
        url='https://hmdb.ca/system/downloads/current/hmdb_metabolites.zip',
        file_name='hmdb_metabolites',
        xml_tag = '{http://www.hmdb.ca}'):
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

def build_database(
        hmdb_contents):
    """Build graph database
    """

    cols = ['id', 'name', 'smiles', 'graph', 'subgraphs', 'similarities']
    database = pd.DataFrame(columns=cols)

    _index = 0
    for x in hmdb_contents:
        if x.tag == xml_tag + 'metabolite':
            for y in x:
                if y.tag == xml_tag + 'accession':
                    database.at[_index, 'id'] = y.text

                if y.tag == xml_tag + 'name':
                    database.at[_index, 'name'] = y.text

                if y.tag == xml_tag + 'smiles':
                    database.at[_index, 'smiles'] = y.text

                    _this_graph = get_graph(
                        smiles=y.text)
                    database.at[_index, 'graph'] = _this_graph

                    _subgraphs = get_subgraphs(
                        graph=_this_graph)
                    database.at[_index, 'subgraphs'] = _subgraphs

            database.at[_index, 'similarities'] = set()

            _index += 1

    return database

def get_graph(
        smiles):
    """Build metabolite graph from SMILES string
    """

    graph = read_smiles(smiles, explicit_hydrogen=True)
    for n in graph.nodes():
        del graph.nodes()[n]['aromatic']
        del graph.nodes()[n]['charge']
    for n in graph.edges():
        del graph.edges()[n]['order']

    return graph

def get_subgraphs(
        graph):
    """Parse out all possible sub-graphs from a given graph
    """

    all_connected_subgraphs = []
    for nb_nodes in range(2, graph.number_of_nodes() + 1):
        for SG in (graph.subgraph(selected_nodes) \
        for selected_nodes in itertools.combinations(graph, nb_nodes)):
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
    hmdb = generate_hmdb()

    print('Building graphical database of HMDB metabolites...')
    database = build_database(
        hmdb_content=hmdb)

    # Build SMILES graph database


    # Search for other graphs in all sub-graphs of a given SMILES structure


    write_output(
        _object=database,
        output=OUTPUT)




if __name__ == '__main__':
    __main__()
