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
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
import matplotlib.pyplot as plt
from scipy.spatial.distance import pdist, squareform
import plotly.figure_factory as ff
import plotly.graph_objects as go
import plotly.offline as py
from sklearn import preprocessing
import pandas as pd
import numpy as np
import os


ROW_INDEX = "metabolite"
COL_INDEX = "query_protein"
VALUE_INDEX = "log2_abundance_corrected"


"""Functions
"""
def import_table(
        database_url):
    """Import URL as tab-delimited table
    """

    db = pd.read_csv(
        database_url,
        sep="\t",
        index_col=False,
        header=0
    )

    return db


def unstack_table(
        data,
        row_index=ROW_INDEX,
        col_index=COL_INDEX,
        value=VALUE_INDEX):
    """Convert longform datatable to 2d array
    """

    unstacked_table = pd.DataFrame()
    for index, row in data.iterrows():
        unstacked_table.at[row[row_index], row[col_index]] = row[value]

    return unstacked_table


def scale_metabolites(
        data):
    """Assuming metabolites are rows, z-score metabolites
    """

    data_scaled = data.copy()
    data_scaled[data_scaled.columns] = preprocessing.scale(
        data_scaled[data_scaled.columns],
        axis=1)
    return data_scaled


def trace_dendrograms(
        midas_2d):

    col_labels = midas_2d.columns.tolist()
    fig = ff.create_dendrogram(
        midas_2d.T,
        orientation='bottom',
        labels=col_labels)
    for i in range(len(fig['data'])):
        fig['data'][i]['yaxis'] = 'y2'

    col_dendrogram = ff.create_dendrogram(
        midas_2d.T,
        orientation='bottom',
        labels=col_labels)
    for i in range(len(col_dendrogram['data'])):
        col_dendrogram['data'][i]['yaxis'] = 'y2'

    # Make metabolite dendrogram
    row_labels = midas_2d.index.tolist()
    row_dendrogram = ff.create_dendrogram(
        midas_2d,
        orientation='right',
        labels=row_labels)
    for i in range(len(row_dendrogram['data'])):
        row_dendrogram['data'][i]['yaxis'] = 'y2'

    # Add protein dendrogram data to figure object
    for d in row_dendrogram['data']:
        fig.add_trace(d)

    # Create Heatmap traces
    dendro_leaves_col = col_dendrogram['layout']['xaxis']['ticktext']
    dendro_leaves_col = list(map(str, dendro_leaves_col))

    dendro_leaves_row = row_dendrogram['layout']['yaxis']['ticktext']
    dendro_leaves_row = list(map(str, dendro_leaves_row))

    return dendro_leaves_row, dendro_leaves_col


def __main__(
        args_dict):
    """Generate required radial ordering for metabolites

    Excepted database format:

                              metabolite query_protein  log2_abundance  log2_abundance_corrected  met_mean    met_sd       p_value       q_value
        0               metabolite_name1 protein_name1       -3.145748                 -2.583616 -0.041294  0.134860  2.850000e-79  1.930000e-76
        1               metabolite_name2 protein_name1       -2.049392                 -1.224692 -0.038301  0.122482  3.450000e-22  5.740000e-20
        2               metabolite_name3 protein_name1       -2.324957                 -1.249463 -0.038824  0.163332  1.240000e-13  1.170000e-11
        3               metabolite_name4 protein_name1       -1.049454                 -0.622906  0.022553  0.089612  5.900000e-13  5.230000e-11

    - Input database file should be tab-delimited with the file suffix `.txt` or `.tsv`
    - Header naming must be strictly followed
    """

    if not os.path.isdir(args_dict["output"]):
        raise Exception("Provided output location cannot be found:", args_dict["output"])
    if not os.path.isfile(args_dict["database"]):
        raise Exception("Provided database file location cannot be found:", args_dict["database"])

    # Read database table and unstack
    midas_table = import_table(
        database_url=args_dict["database"])
    midas_table_short = midas_table[[
        ROW_INDEX,
        COL_INDEX,
        VALUE_INDEX
    ]]

    midas_2d = unstack_table(
        data=midas_table_short)
    print("MIDAS data summary:")
    print(midas_2d.describe())

    # Make dendrograms
    dendro_leaves_row, \
    dendro_leaves_col = trace_dendrograms(
        midas_2d=midas_2d)

    # Output reference file 
    with open(os.path.join(args_dict["output"], "radial_order.txt"), "w") as fp:
        for x in dendro_leaves_row:
            fp.write(str(x) + "\n")
    print("\nProcessing complete.")