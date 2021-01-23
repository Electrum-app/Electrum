"""Import dependencies
"""
from datetime import datetime

import os
import sys
import gc
import io
import requests
import zipfile
import itertools
from functools import partial
import multiprocessing
from multiprocessing import cpu_count, Pool
import xml.etree.ElementTree as et
import numpy as np
import pandas as pd
import networkx as nx
from pysmiles import read_smiles

"""Define globals
"""
XML_TAG = '{http://www.hmdb.ca}'
KEGG_FIELD = 'KEGG_ID'
HMDB_FIELD = 'HMDB_ID'
NAME_FIELD = 'Metabolite'
COMMON_NAME_FIELD = 'Common_metabolite_name'

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

    cols = ['id', 'name', 'smiles', 'graph', 'similar_metabolites']
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

            database['similar_metabolites'][_index] = []
            _index += 1

    return database

def get_chunks(
        data,
        processes):

    _index_length = len(data.index.tolist())
    if processes > _index_length:
        processes = _index_length

    chunks = [] # Initialize chunk storage
    start = 0 # Get first start coordinate for chunk
    batch = round(len(data.index) / processes)
    for _c in range(processes):
        # If the last chunk, get the remainder of the GTF
        #   dataframe
        if _c == processes - 1:
            new_chunk = data.loc[start:]
        else:
            end = start + batch  # Set tentative end of next chunk

            if end > len(data.index) - 1:
                # If end of dataframe, end there
                end = len(data.index) - 1

        # Parse out current chunk
        new_chunk = data.loc[start:end]
        # End coordinate for last chunk to start with next
        start = end + 1
        if new_chunk.empty == False:
            chunks.append(new_chunk)

    return chunks

def run_chunks(
        func,
        chunks):
    """Run a given function on chunks
    """

    # Remove any empty dataframes
    cores = len(chunks) # Modify worker numbers
    print('Spawning processing pools for %s chunks...' % cores)
    chunks = [x for x in chunks if x is not None]
    pool = Pool(cores) # Initialize workers
    chunks = pool.map(func, chunks) # Run function on chunks
    pool.close()
    pool.join()
    gc.collect()

    return chunks

def get_graphs(
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

def vec_graphs(
        data,
        output='graph',
        input='smiles'):

    data[output] = np.frompyfunc(get_graphs,1,1)(data[input])
    return data

def parse_graphs(
        data):
    """For each graph, parse whether it is a subgraph of any other graph and its
        subgraphs
    """

    print(
        'Processing a graph chunk for indices %s-%s...'
        % (data.index[0], data.index[-1]))
    data = vec_graphs(data)

    return data

def get_subgraphs(
        graph):
    """Parse out all possible sub-graphs from a given graph
    """

    counter = 0
    all_connected_subgraphs = []
    for nb_nodes in range(2, graph.number_of_nodes() + 1):
        for SG in (graph.subgraph(selected_nodes) \
        for selected_nodes in itertools.combinations(graph, nb_nodes)):
            counter += 1
            if nx.is_connected(SG):
                all_connected_subgraphs.append(SG)

    return all_connected_subgraphs

def compare_graphs(
        data,
        graph_dictionary,
        total_metabolites,
        graph_col=3,
        output_col='similar_metabolites'):
    """Build metabolite graph from SMILES string
    """
    global _counter

    for index, row in data.iterrows():
        subgraphs = get_subgraphs(
            graph=row[graph_col])
        for _s in subgraphs:
            for k, graph in graph_dictionary.items():
                if nx.algorithms.isomorphism.is_isomorphic(_s, graph):
                    data.at[index, output_col].append(k)

        _counter += 1
        print(str(_counter) + ' / ' + str(total_metabolites))

    return data

def write_output(
        _object,
        output):
    """
    """

    _object.to_csv(
        output + 'MIDAS_substructure_annotations.txt',
        sep='\t')

def read_table(
        url,
        delimiter='\t'):
    """Read in MIDAS database file
    """

    try:
        data = pd.read_csv(
            url,
            sep=delimiter,
            index_col=None,
            header=0,
            engine='python')
    except:
        data = pd.read_csv(
            url,
            sep=delimiter,
            index_col=None,
            header=0,
            encoding='cp1252')

    return data

def showtime():
    # datetime object containing current date and time
    now = datetime.now()

    # dd/mm/YY H:M:S
    dt_string = now.strftime("%d/%m/%Y %H:%M:%S")
    print("--> ", dt_string)

def __main__():
    """
    """

    print('Reading user variables...')
    print(sys.argv)
    # define user variables
    if len(sys.argv) != 3:
        raise Exception('Incorrect number of variables.')
    if os.path.isdir(sys.argv[1]) == False:
        raise Exception('Specified output directory does not exist')
    if os.path.isfile(sys.argv[2]) == False:
        raise Exception('Specified MIDAS database file does not exist')
    OUTPUT = sys.argv[1] # output directory
    MIDAS_DATA = sys.argv[2] # MIDAS database
    if OUTPUT[-1] != os.path.sep:
        OUTPUT += os.path.sep

    # Read MIDAS data
    midas = read_table(
        url=MIDAS_DATA)

    # Get HMDB database information
    print('Reading HMDB data...')
    hmdb = generate_hmdb(
        output=OUTPUT)

    print('Building graphical database of HMDB metabolites...')
    database = build_database(
        hmdb_contents=hmdb)

    print('Processing graphs...')
    showtime()
    chunks = get_chunks(
        data=database,
        processes=cpu_count()-1)
    database = None

    # Get graphs for each HMDB metabolite
    chunks = run_chunks(
        func=parse_graphs,
        chunks=chunks)
    if len(chunks) == 0:
        raise Exception("No chunks found")

    # Make graph dictionary
    # Compile outputs
    if len(chunks) > 0:
        database = pd.concat(chunks)
        database = database.reset_index(drop=True)
        chunks = None # Garbage management
    else:
        raise Exception('0 chunks of the original file remain')

    graph_dictionary = dict(zip(
        database['id'],
        database['graph']))

    # Make MIDAS list
    targets = list(set(midas[[HMDB_FIELD]].tolist()))
    database_copy = database.copy()
    database_copy = database_copy[database_copy['id'].isin(targets)]

    # Search for other graphs in all sub-graphs of a given SMILES structure
    chunks = get_chunks(
        data=database_copy,
        processes=cpu_count()-1)
    database = None
    database_copy = None

    partial_func = partial(
        compare_graphs,
        graph_dictionary=graph_dictionary,
        total_metabolites=len(targets))
    chunks = run_chunks(
        func=partial_func,
        chunks=chunks)

    # Compile outputs
    if len(chunks) > 0:
        database = pd.concat(chunks)
        database = database.reset_index(drop=True)
        chunks = None # Garbage management
    else:
        raise Exception('0 chunks of the original file remain')

    print('Graph processing complete...')
    showtime()

    database.drop(
        labels=['graph'],
        axis=1,
        inplace=True)
    write_output(
        _object=database,
        output=OUTPUT)


def __test__():
    OUTPUT = '/home/jordan/Desktop'
    MIDAS_DATA = '/home/jordan/Desktop'

    OUTPUT = 'C:\\Users\\jorda\\Desktop'
    MIDAS_DATA = 'C:\\Users\\jorda\\Desktop\\projects\\Electrum\\_data\\MIDAS-latest.txt'

    database.head(n=10)
    database_small = database.head(n=10)
    database_small_c = database_small.copy()
    database_small_c = vec_graphs(database_small_c)

    graph_dictionary = dict(zip(
        database_small_c['id'],
        database_small_c['graph']))

    # Make MIDAS list
    targets = list(set(midas[HMDB_FIELD].tolist()))
    database_c = database_small_c.head(n=3).copy()
    # database_c = database_c[database_c['id'].isin(targets)]

    database_c = compare_graphs(
        database_c,
        graph_dictionary,
        len(targets),
        graph_col=3,
        output_col='similar_metabolites')

if __name__ == '__main__':
    print('Executing script...')
    _counter = 0
    __main__()
