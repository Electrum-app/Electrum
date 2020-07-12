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
var _height = window.innerHeight - 75;

class MIDASgraph{

   constructor(graph_data){

    // Set constructor keys
    this.graphData = graph_data;
    this.complexes = {};
    this.nodes = [];
    this.links = [];
    let all_values = [];
    let added_nodes = [];
    let node_lookup = {};
    let indexer = 0;

    for (let connection in this.graphData) {
      if (connection !== 'columns') {

        // Get some basic information
        let protein = this.graphData[connection]['Query_protein'];
        let metabolite = this.graphData[connection]['KEGG_ID_metabolite'];
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
          this.graphData[connection]['HMDB_ID_metabolite'];
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
          this.nodes.push({
            'id': protein,
            'display_name': protein_name,
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
        );
      }
    }

    // Get absolute max
    this.abs_max = Math.max(...all_values);

    // Make colormap
    let cmap = drawColormap(this.abs_max)

    // extract unique elements for each complex
    for (let complex in this.complexes) {
      this.complexes[complex] = [...new Set(this.complexes[complex])];
    }

    // Graph
    var simulation = d3
      .forceSimulation(this.nodes)
      .force("link", d3.forceLink(this.links)
        .id(d => d.id)
        .distance(40)
        .strength(1))
      .force("charge", d3.forceManyBody().strength(-10000))
      .force("center", d3.forceCenter(_width / 2, _height / 2))
      .alphaTarget(0.01)
      .alphaMin(0.1)
      .velocityDecay(0.7);

    var forceX = d3.forceX(_width / 2).strength(0.015);
    var forceY = d3.forceY(_height / 2).strength(0.015);

    var svg_viewer = d3
      .select(selector)
      .append("svg")
      .attr("width", _width - 5)
      .attr("height", _height - 80)
      .call(
        d3.zoom().on("zoom", function() {
          svg_viewer.attr("transform", d3.event.transform);
        })
      )
      .on("dblclick.zoom", null)
      .append("g");

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
        .data(this.links)
        .enter()
        .append("path")
        .attr("class", function(d) {
          return "link interaction";
        })
        .style("--link_color", function(d) {
          let _val = parseFloat(d.metadata.corrected_fold_change).toFixed(1);
          console.log()
          return cmap[_val];
        })
        .attr("stroke-width", function(d) {
          return (-1 * Math.log(d.metadata.q_value)) / 12;
        });

    var node = svg_viewer
      .selectAll(".node")
      .data(this.nodes)
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
      );

    var circle = node.append(function(d) {
        if (d.type === "protein") {
          return document.createElementNS(
            "http://www.w3.org/2000/svg", "rect");
        } else {
          return document.createElementNS(
            "http://www.w3.org/2000/svg", "circle");
        }
      })
      .attr("id", function(d) {return d.id});

    var text = node
        .append("text")
        .html(function(d) {
          return (
            "<tspan dx='16' y='.31em' style='font-weight: bold;'>"
            + d.display_name
            + "</tspan>"
          );

        });

    simulation.on("tick", tick);

    // Draw curved edges
    function tick() {
      link
        .attr("d", linkArc);
      circle
        .attr("transform", transform);
      text
        .attr("transform", transform);
      //hull
      //  .data(convexHulls(new_nodes, new_links, getGroup, offset))
      //  .attr("d", drawCluster);
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
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d3.event.subject.fx = d3.event.subject.x;
      d3.event.subject.fy = d3.event.subject.y;
    }

    function dragged() {
      d3.event.subject.fx = d3.event.x;
      d3.event.subject.fy = d3.event.y;
    }

    function dragended() {
      if (!d3.event.active)
        simulation
          .alphaTarget(0.05)
          .alphaMin(0.06)
          .velocityDecay(0.7);
      d3.event.subject.fx = null;
      d3.event.subject.fy = null;
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



}




//Use hulls for complexes
