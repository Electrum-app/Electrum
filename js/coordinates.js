/* Electrum
Dynamic exploration of MIDAS protein-metabolite interaction data
https://github.com/j-berg/Electrum/
alias: electrum

Copyright (C) 2020 Jordan A. Berg
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

// Static [x,y] coordinates for query proteins
const protein_coordinates = {
  "HK1":[3,2,0,0],
  "HK2":[4,2,1,0],
  "HK3":[3,3,0,0],
  "GCK":[4,3,1,0],

  "G6PC":[7,3,1,1],

  "PGI":[4,5,0,2],

  "GPI":[7,5,1,3],

  "PFKM":[4,7,0,4],
  "PFKL":[3,8,0,4],
  "PFKP":[4,8,1,4],

  "FBPase-L":[7,7,1,5],
  "FBPase-M":[7,8,1,5],

  "ALDOAconc": [4,10,0,6], //ALDOAconc?
  "ALDOBconc":[3,11,0,6],
  "ALDOCconc":[4,11,1,6],

  "GAPDH":[4,13,0,7],

  "TPI":[7,12,1,8], //TPI1

  "PGK1":[4,15,0,9],
  "PGK2":[4,16,0,9],

  "PHGDH":[9,17,1,10],

  "PSAT1":[12,17,1,11],

  "PSPH":[15,17,1,12],

  "PGAM1":[4,18,0,13],
  "PGAM2":[4,19,0,13],

  "ENO1": [7,22,0,14],
  "ENO2": [7,23,0,14],
  "ENO3": [8,23,1,14],

  "PKLR": [3,25,0,15],  //?
  "PYK": [4,25,1,15],
  "PKM1": [3,26,0,15], //?
  "PKM2": [4,26,1,15], //?

  "LDHAL6B": [10,28,0,16],
  "LDHA": [11,28,1,16],
  "LDHB": [10,29,0,16],
  "LDHC": [11,29,1,16],

  "MPC1": [5,30,0,17],
  "MPC2": [6,30,1,17],

  "PDHA1": [4,32,0,18],
  "DLAT": [3,33,0,18],
  "DLD": [4,33,1,18],

  "ACC": [9,32,1,19], // citrate -> [acetyl-CoA -> malonyl-CoA]

  "ACSS2A-c203": [12,35,1,20], // [acetate -> acetyl-CoA] -> TCA

  "CS": [8,35,1,21],

  "ACO2_a": [10,37,1,22],

  "ACO2_b": [12,40,1,23],

  "IDH1": [11,43,0,24], // Not in same complex?
  "IDH2": [11,44,0,24],

  "IDH3A2BG": [14,43,1,25],
  "IDH3AB": [14,44,0,25],
  "IDH3AG": [15,44,1,25],

  "OGDH": [8,47,0,26],
  "DLST_b": [9,47,1,26],
  "DLD_b": [8,48,0,26],
  "DHTKD1r": [9,48,1,26],

  "SUCLG1": [3,47,0,27],
  "SUCLG2": [4,47,1,27],
  "SUCLA2": [4,48,0,27],

  "SDHA": [-2,43,0,28],
  "SDHB": [-1,43,1,28],
  "SDHC": [-2,44,0,28],
  "SDHD": [-1,44,1,28],

  "FH": [-1,40,0,29],

  "MDH1": [1,37,0,30], // Not in same complex?
  "MDH2": [1,38,0,30],

  // Others?
  "E1": [14,24,0,31],
  "E2": [15,24,1,31],
  "E3": [14,25,0,31],
}

const protein_links = {}
