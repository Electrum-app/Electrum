/* MIDAS-Viz
Dynamic exploration of MIDAS protein-metabolite interaction data
https://github.com/j-berg/MIDAS-Viz/
alias: midas-viz

Copyright (C) 2020 Jordan A. Berg
Email: jordan<dot>berg<at>biochem<dot>utah<dot>edu

MIT License

Copyright (c) 2020 Jordan Berg

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
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

// MAIN
let data_url = "_data/CCM-MIDAS.txt"

d3.tsv(data_url).then(function(data) {
  let midasGraph = new MIDASgraph(data);
});
