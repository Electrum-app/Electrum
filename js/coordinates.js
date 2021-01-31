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

const pathway_dictionary = {
  "Central Carbon Metabolism": ccm_coordinates
};

const components_dictionary = {
  "Central Carbon Metabolism": [
    "D-Glucose",
    "Glucose 6-phosphate",
    "D-Fructose 6-phosphate",
    "D-Fructose 1,6-bisphosphate",
    "D-Glyceraldehyde 3-phosphate",
    "Dihydroxyacetone phosphate",
    "Glyceric acid 1,3-biphosphate",
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
    "Oxaloacetic acid"
  ]
};
