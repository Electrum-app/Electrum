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

// Static [x,y] coordinates for query proteins
const ccm_coordinates = {
  //"HK1":[3,2,0,0],
  //"HK2":[4,2,1,0],
  //"HK3":[3,3,0,0],
  "GCK":[8,4,0,0],

  //"G6PC":[7,3,1,1],

  //"PGI":[4,5,0,2],

  "GPI":[12,7,1,3],

  //"PFKM":[4,7,0,4],
  "PFKL":[8,10,0,4],
  "PFKP":[8,11,0,4],

  "FBP1":[12,10,1,5],
  "FBP2":[12,11,1,5],

  "ALDOA": [5.5,13,0,6], //ALDOAconc?
  "ALDOB":[5.5,14,0,6],
  "ALDOC":[6.5,14,1,6],

  "GAPDH":[8,16.75,0,7],

  "TPI1":[13,16,1,8], //TPI1

  "PGK1":[8,19.5,0,9],
  "PGK2":[8,20.5,0,9],

  "PHGDH":[13,20.5,1,10],

  "PSAT1":[19,20.5,1,11],

  //"PSPH":[15,17,1,12],

  "PGAM1":[8,22.5,0,13],
  "PGAM2":[8,23.5,0,13],

  "ENO1": [8,25.75,0,14],
  "ENO2": [8,26.75,0,14],
  //"ENO3": [8,23,1,14],

  "PKLR": [6,29,0,15],  //?
  //"PYK": [4,25,1,15],
  "PKM1": [6,30,0,15], //?
  "PKM2": [7,30,1,15], //?

  //"LDHAL6B": [10,28,0,16],
  "LDHA": [15.5,30,0,16],
  "LDHB": [16.5,30,1,16],
  //"LDHC": [11,29,1,16],

  //"MPC1": [5,30,0,17],
  //"MPC2": [6,30,1,17],

  "E1-PDH": [6,33.75,0,31],
  "E2-PDH": [6,34.75,0,31],
  "E3-PDH": [7,34.75,1,31],

  //"PDHA1": [4,32,0,18],
  //"DLAT": [3,33,0,18],
  //"DLD": [4,33,1,18],

  //"ACC": [9,32,1,19], // citrate -> [acetyl-CoA -> malonyl-CoA]

  //"ACSS2A-c203": [12,35,1,20], // [acetate -> acetyl-CoA] -> TCA

  "CS": [17.5,38.25,1,21],

  //"ACO2_a": [10,37,1,22],

  //"ACO2_b": [12,40,1,23],

  //"IDH1": [11,43,0,24], // Not in same complex?
  "IDH2": [15,44.75,0,24],

  "IDH3a2bg": [21,44.5,1,25],
  "IDH3ab": [20,45.5,0,25],
  "IDH3ag": [21,45.5,1,25],

  //"OGDH": [8,47,0,26],
  //"DLST_b": [9,47,1,26],
  //"DLD_b": [8,48,0,26],
  //"DHTKD1r": [9,48,1,26],

  //"SUCLG1": [3,47,0,27],
  //"SUCLG2": [4,47,1,27],
  //"SUCLA2": [4,48,0,27],

  //"SDHA": [-2,43,0,28],
  //"SDHB": [-1,43,1,28],
  //"SDHC": [-2,44,0,28],
  //"SDHD": [-1,44,1,28],

  "FH": [2,41.25,0,29],

  //"MDH1": [1,37,0,30], // Not in same complex?
  "MDH2": [3,38,0,30],

}

const pathway_dictionary = {
  "Central Carbon Metabolism": ccm_coordinates,
};
