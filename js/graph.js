/*
Electrum
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

var _width = window.innerWidth;
var _height = window.innerHeight * 1.2;
var scale = 0.1;
var zoomWidth = (_width-scale*_width) / 2;
var zoomHeight = (_height-scale*_height) / 2.7;
var current_protein = "";
var current_metabolite = "";
var use_absolute_values = true;

class MIDASgraph{

   constructor(graph_data){
    // Set constructor keys
    this.graphData = graph_data;
    this.init_data();
    // create drop-down menu
    this.pathways = Object.keys(pathway_dictionary);
    this.pathway_dictionary = pathway_dictionary;
    this.menu_selector = "menu";
    this.make_menu();
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
    this.nodes = [];
    this.links = [];
    this.current_selection = new Set(); // Currently selected proteins & metabolites

    let all_values = [];
    let added_nodes = [];
    let node_lookup = {};
    let indexer = 0;

    for (let connection in this.graphData) {
      if (connection !== 'columns') {
        // Get some basic information
        let protein = this.graphData[connection]['Query_protein'];
        let metabolite = this.graphData[connection]['KEGG_ID'];
        let log_fc_c = this.graphData[connection]['log2_abundance_corrected'];
        let log_fc = this.graphData[connection]['log2_abundance'];
        let q_value = this.graphData[connection]['q_value'];
        let p_value = this.graphData[connection]['p_value'];
        let protein_complex = this.graphData[connection]['Protein_complex'];
        let uniprot_id = this.graphData[connection]['Uniprot_ID'];
        let protein_name = this.graphData[connection]['Protein_name'];
        let gene_name = this.graphData[connection]['Gene_ID'];
        let metabolite_name = this.graphData[connection]['Metabolite'];
        let hmdb_metabolite_id =
          this.graphData[connection]['HMDB_ID'];
        let common_metabolite_name =
          this.graphData[connection]['Common_metabolite_name'];
        all_values.push(Math.abs(log_fc_c));

        // ID string cleaning
        protein = protein.replace(/\s/g, '');
        metabolite = metabolite.replace(/\s/g, '');

        // Skip blank components
        if ((protein === "") | (metabolite === "")) {
          continue;
        }

        // Add protein to complex info if not added and not blank
        if (protein_complex !== "") {
          if (protein_complex in this.complexes) {
            this.complexes[protein_complex].push(protein);
          } else {
            this.complexes[protein_complex] = [protein];
          }
        }

        // Add protein node info if doesn't exist
        if (!added_nodes.includes(protein)) {
          this.proteins.push(protein);
          this.nodes.push({
            'id': protein,
            'display_name': protein,
            'type': "protein",
            'complex': protein_complex,
            'uniprot_id': uniprot_id,
            'protein_name': protein_name,
            'gene_name': gene_name,
            'metabolite_name': "",
            'common_metabolite_name': "",
            'hmdb_metabolite_id': "",
          });
          added_nodes.push(protein);
          node_lookup[protein] = indexer;
          indexer += 1;
        }

        // Add metabolite node info if doesn't exist
        if (!added_nodes.includes(metabolite)) {
          this.nodes.push({
            'id': metabolite,
            'display_name': metabolite_name,
            'type': "metabolite",
            'complex': "",
            'uniprot_id': "",
            'protein_name': "",
            'gene_name': "",
            'metabolite_name': metabolite_name,
            'common_metabolite_name': common_metabolite_name,
            'hmdb_metabolite_id': hmdb_metabolite_id,
          });
          added_nodes.push(metabolite);
          node_lookup[metabolite] = indexer;
          indexer += 1;
        }

        // Add link info and weights
        this.links.push(
          {
            "source": this.nodes[node_lookup[protein]],
            "target": this.nodes[node_lookup[metabolite]],
            "metadata": {
              "corrected_fold_change": log_fc_c,
              "fold_change": log_fc,
              "q_value": q_value,
              "p_value": p_value
            }
          }
        )
      }
    }

    // Get absolute max
    this.abs_max = Math.max(...all_values);

    // Make colormap
    this.cmap = drawColormap(this.abs_max)

    // extract unique elements for each complex
    for (let complex in this.complexes) {
      this.complexes[complex] = [...new Set(this.complexes[complex])];
    }
  }
}

function draw_graph(data) {

    var that = data;
    var cmap = that.cmap;
    let _nodes;
    let _links;
    let coordinates;
    let _distances;
    let selection = document.getElementById("menu").value;
    if (selection in that.pathway_dictionary) {
      _nodes = that.nodes;
      _links = that.links;
      coordinates = that.pathway_dictionary[selection];
      _distances = 2250;
      let _node_ids = [];
      for (let _n in _nodes) {
        _node_ids.push(_nodes[_n].id);
      }
    } else if (that.proteins.includes(selection)) {
      _links = that.links.filter(link => link.source.id === selection)
      // get the nodes with the links
      let _metabolites = [];
      for (let _m in _links) {_metabolites.push(_links[_m].target.id)}
      _nodes = that.nodes.filter(node => node.id === selection || _metabolites.includes(node.id))
      coordinates = {};
      coordinates[selection] = [6,20,1,24];
      _distances = 1150;
    } else {
      console.log("Did not select a protein or pathway")
      return
    }

    d3.selectAll("#svg_viewer_id").remove(); // reset graph

    // All tooltip code adapted from:
    //https://bl.ocks.org/d3noob/a22c42db65eb00d4e369
    var div_edge = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

    var div_protein = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

    var simulation = d3
      .forceSimulation(_nodes)
      .force("link", d3.forceLink(_links)
        .id(d => d.id)
        .distance(_distances)
        .strength(1))
      .force("collide", d3.forceCollide().radius(d => d.r*4).iterations(3))
      .force("charge", d3.forceManyBody().strength(-350))
      .force("center", d3.forceCenter(_width / 2, _height / 1.2))
      .alphaTarget(0.01)
      .alphaMin(0.1)
      //.velocityDecay(0.7);

    var forceX = d3.forceX(_width / 2).strength(0.015);
    var forceY = d3.forceY(_height / 2).strength(0.015);

    var _width_factor = _width / 2.5
    var _height_factor = _height / 5.5
    var _scale_factor = _height / 6500

    var svg_viewer = d3
      .select(selector)
      .append("svg")
      .attr("id", "svg_viewer_id")
      .attr("width", _width - 5)
      .attr("height", _height - 80)
      .call(
        d3.zoom().on("zoom", function() {
          svg_viewer.attr("transform", d3.event.transform);
        })
      )
      .on("dblclick.zoom", null)
      .append("g")
      .attr("transform", "translate(" + _width_factor + "," + _height_factor + ") scale(" + _scale_factor + "," + _scale_factor + ")");

    svg_viewer
      .append("defs")
      .selectAll("marker")
      .data([
        "protein",
        "metabolite"
      ])
      .enter()
      .append("marker")
      .attr("id", function(d) {
        return d.id;
      })
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 15.7)
      .attr("refY", -0.18)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0, -5L10, 0L0, 5");

    var link = svg_viewer
        .append("g")
        .selectAll("path")
        .data(_links)
        .enter()
        .append("path")
        .attr("id", function(d) {
          return d.source.id + "\," + d.target.id
        })
        .attr("class", function(d) {
          return "link interaction";
        })
        .style("--link_color", function(d) {
          let _val = parseFloat(d.metadata.corrected_fold_change).toFixed(1);
          if (use_absolute_values === true) {
            _val = Math.abs(_val);
          }
          return cmap[_val];
        })
        .attr("stroke-width", function(d) {
          let _weight = ((-1 * Math.log(d.metadata.q_value)) / 12) + 5;
          return _weight;
        })
        .on("mouseover", function(d) {
          // show label tooltip
          let _target = d.source.id;
          let _metabolite = d.target.display_name;
          let _fold_change = parseFloat(d.metadata.corrected_fold_change).toFixed(2);
          let _q_value = parseFloat(d.metadata.q_value).toExponential(2);
          let _display_string = (""
            + "<b>Protein:</b> " + _target + "<br>"
            + "<b>Metabolite:</b> " + _metabolite + "<br>"
            + "<b>log<sub>2</sub>(Fold Change):</b> " + _fold_change + "<br>"
            + "<b>q-value:</b> " + _q_value
          )
          div_edge.transition()
            .duration(100)
            .style("opacity", .9);
          div_edge
            .html(_display_string)
              .style("left", (d3.event.pageX + 10) + "px")
              .style("top", (d3.event.pageY - 5) + "px");
        })
        .on("mouseout", function(d) {
          // remove label tooltip
          div_edge.transition()
            .duration(500)
            .style("opacity", 0);
        });

    var node = svg_viewer
      .selectAll(".node")
      .data(_nodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("id", function(d) {return d.id})
      .call(
        d3
          .drag()
          .subject(dragsubject)
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      )
      .on("click", function(d) {

        if (d.type === "protein") {
          current_protein = d.id;

          node.filter(function (d) {
            if (d.type !== "protein" && d.type !== "other_protein") {
              return d;
            }
          })
            .style("visibility", "hidden")
            .style("opacity", 1);
          link.filter(function (d) {return d;})
            .style("visibility", "hidden")
            .style("opacity", 1);

          //get all links
          let get_metabolites = [];
          link.filter(function (l) {
            if (l.source.id === d.id) {
              get_metabolites.push(l.target.id)
              return l;
            }
          })
            .style("visibility", "visible")
            .style("opacity", 1);
          link.filter(function (ll) {
            if (get_metabolites.includes(ll.target.id)) {
              return ll;
            }
          })
            .style("visibility", "visible")
            .style("opacity", 1);

          // get all interacting metabolites and their links
          node.filter(function (n) {
            if (n.type === "metabolite" && get_metabolites.includes(n.id)) {
              return n;
            }
          })
            .style("visibility", "visible")
            .style("opacity", 1);

        } else if (d.type === "metabolite") {
          current_metabolite = d.id;
          let _id = d.id;
          let _name = d.display_name;
          let _other = d.common_metabolite_name;

          // reset other Metaboverse NN
          // get this metabolite's Metaboverse NN

          // find metabolite species_id
          // find all reactions species_id
            // show inputs, outputs, modifiers using Metaboverse notation
          // find all pathways for the reactions and use as hulls
          // label hulls

          // probably need to add all this in nodes and links at start and just give special IDs to be able to hide and show when selected

          // use a tooltip for result display like this: https://www.d3-graph-gallery.com/graph/interactivity_tooltip.html
          // example #2



        }

        // reset protein shading
        for (let n in _nodes) {
          if (current_protein === _nodes[n].id) {
            d3.select("rect#" + _nodes[n].id).style("fill", "red");
          } else if (current_protein !== _nodes[n].id && "protein" === _nodes[n].type) {
            d3.select("rect#" + _nodes[n].id).style("fill", "orange");
          } else if (current_protein !== _nodes[n].id && "other_protein" === _nodes[n].type) {
            d3.select("rect#" + _nodes[n].id).style("fill", "grey");
          }
        }
      })

    node.each(function(d) {
      if (d.type === "protein" || d.type === "other_protein") {
        d.fx = coordinates[d.id][0] * 100;
        d.fy = coordinates[d.id][1] * 100 - 1000;
      }
    });

    var circle = node
      .append(function(d) {
        if (d.type === "protein" || d.type === "other_protein") {
          return document.createElementNS(
            "http://www.w3.org/2000/svg", "rect");
        } else {
          return document.createElementNS(
            "http://www.w3.org/2000/svg", "circle");
        }
      })
      .attr("id", function(d) {return d.id})
      .style("fill", function(d) {
        if (d.type === "protein") {
          return "orange"
        } else if (d.type === "other_protein") {
          return "grey"
        }
      })
      .on("mouseover", function(d){
        if (d.type === "protein") {
          d3.select(this).style("fill", "red");
          let _display_string = "<b>Metabolite Structure Results:</b><br>...";

          // Pop up metabolite analysis side-panel for these metabolites

          //

          //


          div_protein.transition()
            .duration(100)
            .style("opacity", .9);
          div_protein
            .html(_display_string)
              .style("left", (d3.event.pageX + 10) + "px")
              .style("top", (d3.event.pageY - 5) + "px");
        } else if (d.type === "metabolite") {
          let _display_string = (""
            + "<b>Name:</b> " + d.display_name + "<br>"
            + "<b>Other name:</b> " + d.common_metabolite_name + "<br>"
            + "<b>KEGG ID:</b> " + d.id
          );
          div_protein.transition()
            .duration(100)
            .style("opacity", .9);
          div_protein
            .html(_display_string)
              .style("left", (d3.event.pageX + 10) + "px")
              .style("top", (d3.event.pageY - 5) + "px");
        }
      }).on("mouseout", function(d){
        if (d.id === current_protein) {
          d3.select(this).style("fill", "red");
        } else if (d.type === "other_protein") {
          d3.select(this).style("fill", "grey");
        } else if (d.type === "protein") {
          d3.select(this).style("fill", "orange");
        }
        div_protein.transition()
          .duration(500)
          .style("opacity", 0);
      });

    var text = node
      .append("text")
      .raise()
      .html(function(d) {
        if (d.type === "protein" || d.type === "other_protein") {
          if (coordinates[d.id][2] === 1) {
            return (
              "<tspan dx='46' y='.31em' style='font-weight: bold;'>"
              + d.display_name.split("_")[0]
              + "</tspan>"
            );
          } else {
            return (
              "<tspan dx='-46' y='.31em' style='font-weight: bold; text-anchor: end;'>"
              + d.display_name.split("_")[0]
              + "</tspan>"
            );
          }
        } else {
          return (
            "<tspan dx='32' y='.31em' style='font-weight: bold;'>"
            + d.display_name
            + "</tspan>"
          );
        }
      });

    showNodes()
    simulation.on("tick", tick);
    if (selection in that.pathway_dictionary) {
      setTimeout(delayDisappear, 1000);
    }

    function delayDisappear() {
      node.filter(function (d) {
        if (d.type !== "protein" && d.type !== "other_protein") {
          return d;
        }
      })
        .transition().duration(3000).style("opacity", 0);
      link.filter(function (d) {return d;})
        .transition().duration(3000).style("opacity", 0);
      setTimeout(hideNodes, 3000);
    }

    function hideNodes() {
      node.filter(function (d) {
        if (d.type !== "protein" && d.type !== "other_protein") {
          return d;
        }
      })
        .style("visibility", "hidden")
        .style("opacity", 1);
      link.filter(function (d) {return d;})
        .style("visibility", "hidden")
        .style("opacity", 1);
    }

    function showNodes() {
      node.filter(function (d) {
        if (d.type !== "protein" && d.type !== "other_protein") {
          return d;
        }
      })
        .style("visibility", "visible")
        .style("opacity", 1);
      link.filter(function (d) {return d;})
        .style("visibility", "visible")
        .style("opacity", 1);
    }

    // Draw curved edges
    function tick() {
      link
        .attr("d", linkArc);
      circle
        .attr("transform", transform);
      text
        .attr("transform", transform);

    }

    function linkArc(d) {

      var dx = d.target.x - d.source.x;
      var dy = d.target.y - d.source.y;

      return (
        "M" +
        d.source.x +
        "," +
        d.source.y +
        "A0,0 0 0,1 " +
        d.target.x +
        "," +
        d.target.y
      );
    }

    function transform(d) {
      return "translate(" + d.x + "," + d.y + ")";
    }

    function dragsubject() {
      return simulation.find(d3.event.x, d3.event.y);
    }

    function dragstarted() {
      if (d3.event.subject.type === "metabolite") {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d3.event.subject.fx = d3.event.subject.x;
        d3.event.subject.fy = d3.event.subject.y;
      }
    }

    function dragged() {
      if (d3.event.subject.type === "metabolite") {
        d3.event.subject.fx = d3.event.x;
        d3.event.subject.fy = d3.event.y;
      }
    }

    function dragended() {
      if (d3.event.subject.type === "metabolite") {
        if (!d3.event.active)
          simulation
            .alphaTarget(0.05)
            .alphaMin(0.06)
            .velocityDecay(0.7);
        d3.event.subject.fx = null;
        d3.event.subject.fy = null;
      }
    }

    function drawLink(d) {
      context.moveTo(d.source.x, d.source.y);
      context.lineTo(d.target.x, d.target.y);
    }

    function drawNode(d) {
      context.moveTo(d.x + 3, d.y);
      context.arc(d.x, d.y, 3, 0, 2 * Math.PI);
    }
  }
