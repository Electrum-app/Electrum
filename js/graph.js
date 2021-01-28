/*
Electrum
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

var use_absolute_values = true;
var show_labels = true;
var show_all = false;
var q_threshold = 0.1;

class MIDASgraph{

   constructor(graph_data){
    // Set constructor keys
    this.graphData = graph_data[0];
    this.metaboverseData = graph_data[1];
    this.complexes = {};
    this.proteins = [];
    this.nodes = [];
    this.links = [];
    this.current_selection = new Set();
    this.all_values = [];
    this.added_nodes = [];
    this.node_lookup = {};
    this.indexer = 0;

    this.init_data();

    // create drop-down menu
    this.pathways = Object.keys(pathway_dictionary);
    this.pathway_dictionary = pathway_dictionary;
    this.background_dictionary = background_dictionary;
    this.menu_selector = "menu";
    this.make_menu();

    // Create watcher roles for menus and buttons
    let that = this;
    d3.select("#menu").on("change", function() {
      draw_graph(that)
    });
    d3.select("#toggle_absolute_values").on("click", function() {
      if (use_absolute_values === true) {
        use_absolute_values = false;
      } else {
        use_absolute_values = true;
      }
      draw_graph(that)
    });
    d3.select("#toggle_labels").on("click", function() {
      if (show_labels === true) {
        show_labels = false;
      } else {
        show_labels = true;
      }
      draw_graph(that)
    });
    d3.select("#toggle_all").on("click", function() {
      if (show_all === true) {
        show_all = false;
      } else {
        show_all = true;
      }
      draw_graph(that)
    });
  }

  // other functions
  make_menu() {
    var menu_list = [];
    var sorted_pathways = this.pathways.sort();
    var sorted_proteins = this.proteins.sort();
    menu_list.push("Select a pathway or protein...");
    menu_list.push("---------------------------------------");
    menu_list.push("Pathways:");
    for (let _pathway in sorted_pathways) {
      menu_list.push(sorted_pathways[_pathway]);
    }
    menu_list.push("---------------------------------------");
    menu_list.push("Proteins:");
    for (let _protein in sorted_proteins) {
      menu_list.push(sorted_proteins[_protein]);
    }
    // Generate drop-down menu for species select
    var menu = [];
    menu = document.getElementById(this.menu_selector);
    for (var i = 0; i < menu_list.length; i++) {
      var option = document.createElement("option");
      option.innerHTML = menu_list[i];
      option.value = menu_list[i];
      menu.appendChild(option);
    }
  }

  init_data() {

    for (let connection in this.graphData) {
      if (connection !== 'columns') {
        // Get some basic information
        let metabolite = this.graphData[connection]['metabolite'];
        let isomers = [];
        let other_isomers = "";
        if (metabolite.includes(';')) {
          isomers = metabolite.split(';');
          metabolite = isomers[0];
          other_isomers = isomers.slice(1, isomers.length);
        } else {}
        let _search = metabolite.replace(/[^0-9A-Z]+/gi,"").toLowerCase();
        let hmdb_id = metabolites_reference[_search].hmdb_id;
        let metabolite_name = metabolites_reference[_search].name;
        metabolite = metabolite.replace(/\s/g, ''); // Clean string, skip blanks

        let kegg_id = metabolites_reference[_search].kegg_id;

        let protein = this.graphData[connection]['query_protein'];
        let protein_name = protein_reference[protein].name;
        let uniprot_id = protein_reference[protein].uniprot_id;
        protein = protein.replace(/\s/g, ''); // Clean string, skip blanks

        if ((protein === "") | (metabolite === "")) {
          continue;
        }

        // Get values
        let log_fc = this.graphData[connection]['log2_abundance'];
        let log_fc_c = this.graphData[connection]['log2_abundance_corrected'];
        let met_mean = this.graphData[connection]['met_mean'];
        let met_sd = this.graphData[connection]['met_sd'];
        let p_value = this.graphData[connection]['p_value'];
        let q_value = this.graphData[connection]['q_value'];
        this.all_values.push(Math.abs(log_fc_c));

        if (q_value <= q_threshold) {

          // Add protein node info if doesn't exist
          if (!this.added_nodes.includes(protein)) {
            this.proteins.push(protein);
            this.nodes.push({
              'id': protein,
              'display_name': protein,
              'type': "protein",
              'protein_name': protein_name,
              'isomers': other_isomers,
              'uniprot_id': uniprot_id,
              'hmdb_id': "",
              'kegg_id': ""
            });
            this.added_nodes.push(protein);
            this.node_lookup[protein] = this.indexer;
            this.indexer += 1;
          }

          // Add metabolite node info if doesn't exist
          if (!this.added_nodes.includes(metabolite)) {
            this.nodes.push({
              'id': metabolite,
              'display_name': metabolite_name,
              'type': "metabolite",
              'protein_name': "",
              'isomers': other_isomers,
              'uniprot_id': "",
              'hmdb_id': hmdb_id,
              'kegg_id': kegg_id
            });
            this.added_nodes.push(metabolite);
            this.node_lookup[metabolite] = this.indexer;
            this.indexer += 1;
          }

          // Add link info and weights
          this.links.push({
            "source": this.nodes[this.node_lookup[protein]],
            "target": this.nodes[this.node_lookup[metabolite]],
            "metadata": {
              "corrected_fold_change": log_fc_c,
              "q_value": q_value,
              "type": "core",
            }
          })
        }
      }
    }

    // Get absolute max and make colormap
    this.abs_max = Math.max(...this.all_values);
    this.cmap = drawColormap(this.abs_max, "coolwarm")
    this.cmap_greys = drawColormap(this.abs_max, "Greys")
  }
}
