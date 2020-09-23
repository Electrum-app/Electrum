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
  "HK1":[4.5,11,0],
  "HK2":[4.6,11,1],
  "HK3":[4.5,11.1,0],
  "GCK":[4.6,11.1,1],

  "G6PC":[6,11.5,0],

  "PGI":[4.6,11.9,1],

  "GPI":[6,12.3,0],

  "PFKM":[4.5,12.7,0],
  "PFKL":[4.6,12.7,1],
  "PFKP":[4.6,12.8,1],

  "FBPase-L":[6,13.2,0],
  "FBPase-M":[6,13.3,0],

  "ALDOAconc": [4.5,13.7,0], //ALDOAconc?
  "ALDOBconc":[4.6,13.7,1],
  "ALDOCconc":[4.6,13.8,1],

  "GAPDH":[4.6,14.2,1],

  "TPI":[6,14.6,0], //TPI1

  "PGK1":[4.6,15,1],
  "PGK2":[4.6,15.1,1],

  "PHGDH":[6,15.5,0],

  "PSAT1":[7.5,15.5,0],

  "PSPH":[9,15.5,0],

  "PGAM1":[4.6,15.9,1],
  "PGAM2":[4.6,16,1],

  "ENO1": [6,16.4,0],
  "ENO2": [6.1,16.4,1],
  "ENO3": [6,16.5,0],

  "PKLR": [4.5,16.9,0],  //?
  "PYK": [4.6,16.9,1],
  "PKM1": [4.5,17,0], //?
  "PKM2": [4.6,17,1], //?

  "LDHAL6B": [7,17,0],
  "LDHA": [7.1,17,1],
  "LDHB": [7,17.1,0],
  "LDHC": [7.1,17.1,1],

  "MPC1": [5.4,17.4,0],
  "MPC2": [5.5,17.4,1],

  "PDHA1": [5.4,17.8,0],
  "DLAT": [5.5,17.8,1],
  "DLD": [5.4,17.9,0],

  "CS": [6.25,18.5,0],

  "ACO2_a": [7.5,19.1,0],

  "ACO2_b": [7.5,19.7,0],

  "ACC": [7,18,0], // citrate -> [acetyl-CoA -> malonyl-CoA]

  "ACSS2A-c203": [4,18,1], // [acetate -> acetyl-CoA] -> TCA

  "IDH1": [6.25,20.4,0], // Not in same complex?
  "IDH2": [6.25,20.5,0],

  "IDH3A2BG": [7,21.1,0],
  "IDH3AB": [7.1,21.1,1],
  "IDH3AG": [7,21.2,0],

  "OGDH": [5.4,21.1,0],
  "DLST_b": [5.5,21.1,1],
  "DLD_b": [5.4,21.2,0],
  "DHTKD1r": [5.5,21.2,1],

  "SUCLG1": [4.5,20.4,0],
  "SUCLG2": [4.6,20.4,1],
  "SUCLA2": [4.6,20.5,1],

  "SDHA": [3.4,19.7,0],
  "SDHB": [3.5,19.7,1],
  "SDHC": [3.4,19.8,0],
  "SDHD": [3.5,19.8,1],

  "FH": [3.5,19.1,1],

  "MDH1": [4.6,18.5,1], // Not in same complex?
  "MDH2": [4.6,18.6,1],

  // Others?
  "E1": [7.5,12.7,0],
  "E2": [7.6,12.7,1],
  "E3": [7.5,12.8,0],
}

const protein_links = {}
