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
var background_forward = true;
var toggle_scaling = false;
var show_intra_pathway = true;
var q_threshold = 0.1;

class MIDASgraph {

  constructor(graph_data) {
    // Set constructor keys
    this.graphData = graph_data[0];
    this.metaboverseData = graph_data[1];
    this.metabolites_reference = graph_data[2];
    this.protein_reference = graph_data[3];
    this.radial_order = graph_data[4].map(({Metabolites}) => Metabolites);

    this.init_data();

    // create drop-down menu
    this.pathways = Object.keys(pathway_dictionary);
    this.pathway_dictionary = pathway_dictionary;
    this.pathway_dictionary_i = pathway_dictionary_i;
    this.components_dictionary = components_dictionary;
    this.background_dictionary = background_dictionary;
    this.menu_selector = "menu";
    this.make_menu();

    // Create watcher roles for menus and buttons
    let that = this;
    d3.select("#menu").on("change", function() {
      draw_graph(that)
    });
    d3.select("#toggle_absolute_values").on("click", function() {
      use_absolute_values = modVar(use_absolute_values);
      draw_graph(that)
    });
    d3.select("#toggle_labels").on("click", function() {
      show_labels = modVar(show_labels);
      draw_graph(that)
    });
    d3.select("#toggle_background").on("click", function() {
      background_forward = modVar(background_forward);
      draw_graph(that);
    });
    d3.select("#qval_button").on("change", function() {
      q_threshold = this.value;
      that.init_data();
      draw_graph(that);
    });
    d3.select("#toggle_scaling").on("click", function() {
      toggle_scaling = modVar(toggle_scaling);
      draw_graph(that);
    });
    d3.select("#toggle_intra_pathway").on("click", function() {
      show_intra_pathway = modVar(show_intra_pathway);
      draw_graph(that);
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

    this.complexes = {};
    this.proteins = [];
    this.metabolites = [];
    this.nodes = [];
    this.links = [];
    this.current_selection = new Set();
    this.all_values = [];
    this.added_nodes = [];
    this.node_lookup = {};
    this.indexer = 0;

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
        let _search = metabolite.replace(/[^0-9A-Z]+/gi, "").toLowerCase();
        let hmdb_id = this.metabolites_reference[_search].hmdb_id;
        let metabolite_name = this.metabolites_reference[_search].name;
        let kegg_id = this.metabolites_reference[_search].kegg_id;

        let protein = this.graphData[connection]['query_protein'];
        let protein_name = this.protein_reference[protein].name;
        let uniprot_id = this.protein_reference[protein].uniprot_id;

        if ((protein.replace(/\s/g, '') === "") || (metabolite.replace(/\s/g, '') === "")) {
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

        if (q_value <= parseFloat(q_threshold)) {

          // Add protein node info if doesn't exist
          if (!(this.added_nodes.includes(protein))) {
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
          if (!(this.added_nodes.includes(metabolite))) {
            this.metabolites.push(metabolite);
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

          // finish this
          //for (let _c in this.components_dictionary) {
          //  if () {}
          //}


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

    // get q-value percentiles
    for (let _p in this.proteins) {
      let _these_proteins = [];
      for (let _l in this.links) {
        if (this.links[_l].source.id === this.proteins[_p]) {
          _these_proteins.push({
            'id': this.links[_l].target.id,
            'q_value': this.links[_l].metadata.q_value
          });
        }
      }
      _these_proteins.sort(function(a, b) {
        return b.q_value - a.q_value;
      });
      for (let _tp in _these_proteins) {
        for (let _tl in this.links) {
          if (_these_proteins[_tp].id === this.links[_tl].target.id) {
            this.links[_tl].metadata.q_value_percentile = _tp / _these_proteins.length;
          }
        }
      }
    }

    // Get absolute max and make colormap
    this.abs_max = Math.max(...this.all_values);
    this.cmap = drawColormap(this.abs_max, "coolwarm")
    this.cmap_greys = drawColormap(this.abs_max, "Greys")
  }
}
