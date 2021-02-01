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
  "GCK": [8.5, 3, 0],

  "GPI": [11.75, 6.5, 1],

  "PFKL": [8, 9.25, 0],
  "PFKP": [8, 10.25, 0],

  "ALDOA": [5.5, 12.75, 0],
  "ALDOB": [5.5, 13.75, 0],
  "ALDOC": [6.5, 13.75, 1],

  "GAPDH": [8.5, 16.5, 0],

  "TPI1": [13.25, 16, 1],

  "PGK1": [8.5, 19.5, 0],
  "PGK2": [8.5, 20.5, 0],

  "PHGDH": [13, 20.5, 1],

  "PSAT1": [19.25, 20.5, 1],

  "PGAM1": [8.5, 22.8, 0],
  "PGAM2": [8.5, 23.8, 0],

  "ENO1": [8.5, 26.25, 0],
  "ENO2": [8.5, 27.25, 0],

  "PKLR-2": [6, 29.5, 0],
  "PKM1": [6, 30.5, 0],
  "PKM2": [7, 30.5, 1],

  "LDHA": [16, 30.75, 0],
  "LDHB": [17, 30.75, 1],

  "E1-PDH": [6, 34.5, 0],
  "E2-PDH": [6, 35.5, 0],
  "E3-PDH": [7, 35.5, 1],

  "CS": [17.25, 39, 1],

  "IDH2": [15.5, 46, 0],
  "IDH3a2bg": [18.5, 46.5, 1],

  "FH": [1.75, 42.5, 0],

  "MDH2": [3, 39, 0]
}

const ccm_coordinates_intra = {
  "D-Glucose": [10.45, 0.25, 0],
  "Glucose 6-phosphate": [10.45, 4, 0],
  "D-Fructose 6-phosphate": [10.45, 7.25, 0],
  "D-Fructose 1,6-bisphosphate": [10.45, 10.75, 0],
  "D-Glyceraldehyde 3-phosphate": [10.45, 14.25, 0], //G3P
  "Dihydroxyacetone phosphate": [14, 14.25, 0], //DHAP
  "Glyceric acid 1,3-biphosphate": [10.45, 19, 0], //1,3-BPG
  "D-3-Phosphoglyceric acid": [10.45, 21.25, 0],
  "D-2-Phosphoglyceric acid": [10.45, 24, 0],
  "Phosphatidylethanolamine": [10.45, 28.25, 0],
  "Hydroxypyruvic acid": [10.45, 31, 0],
  "Pyruvate": [10.45, 31.75, 0],
  "Lactate": [14.45, 31, 0],

  "Acetyl coenzyme A": [15, 38, 1],
  "Citric acid": [17.5, 41.5, 1],
  "Isocitric acid": [18.5, 44, 1],
  "Ketoglutaric acid": [16.5, 49, 1],
  "Succinyl coenzyme A": [10.45, 51.5, 1],
  "Succinic acid": [4.5, 48.5, 0],
  "Fumaric acid": [2, 44, 0],
  "L-Malic acid": [3.25, 41.25, 0],
  "Oxaloacetic acid": [6, 37.75, 0],

  "3-Phosphohydroxypyruvate": [16.5, 21.25, 1], //3-PHP
  "Phosphatidylserine": [22.95, 21.25, 1], //3-PS
  "L-Serine": [22.95, 25, 1], // Serine

  "GCK": [9, 2, 0],

  "GPI": [12, 5.5, 1],

  "PFKL": [8.75, 8.5, 0],
  "PFKP": [8.75, 9.5, 0],

  "ALDOA": [5.75, 12, 0],
  "ALDOB": [5.75, 13, 0],
  "ALDOC": [6.75, 13, 1],

  "GAPDH": [9, 16, 0],

  "TPI1": [13.75, 15.5, 1],

  "PGK1": [9, 19, 0],
  "PGK2": [9, 20, 0],

  "PHGDH": [13.5, 20.35, 1],

  "PSAT1": [20, 20.35, 1],

  "PGAM1": [9, 22.5, 0],
  "PGAM2": [9, 23.5, 0],

  "ENO1": [9, 26, 0],
  "ENO2": [9, 27, 0],

  "PKLR-2": [6.25, 29.5, 0],
  "PKM1": [6.25, 30.5, 0],
  "PKM2": [7.25, 30.5, 1],

  "LDHA": [16.5, 31, 0],
  "LDHB": [17.5, 31, 1],

  "E1-PDH": [6, 34.75, 0],
  "E2-PDH": [6, 35.75, 0],
  "E3-PDH": [7, 35.75, 1],

  "CS": [18, 39.5, 1],

  "IDH2": [16, 46.5, 0],
  "IDH3a2bg": [19, 47, 1],

  "FH": [1.75, 43, 0],

  "MDH2": [3, 39.5, 0]
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
    "Phosphatidylethanolamine",
    "Hydroxypyruvic acid",
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
    "Phosphatidylserine", //3-PS
    "L-Serine", // Serine
  ]
};
