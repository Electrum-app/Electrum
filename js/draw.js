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

This program is distributed in the hope this it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with
this program.  If not, see <https://www.gnu.org/licenses/>.
*/

var scale = 0.1;
var current_protein = "";
var current_metabolite = "";
var timer = 0;
var delay = 200;
var prevent = false;

function draw_graph(data) {

  var that = data;
  var cmap = that.cmap;
  var cmap_greys = that.cmap_greys;

  // get nodes, links, coordinates for pathway or protein selection
  let selection = document.getElementById("menu").value;
  let selection_outputs = set_selection(that, selection);
  let _links = selection_outputs[0];
  let _nodes = selection_outputs[1];
  let _distances = selection_outputs[2];
  let coordinates = selection_outputs[3];

  // reset graph
  d3.selectAll("#svg_viewer_id").remove();

  // All tooltip code adapted from:
  //https://bl.ocks.org/d3noob/a22c42db65eb00d4e369
  var div_edge = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);
  var div_protein = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

  var _width = window.innerWidth;
  var _height = window.innerHeight * 1.2;
  var simulation = init_simulation(
    _nodes, _links, _distances, _width, _height);
  var forceX = d3.forceX(_width / 2).strength(0.015);
  var forceY = d3.forceY(_height / 2).strength(0.015);

  // Set graphing space
  svg_viewer = init_canvas(selector, _width, _height);

  // Draw edges
  init_edges(svg_viewer)
  link = make_edges(svg_viewer, div_edge, that, _links);

  // Draw background SVG pathway if selection is a pathway
  draw_background(svg_viewer, that, selection);

  // Draw nodes (must happen after links are initialized)
  let node_outputs = init_nodes(
      svg_viewer, that, link, _nodes,
      coordinates, current_protein, current_metabolite,
      timer, prevent);
  node = node_outputs[0];
  current_protein = node_outputs[1];
  current_metabolite = node_outputs[2];
  node.call(
    d3.drag()
      .subject(dragsubject)
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended)
  )
  circle = make_nodes(node, current_protein, div_protein);

  // Draw text
  text = make_text(node, coordinates);

  showNodes()
  simulation.on("tick", tick);

  if (selection in that.pathway_dictionary && show_all === false) {
    setTimeout(delayDisappear, 1000);
  }

  // Draw curved edges
  function tick() {
    circle
      .attr("transform", transform);
    link
      .attr("d", linkArc);
    text
      .attr("transform", transform);
  }

  // Internal functions
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

  function dragsubject() {
    return simulation.find(d3.event.x, d3.event.y);
  }

  function dragstarted() {
    if (d3.event.subject.type !== "protein") {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d3.event.subject.fx = d3.event.subject.x;
      d3.event.subject.fy = d3.event.subject.y;
    }
  }

  function dragged() {
    if (d3.event.subject.type !== "protein") {
      d3.event.subject.fx = d3.event.x;
      d3.event.subject.fy = d3.event.y;
    }
  }

  function dragended() {
    if (d3.event.subject.type !== "protein") {
      if (!d3.event.active)
        simulation
          .alphaTarget(0.05)
          .alphaMin(0.06)
          .velocityDecay(0.7);
      d3.event.subject.fx = null;
      d3.event.subject.fy = null;
    }
  }
}