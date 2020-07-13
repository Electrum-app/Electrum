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
  "HK1":[3,2],
  "HK2":[4,2],
  "HK3":[3,3],
  "GCK":[4,3],

  "G6PC":[7,3],

  "PGI":[4,5],

  "GPI":[7,5],

  "PFKM":[4,7],
  "PFKL":[3,8],
  "PFKP":[4,8],

  "FBPase-L":[7,7],
  "FBPase-M":[7,8],

  "ALDOAconc": [4,10], //ALDOAconc?
  "ALDOBconc":[3,11],
  "ALDOCconc":[4,11],

  "GAPDH":[4,13],

  "TPI":[7,12], //TPI1

  "PGK1":[4,15],
  "PGK2":[4,16],

  "PHGDH":[7,17],

  "PSAT1":[9,17],

  "PSPH":[11,17],

  "PGAM1":[4,18],
  "PGAM2":[4,19],

  "ENO1": [7,22],
  "ENO2": [7,23],
  "ENO3": [8,23],

  "PKLR": [3,25],  //?
  "PYK": [4,25],
  "PKM1": [3,26], //?
  "PKM2": [4,26], //?

  "LDHAL6B": [8,28],
  "LDHA": [9,28],
  "LDHB": [8,29],
  "LDHC": [9,29],

  "MPC1": [5,30],
  "MPC2": [6,30],

  "PDHA1": [4,32],
  "DLAT": [3,33],
  "DLD": [4,33],

  "ACC": [9,32], // citrate -> [acetyl-CoA -> malonyl-CoA]

  "ACSS2A-c203": [12,35], // [acetate -> acetyl-CoA] -> TCA

  "CS": [8,35],

  "ACO2_a": [10,37],

  "ACO2_b": [12,40],

  "IDH1": [12,43], // Not in same complex?
  "IDH2": [12,44],

  "IDH3A2BG": [14,43],
  "IDH3AB": [14,44],
  "IDH3AG": [15,44],

  "OGDH": [8,47],
  "DLST_b": [9,48],
  "DLD_b": [8,47],
  "DHTKD1r": [9,48],

  "SUCLG1": [3,47],
  "SUCLG2": [4,47],
  "SUCLA2": [4,48],

  "SDHA": [-2,43],
  "SDHB": [-1,43],
  "SDHC": [-2,44],
  "SDHD": [-1,44],

  "FH": [-1,40],

  "MDH1": [1,37], // Not in same complex?
  "MDH2": [1,38],



  // Others?
  "E1": [14,24],
  "E2": [15,24],
  "E3": [14,25],


}
