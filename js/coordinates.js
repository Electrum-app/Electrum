/* Electrum
Dynamic exploration of MIDAS protein-metabolite interaction data
https://github.com/j-berg/Electrum/
alias: electrum

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
*/

// Static [x,y, z] coordinates for query proteins where z is the boolean representation of whether text should be displayed to the right (1) or left (0) of the node
const ccm_coordinates = {
  "GCK": [-150, 200, 0],
  
  "HK1": [150, 205, 1],

  "GPI": [150, 560, 1],

  "PFKL": [-200, 850, 0],
  "PFKP": [-200, 950, 0],
  
  "FBP1": [200, 850, 1],
  "FBP2": [200, 950, 1],

  "ALDOA": [-450, 1165, 0],
  "ALDOB": [-450, 1265, 0],
  "ALDOC": [-350, 1265, 1],

  "GAPDH": [-150, 1550, 0],

  "TPI1": [325, 1520, 1],

  "PGK1": [-150, 1850, 0],
  "PGK2": [-150, 1950, 0],

  "PHGDH": [300, 1950, 1],

  "PSAT1": [925, 1950, 1],

  "PGAM1": [-150, 2200, 0],
  "PGAM2": [-150, 2300, 0],

  "ENO1": [-150, 2515, 0],
  "ENO2": [-150, 2615, 0],

  "PKLR": [-400, 2850, 0],
  "PKM1": [-400, 2950, 0],
  "PKM2": [-300, 2950, 1],

  "LDHA": [600, 2960, 0],
  "LDHB": [700, 2960, 1],

  "E1-PDH": [-450, 3350, 0],
  "E2-PDH": [-450, 3450, 0],
  "E3-PDH": [-350, 3450, 1],

  "CS": [775, 3825, 1],

  "IDH2": [500, 4500, 0],
  "IDH3": [850, 4550, 1],

  "FH": [-850, 4170, 0],

  "MDH2": [-725, 3800, 0]
}

const ccm_coordinates_intra = {
  "D-Glucose": [-215, 40, 0],
  "D-Fructose 6-phosphate": [-135, 400, 1], //G6P ; F6P
  "D-Fructose 1,6-bisphosphate": [0, 760, 0],
  "D-Glyceraldehyde 3-phosphate": [0, 1195, 0], //G3P ; DHAP
  "Dihydroxyacetone phosphate": [300, 1195, 0], //
  "1,3-BPG": [0, 1520, 0], //1,3-BPG
  "D-3-Phosphoglyceric acid": [0, 1870, 0], //3PG
  "2PG": [0, 2205, 0], //2PG
  "Phosphoenolpyruvic acid": [0, 2530, 0], //PEP
  "Pyruvate": [0, 2970, 0],
  "Lactate": [965, 2970, 1],

  "Acetyl coenzyme A": [470, 3680, 1],
  "Citric acid": [720, 4050, 0], // Citrate ; Isocitrate
  "Isocitric acid": [800, 4400, 1],
  "Ketoglutaric acid": [590, 4645, 1],
  "Succinyl coenzyme A": [25, 4910, 1],
  "Succinic acid": [-560, 4685, 0],
  "Fumarate": [-715, 4310, 0],
  "L-Malic acid": [-680, 3970, 0],
  "Oxaloacetic acid": [-420, 3650, 0],

  "3-PHP": [630, 1870, 2], //3-PHP
  "O-Phospho-L-serine": [1195, 1870, 1], //3-PS
  "L-Serine": [1195, 2210, 1], // Serine

  "GCK": [-350, 205, 0],

  "HK1": [-75, 205, 1],

  "GPI": [140, 400, 1],

  "PFKL": [-200, 535, 0],
  "PFKP": [-200, 635, 0],

  "FBP1": [175, 535, 1],
  "FBP2": [175, 635, 1],

  "ALDOA": [-150, 875, 0],
  "ALDOB": [-150, 975, 0],
  "ALDOC": [-150, 1075, 0],

  "GAPDH": [-150, 1360, 0],

  "TPI1": [265, 1025, 1],

  "PGK1": [-150, 1660, 0],
  "PGK2": [-150, 1760, 0],

  "PHGDH": [325, 1760, 1],

  "PSAT1": [925, 1760, 1],

  "PGAM1": [-150, 1980, 0],
  "PGAM2": [-150, 2080, 0],

  "ENO1": [-150, 2325, 0],
  "ENO2": [-150, 2425, 0],

  "PKLR": [-150, 2660, 0],
  "PKM1": [-150, 2760, 0],
  "PKM2": [-150, 2860, 0],

  "LDHA": [475, 2870, 0],
  "LDHB": [575, 2870, 1],

  "E1-PDH": [-150, 3220, 0],
  "E2-PDH": [-150, 3320, 0],
  "E3-PDH": [-150, 3420, 0],

  "CS": [500, 3900, 0],

  "IDH2": [520, 4350, 0],
  "IDH3": [870, 4400, 1],

  "FH": [-850, 4120, 0],

  "MDH2": [-700, 3750, 0]
}

const pathway_dictionary = {
  "Central Carbon Metabolism": ccm_coordinates
};

const pathway_dictionary_i = {
  "Central Carbon Metabolism": ccm_coordinates_intra
};

const components_dictionary = {
  "Central Carbon Metabolism": [
    "D-Glucose",
    "Glucose 6-phosphate",
    "D-Fructose 6-phosphate",
    "D-Fructose 1,6-bisphosphate",
    "D-Glyceraldehyde 3-phosphate", //G3P
    "Dihydroxyacetone phosphate", //DHAP
    "Glyceric acid 1,3-biphosphate", //1,3-BPG
    "D-3-Phosphoglyceric acid",
    "D-2-Phosphoglyceric acid",
    "Phosphoenolpyruvic acid", //PEP
    "Pyruvate",
    "Lactate",
    "Acetyl coenzyme A",
    "Citric acid",
    "Isocitric acid",
    "Ketoglutaric acid",
    "Succinyl coenzyme A",
    "Succinic acid",
    "Fumaric acid",
    "L-Malic acid",
    "Oxaloacetic acid",
    "3-Phosphohydroxypyruvate", //3-PHP
    "O-Phospho-L-serine", //3-PS,
    "L-Serine", // Serine
  ]
};
