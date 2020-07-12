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

const selector = "#graph";

// Static [x,y] coordinates for query proteins
const protein_coordinates = {
  "ACC": [],
  "ACSS2A-c203": [],
  "ALDOAconc": [],
  "CS": [],
  "DHTKD1r": [],
  "E1": [],
  "E2": [],
  "E3": [],
  "ENO1": [],
  "ENO2": [],
  "FBPase-L": [],
  "FBPase-M": [],
  "FH": [],
  "GAPDH": [],
  "GCK": [],
  "IDH1": [],
  "IDH2": [],
  "IDH3A2BG": [],
  "IDH3AB": [],
  "IDH3AG": [],
  "LDHA": [],
  "LDHB": [],
  "MDH1": [],
  "MDH2": [],
  "PFKP": [],
  "PGAM1": [],
  "PGK1": [],
  "PHGDH": [],
  "PKM2": [],
  "PYK": [],
  "TPI": [],
}

// MAIN --> Change URL to HTTPS URL when data is public
let data_url = "_data\\CCM-MIDAS.txt"

d3.tsv(data_url)
  .then(function(data) {
      // data is now whole data set
      // draw chart in here!
      let midasGraph = new MIDASgraph(data);
  })
  .catch(function(error){
     // handle error
  })
