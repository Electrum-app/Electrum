"""Import dependencies
"""
import os
import numpy as np
import pandas as pd
from sklearn import preprocessing
from scipy.spatial.distance import pdist, squareform
import plotly.graph_objects as go
import plotly.figure_factory as ff


"""Set global variables
"""
MIDAS_DATA = "MIDAS-latest.txt"
DATA_PATH = os.path.join(
    os.path.dirname(__file__),
    "..",
    "..",
    "..",
    "data"
)

"""Internal functions
"""
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


def unstack_table(
        data,
        row_index='metabolite',
        col_index='query_protein',
        value='log2_abundance_corrected'):
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


def generate_clustermap(
        data,
        output):
    """Generate an interactive clustered heatmap with z-scored data
    """
    import seaborn as sns
    sns.set(font='arial')
    jakes_cmap = sns.diverging_palette(212, 61, s=99, l=77, sep=1, n=16, center='dark') #Custom aesthetics
    g = sns.clustermap(
        midas_2d,
        cmap=jakes_cmap,
        center=0,
        xticklabels=True,
        yticklabels=True,
        figsize=(100,100))
    g.savefig("plot.png")




    import matplotlib.pyplot as plt
    import plotly.offline as py
    from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
    g.canvas = FigureCanvasTkAgg
    g.dpi = 600

    g

    py.iplot_mpl(g)


    #data = midas_scaled
    data = midas_2d

    # Make protein dendrogram
    col_labels = data.columns.tolist()
    fig = ff.create_dendrogram(
        data.T,
        orientation='bottom',
        labels=col_labels)
    for i in range(len(fig['data'])):
        fig['data'][i]['yaxis'] = 'y2'

    col_dendrogram = ff.create_dendrogram(
        data.T,
        orientation='bottom',
        labels=col_labels)
    for i in range(len(col_dendrogram['data'])):
        col_dendrogram['data'][i]['yaxis'] = 'y2'

    # Make metabolite dendrogram
    row_labels = data.index.tolist()
    row_dendrogram = ff.create_dendrogram(
        data,
        orientation='right',
        labels=row_labels)
    for i in range(len(row_dendrogram['data'])):
        row_dendrogram['data'][i]['yaxis'] = 'y2'

    # Add protein dendrogram data to figure object
    for d in row_dendrogram['data']:
        fig.add_trace(d)


dendro_leaves_row

print("hello")



    # Create Heatmap
    dendro_leaves_row = row_dendrogram['layout']['yaxis']['ticktext']
    dendro_leaves_row = list(map(str, dendro_leaves_row))

    dendro_leaves_col = col_dendrogram['layout']['xaxis']['ticktext']
    dendro_leaves_col = list(map(str, dendro_leaves_col))

    data_dist = pdist(data)
    heat_data = squareform(data_dist)

    heatmap = [
        go.Heatmap(
            x = dendro_leaves_col,
            y = dendro_leaves_row,
            z = heat_data,
            colorscale = 'RdBu_r'
        )
    ]

    # Add Heatmap Data to Figure
    for d in heatmap:
        fig.add_trace(d)

    # Edit Layout
    fig.update_layout({'width':800, 'height':800,
                             'showlegend':False, 'hovermode': 'closest',
                             })
    # Edit xaxis
    fig.update_layout(xaxis={'domain': [.15, 1],
                                      'mirror': False,
                                      'showgrid': False,
                                      'showline': False,
                                      'zeroline': False,
                                      'ticks':""})
    # Edit xaxis2
    fig.update_layout(xaxis2={'domain': [0, .15],
                                       'mirror': False,
                                       'showgrid': False,
                                       'showline': False,
                                       'zeroline': False,
                                       'showticklabels': False,
                                       'ticks':""})

    # Edit yaxis
    fig.update_layout(yaxis={'domain': [0, .85],
                                      'mirror': False,
                                      'showgrid': False,
                                      'showline': False,
                                      'zeroline': False,
                                      'showticklabels': False,
                                      'ticks': ""
                            })
    # Edit yaxis2
    fig.update_layout(yaxis2={'domain':[.825, .975],
                                       'mirror': False,
                                       'showgrid': False,
                                       'showline': False,
                                       'zeroline': False,
                                       'showticklabels': False,
                                       'ticks':""})

    fig.show()



def __main__(
        output):
    """
    Import MIDAS database
    Scale and produce interactive heatmap
    """

    # Import MIDAS database
    midas_table = import_table(
        _path=DATA_PATH,
        _file=MIDAS_DATA)

    midas_table_short = midas_table[[
        'metabolite',
        'query_protein',
        'log2_abundance_corrected'
        ]]

    midas_2d = unstack_table(
        data=midas_table_short)

    print("MIDAS data summary:")
    print(midas_2d.describe())

    midas_scaled = scale_metabolites(
        data=midas_2d)

    generate_clustermap(
        data=midas_scaled,
        output=output)


if __name__ == '__main__':
    __main__()


def __test__():
    """
    """
    output = 'C:\\Users\\jorda\\Desktop\\'
    __file__ = 'C:\\Users\\jorda\\Desktop\\projects\\Electrum\\bin\\python\\get_enrichment_sets\\__main__.py'
