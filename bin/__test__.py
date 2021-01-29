import itertools
from sklearn.cluster import AffinityPropagation
import numpy as np
import collections
import community
from pysmiles import read_smiles
import networkx as nx

smiles = 'C1CC[13CH2]CC1C1CCCCC1'
mol = read_smiles(smiles)

# atom vector (C only)
print(mol.nodes(data='element'))
# adjacency matrix
print(nx.to_numpy_matrix(mol))

nx.draw_networkx(mol)


# Pyruvate
smiles = 'CC(=O)C(O)=O'
mol = read_smiles(smiles)

# atom vector (C only)
# print(mol.nodes(data='element'))
# adjacency matrix
# print(nx.to_numpy_matrix(mol))

nx.draw_networkx(mol)


coa = '	CC(C)(COP(O)(=O)OP(O)(=O)OC[C@H]1O[C@H]([C@H](O)[C@@H]1OP(O)(O)=O)N1C=NC2=C1N=CN=C2N)[C@@H](O)C(=O)NCCC(=O)NCCS'
G_coa = read_smiles(coa)
nx.draw_networkx(G_coa)

acetyl_coa = '	CC(=O)SCCNC(=O)CCNC(=O)[C@H](O)C(C)(C)COP(O)(=O)OP(O)(=O)OC[C@H]1O[C@H]([C@H](O)[C@@H]1OP(O)(O)=O)N1C=NC2=C1N=CN=C2N'
G_acetyl_coa = read_smiles(acetyl_coa)
nx.draw_networkx(G_acetyl_coa)

GM = nx.algorithms.isomorphism.GraphMatcher(G_coa, G_acetyl_coa)
GM.is_isomorphic()


pyr = 'CC(=O)C(O)=O'
G_pyr = read_smiles(pyr, explicit_hydrogen=True)
nx.draw_networkx(G_pyr)

oxy = '[OH-]'
G_oxy = read_smiles(oxy, explicit_hydrogen=True)
nx.draw_networkx(G_oxy)

GM = nx.algorithms.isomorphism.GraphMatcher(G_pyr, G_oxy)
GM.is_isomorphic()

nx.algorithms.isomorphism.could_be_isomorphic(G_pyr, G_oxy)


for n in G_pyr.nodes():
    del G_pyr.nodes()[n]['aromatic']
    del G_pyr.nodes()[n]['charge']

for n in G_oxy.nodes():
    del G_oxy.nodes()[n]['aromatic']
    del G_oxy.nodes()[n]['charge']

for n in G_pyr.edges():
    del G_pyr.edges()[n]['order']

for n in G_oxy.edges():
    del G_oxy.edges()[n]['order']


for n in G_pyr.nodes():
    print(G_pyr.nodes()[n])

for n in G_pyr.edges:
    print(G_pyr.edges[n])


for n in G_oxy.nodes():
    print(G_oxy.nodes()[n])

for n in G_oxy.edges():
    print(G_oxy.edges()[n])


for x in G_pyr.subgraph():
    print(x)
G_oxy


p_partition = community.best_partition(G_pyr)
p_values = [p_partition.get(node) for node in G_pyr.nodes()]
p_counter = collections.Counter(p_values)
print(p_counter)
p_sp = nx.spring_layout(G_pyr)
nx.draw_networkx(G_pyr, pos=p_sp, with_labels=False,
                 node_size=35, node_color=p_values)
# plt.axes('off')
plt.show()


mat = nx.to_numpy_matrix(G_pyr)
af = AffinityPropagation(preference=-2, affinity="precomputed")
lab = af.fit_predict(mat)
mat


mat2 = nx.to_numpy_matrix(G_oxy)

G_oxy in G_pyr


G = G_oxy
all_connected_subgraphs = []

# here we ask for all connected subgraphs that have at least 2 nodes AND have less nodes than the input graph
for nb_nodes in range(2, G.number_of_nodes() + 1):
    for SG in (G.subgraph(selected_nodes) for selected_nodes in itertools.combinations(G, nb_nodes)):
        if nx.is_connected(SG):
            print(SG.nodes)
            all_connected_subgraphs.append(SG)

SG


G = G_pyr
all_connected_subgraphs = []

# here we ask for all connected subgraphs that have at least 2 nodes AND have less nodes than the input graph
for nb_nodes in range(2, G.number_of_nodes() + 1):
    for _SG in (G.subgraph(selected_nodes) for selected_nodes in itertools.combinations(G, nb_nodes)):
        if nx.is_connected(_SG):
            print(_SG.nodes)
            all_connected_subgraphs.append(_SG)


for _sg in all_connected_subgraphs:
    if nx.algorithms.isomorphism.could_be_isomorphic(_sg, SG):
        nx.draw_networkx(_sg)
        break
    else:
        print('no match')


"""
Make dictionary or matrix with all SMILES, name, ID, and graph representation as database

For each SMILES, search all sub-graphs combinations in database
Annotate similar matches

Verify --




"""
