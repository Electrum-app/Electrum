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

const selector = "#graph";

// MAIN --> Change URL to HTTPS URL when data is public
let data_url = "data/MIDAS-latest.txt";
let mapper_url = "data/HSA-latest.eldb";
let metabolite_url = "data/metabolites.json";
let protein_url = "data/proteins.json";
let order_url = "data/radial_order.txt";

// add drop-down menu and selection determines input data table for construction
Promise.all([
  d3.tsv(data_url),
  d3.json(mapper_url),
  d3.json(metabolite_url),
  d3.json(protein_url),
  d3.tsv(order_url),
]).then(function(data) {
  let midasGraph = new MIDASgraph(data);
}).catch(function(error) {
  console.log(error)
});
