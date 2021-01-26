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
var zoomWidth = (_width-scale*_width)/2;
var zoomHeight = (_height-scale*_height)/2.7;

class MIDASgraph{

  constructor(graph_data){
    // Graph
    this.graph_data = graph_data
    this.initData = this.initializeData(graph_data);

    

    console.log("initData", this.initData)

    this.clicked_nodes = {} // record which nodes are currently clicked, and how many metabolite it has

    // this.protein_coordinates = JSON.parse(JSON.stringify(protein_coordinates)) // deep copy

    this.initData.nodes.forEach(d=>{
      d.xcoord = protein_coordinates[d.id][0];
      d.ycoord = protein_coordinates[d.id][1];
      d.text_coord = protein_coordinates[d.id][2];
    })

    let that = this;

    this.svg_width = _width - 5;
    this.svg_height = _height - 80;

    this.svg_margin = {"top":10, "bottom":50, "left": 120, "right":20};

    this.svg_viewer = d3.select(selector).append("svg")
      .attr("width", this.svg_width)
      .attr("height", this.svg_height)
      .call(
        d3.zoom().on("zoom", function() {
          that.svg_viewer.attr("transform", d3.event.transform);
        })
      )
      .on("dblclick.zoom", null)
      .append("g");
    
    // this.svg_viewer
    //   .append("defs")
    //   .selectAll("marker")
    //   .data([
    //     "protein",
    //     "metabolite"
    //   ])
    //   .enter()
    //   .append("marker")
    //   .attr("id", function(d) {
    //     return d.id;
    //   })
    //   .attr("viewBox", "0 -5 10 10")
    //   .attr("refX", 15.7)
    //   .attr("refY", -0.18)
    //   .attr("markerWidth", 6)
    //   .attr("markerHeight", 6)
    //   .attr("orient", "auto")
    //   .append("path")
    //   .attr("d", "M0, -5L10, 0L0, 5");
    
    

    this.draw_graph();
  }

  initializeData(graphData) {

    let complexes = {};
    let node_list = [];
    let link_list = [];
    let all_values = [];
    let added_nodes = [];
    let node_lookup = {};
    let indexer = 0;

    for (let connection in graphData) {
      if (connection !== 'columns') {

        // Get some basic information
        let protein = graphData[connection]['Query_protein'];
        let metabolite = graphData[connection]['KEGG_ID_metabolite'];
        let log_fc_c = graphData[connection]['log2_abundance_corrected'];
        let log_fc = graphData[connection]['log2_abundance'];
        let q_value = graphData[connection]['q_value'];
        let p_value = graphData[connection]['p_value'];
        let protein_complex = graphData[connection]['Protein_complex'];
        let uniprot_id = graphData[connection]['Uniprot_ID'];
        let protein_name = graphData[connection]['Protein_name'];
        let gene_name = graphData[connection]['Gene_ID'];
        let metabolite_name = graphData[connection]['Metabolite'];
        let hmdb_metabolite_id =
          graphData[connection]['HMDB_ID_metabolite'];
        let common_metabolite_name =
          graphData[connection]['Common_metabolite_name'];
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
          if (protein_complex in complexes) {
            complexes[protein_complex].push(protein);
          } else {
            complexes[protein_complex] = [protein];
          }
        }

        // Add protein node info if doesn't exist
        if (!added_nodes.includes(protein)) {
          node_list.push({
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
      }
    }

    for (let p in protein_coordinates) {
      if (!added_nodes.includes(p)) {
        node_list.push({
          'id': p,
          'display_name': p,
          'type': "other_protein",
          'complex': "",
          'uniprot_id': p,
          'protein_name': p,
          'gene_name': p,
          'metabolite_name': "",
          'common_metabolite_name': "",
          'hmdb_metabolite_id': "",
        });
        added_nodes.push(p);
        node_lookup[p] = indexer;
        indexer += 1;
      }
    }

    // Get absolute max
    let abs_max = Math.max(...all_values);

    // Make colormap
    let cmap = drawColormap(abs_max)

    // extract unique elements for each complex
    for (let complex in complexes) {
      complexes[complex] = [...new Set(complexes[complex])];
    }

    return {
      "nodes": node_list,
      "links": link_list,
      "abs_max": abs_max,
      "cmap": cmap,
      "complexes": complexes,
      "node_lookup": node_lookup
    };
  }

  updateData(data, selected_protein, nodes, links) {

    // Get connections from data
    let complexes = {};
    let node_list = [];
    let link_list = [];
    let all_values = [];
    let added_nodes = [];
    let node_lookup = {};
    let indexer = 0;

    for (let connection in data) {
      if (connection !== 'columns') {

        // Get some basic information
        let protein = data[connection]['Query_protein'];
        let metabolite = data[connection]['KEGG_ID_metabolite'];
        let log_fc_c = data[connection]['log2_abundance_corrected'];
        let log_fc = data[connection]['log2_abundance'];
        let q_value = data[connection]['q_value'];
        let p_value = data[connection]['p_value'];
        let protein_complex = data[connection]['Protein_complex'];
        let uniprot_id = data[connection]['Uniprot_ID'];
        let protein_name = data[connection]['Protein_name'];
        let gene_name = data[connection]['Gene_ID'];
        let metabolite_name = data[connection]['Metabolite'];
        let hmdb_metabolite_id =
          data[connection]['HMDB_ID_metabolite'];
        let common_metabolite_name =
          data[connection]['Common_metabolite_name'];
        all_values.push(Math.abs(log_fc_c));

        // ID string cleaning
        protein = protein.replace(/\s/g, '');
        metabolite = metabolite.replace(/\s/g, '');

        // Skip blank components
        if ((protein === "") | (metabolite === "")) {
          continue;
        }
        // console.log(this.initData.node_lookup[protein])
        // console.log(this.initData.nodes[this.initData.node_lookup[protein]])

        if (protein === selected_protein) {
          let protein_idx = this.initData.node_lookup[protein];
          let protein_node = this.initData.nodes[protein_idx];
          if (!added_nodes.includes(protein)) {
            node_list.push({
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
              'xcoord':protein_node.xcoord,
              'ycoord':protein_node.ycoord,
              'text_coord':protein_node.text_coord
            });
            added_nodes.push(protein);
            node_lookup[protein] = indexer;
            indexer += 1;
          }
          if(Object.keys(this.clicked_nodes).indexOf(protein)===-1){
            this.clicked_nodes[protein] = 0;
            
            // update coordinates of other proteins
            for(let i=0; i<this.initData.nodes.length; i++){
              let current_node = this.initData.nodes[i];
              if(current_node.xcoord > protein_node.xcoord+0.05){
                // if the node is on the right of current protein, move it to the right so that there will be space for metabolites
                current_node.xcoord += 0.5;
              }
            }
          }
        }
        if (protein === selected_protein) {
          // get protein coords
          let protein_idx = this.initData.node_lookup[protein];
          let protein_node = this.initData.nodes[protein_idx];

          if (!added_nodes.includes(metabolite)) {
            let metabolite_coords = this.get_coords(protein_node.xcoord, protein_node.ycoord, protein)
            node_list.push({
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
              // 'xcoord': protein_node.xcoord + 0.1,
              // 'ycoord': protein_node.ycoord + 0.3*this.clicked_nodes[protein],
              'xcoord': metabolite_coords.x,
              'ycoord':metabolite_coords.y
            });
            added_nodes.push(metabolite);
            node_lookup[metabolite] = indexer;
            indexer += 1;
            this.clicked_nodes[protein] += 1
          }
          // Add link info and weights
          link_list.push(
            {
              "source": node_list[node_lookup[protein]],
              "target": node_list[node_lookup[metabolite]],
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
    }
    // add to nodes and links
    console.log(node_list)
    console.log(link_list)
    console.log(nodes)


    console.log('===')
    this.initData.nodes = this.initData.nodes.concat(node_list)
    this.initData.links = this.initData.links.concat(link_list)
    console.log(this.clicked_nodes)
    this.draw_graph();
  }

  clear_graph(){
    d3.select("#links_group").remove();
    d3.select("#nodes_group").remove();
  }

  draw_graph(){
    console.log("drawing graph")
    this.clear_graph();
    this.links_group = this.svg_viewer.append("g")
      .attr("id", "links_group");
    this.nodes_group = this.svg_viewer.append("g")
      .attr("id", "nodes_group");

    let that = this;
    
    // let simulation = d3.forceSimulation(this.initData.nodes)
    //   .force("link", d3.forceLink().id(d => d.id).distance(400).strength(1))
    //   .force("charge", d3.forceManyBody().strength(-5000))
    //   .force("center", d3.forceCenter(_width / 2, _height / 1.2))
    //   .alphaTarget(0.01)
    //   .alphaMin(0.1)
    //   .velocityDecay(0.7);

    // let forceX = d3.forceX(_width / 2).strength(0.015);
    // let forceY = d3.forceY(_height / 2).strength(0.015);

    this.initData.nodes.forEach(d=>{
      d.links = [];
    })
    this.initData.links.forEach(d=>{
      let eid = d.source.id + "-" + d.target.id;
      d.source.links.push(eid);
      d.target.links.push(eid);
    })

    let xMin = Math.min(...this.initData.nodes.map(d=>d.xcoord));
    let xMax = Math.max(...this.initData.nodes.map(d=>d.xcoord));
    let xScale = d3. scaleLinear()
      .domain([xMin, xMax])
      .range([this.svg_margin.left, this.svg_width-this.svg_margin.right])

    let yMin = Math.min(...this.initData.nodes.map(d=>d.ycoord));
    let yMax = Math.max(...this.initData.nodes.map(d=>d.ycoord));
    let yScale = d3. scaleLinear()
        .domain([yMin, yMax])
        .range([this.svg_margin.top, this.svg_height-this.svg_margin.bottom])

    console.log(xMin, xMax)
    console.log(yMin, yMax)
    
    // let links = this.links_group.selectAll("path").data(this.initData.links);
    // links.exit().remove();
    // links = links.enter().append("path").merge(links)        
    //     .attr("id", function(d) {
    //       return d.source.id + "\," + d.target.id
    //     })
    //     .attr("class", "link interaction")
    //     .style("--link_color", function(d) {
    //       let _val = parseFloat(d.metadata.corrected_fold_change).toFixed(1);
    //       console.log()
    //       return cmap[_val];
    //     })
    //     .attr("stroke-width", function(d) {
    //       return ((-1 * Math.log(d.metadata.q_value)) / 100) + 5;
    //     });

    console.log(this.initData.links)

    let links = this.links_group.selectAll("line").data(this.initData.links);
      links.exit().remove();
      links = links.enter().append("line").merge(links)
          .attr("x1", d=>xScale(d.source.xcoord)-32)
          .attr("y1", d=>yScale(d.source.ycoord)-32)
          .attr("x2", d=>xScale(d.target.xcoord))
          .attr("y2", d=>yScale(d.target.ycoord)-29)
          .attr("stroke", "black")
          .attr("opacity", 0.3)
          .attr("id", d=>d.source.id+"-"+d.target.id)

      
    let nodes = this.nodes_group.selectAll("g").data(this.initData.nodes);
    nodes.exit().remove();
    nodes = nodes.enter().append("g").merge(nodes)
      .classed("node", true)
      .attr("id", d=>d.id)
      .attr("transform", d => {
        return "trans  late("+xScale(d.xcoord) + "," + yScale(d.ycoord)+")"})
      .call(
        d3
          .drag()
          // .subject(dragsubject)
          .on("start", dragstarted)
          .on("drag", d => dragged(d))
          .on("end", d => dragended(d))
      );

    // nodes.each(function(d) {
    //   if (d.type === "protein" || d.type === "other_protein") {
    //     d.fx = that.protein_coordinates[d.id][0] * (_width / 9) - (_width / 20);
    //     d.fy = that.protein_coordinates[d.id][1] * 100 - 1000;
    //   } else if (d.type === "metabolite"){
    //     d.fx = d.fx_const * (_width / 9) - (_width / 20);
    //     d.fy = d.fy_const * 100 - 1050;
    //   }
    // });
    

    let text = nodes
      .append("text")
      .raise()
      .attr("id", d=>"text_"+d.id)
      .html(function(d) {
        if (d.type === "protein" || d.type === "other_protein") {
          if (d.text_coord === 1) {
            return (
              "<tspan dx='-20px' y='-2.9em' style='font-weight: bold;'>"
              + d.display_name.split("_")[0]
            + "</tspan>"
              );
          } else {
              return (
                "<tspan dx='-40px' y='-2.9em' style='font-weight: bold; text-anchor: end;'>"
                + d.display_name.split("_")[0]
                + "</tspan>"
              );
            }
          } 
          else {
            return (
              // "<tspan dx='-32px' y='-2.9em' style='font-weight: bold;'>"
              "<tspan dx='-32px' y='-2.9em' style='font-weight: bold;'>"
              + d.display_name
              + "</tspan>"
            );
          }
        })
        .style("opacity", (d)=>{
          if(d.type === "metabolite"){
            return 0;
          } else {
            return 1;
          }
        });

    let circles = nodes
      .append(function(d) {
        if (d.type === "protein" || d.type === "other_protein") {
          return document.createElementNS(
            "http://www.w3.org/2000/svg", "rect");
        } else {
          return document.createElementNS(
            "http://www.w3.org/2000/svg", "circle");
        }
      })
      // .attr("cx", d=>xScale(d.xcoord))
      // .attr("cy", d=>yScale(d.ycoord))
      // .attr("x", d=>xScale(d.xcoord))
      // .attr("y", d=>yScale(d.ycoord))
      .attr("id", function(d) {
        return "circle-"+d.id;
      })
      .attr("class", function(d) {
        return d.type;
      })
      .attr("transform", d=>{
        if(d.type === "protein" || d.type === "other_protein"){
          return ""
        } else{
          return "translate(0,-30)";
        }
      })
      .style("fill", function(d) {
        if (d.type === "protein") {
          return "orange"
        } else if(d.type === "metabolite") {
          return "#cdcdcd"
        }
      })
      .on("mouseover", function(d) {
        if(d.type === "protein") {
          d3.select(this).style("opacity", 0.5);
        } else if (d.type === "metabolite"){
          d3.select(this).style("opacity", 0.5);
          d3.select("#text_"+d.id).style("opacity", 1);
        }
      })
      .on("mouseout", function(d) {
        if(d.type === "protein") {
          d3.select(this).style("opacity", 1);
        }
        else if (d.type === "metabolite"){
          d3.select(this).style("opacity", 1);
          d3.select("#text_"+d.id).style("opacity", 0);
        }
      })
      .on("click", function(d) {
        if (d.type === "protein") {
          // Unhighlight last protein and highlight selected protein
          d3.selectAll(".other_protein").style("fill", "grey")
          d3.selectAll(".protein").style("fill", "orange")
          d3.select('rect#' + d.id).style("fill", "red")

          // clear all metabolite nodes
          d3.selectAll("circle").remove();

          // add nodes and links for connected components
          that.updateData(that.graph_data, d.id, nodes, links);
        }
      });
      
        // simulation.on("tick", tick);

        // Draw curved edges
        function tick() {
          links
            .attr("d", linkArc);
          circles
            .attr("transform", transform);
          text
            .attr("transform", transform);
        }
    
        function linkArc(d) {
    
          var dx = d.target.x - d.source.x;
          var dy = d.target.y - d.source.y;
    
          return (
            "M" +
            (d.source.x - 30) +
            "," +
            (d.source.y - 33) +
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
          // if (d3.event.subject.type === "metabolite") {
          //   if (!d3.event.active) simulation.alphaTarget(0.3).restart();
          //   d3.event.subject.fx = d3.event.subject.x;
          //   d3.event.subject.fy = d3.event.subject.y;
          // }
        }
    
        function dragged(d) {
          // if (d3.event.subject.type === "metabolite") {
          //   d3.event.subject.fx = d3.event.x;
          //   d3.event.subject.fy = d3.event.y;
          // }
          if(d.type === "protein" || d.type === "other_protein"){
            d3.select("#"+d.id)
              .attr("transform", "translate("+ (d3.event.x+32) + "," + (d3.event.y+32)+")");
              d.links.forEach(l=>{
                d3.select("#"+l).attr("x1", (d3.event.x)).attr("y1", (d3.event.y))
              })
          } else if(d.type === "metabolite"){
            d3.select("#"+d.id)
              .attr("transform", "translate("+ (d3.event.x) + "," + (d3.event.y+32)+")");
              d.links.forEach(l=>{
                d3.select("#"+l).attr("x2", (d3.event.x)).attr("y2", (d3.event.y))
              })
          }
          
        }
    
        function dragended(d) {
          // if (d3.event.subject.type === "metabolite") {
          //   if (!d3.event.active)
          //     simulation
          //       .alphaTarget(0.05)
          //       .alphaMin(0.06)
          //       .velocityDecay(0.7);
          //   d3.event.subject.fx = null;
          //   d3.event.subject.fy = null;
          // }
          if(d.type === "protein" || d.type === "other_protein"){
            d3.select("#"+d.id)
              .attr("transform", d => "translate("+ (d3.event.x+32) + "," + (d3.event.y+32)+")")
            d.links.forEach(l=>{
              d3.select("#"+l).attr("x1", (d3.event.x)).attr("y1", (d3.event.y))
            })
            d.xcoord = xScale.invert(d3.event.x+32);
            d.ycoord = yScale.invert(d3.event.y+32);
            
          } else if(d.type === "metabolite"){
            d3.select("#"+d.id)
              .attr("transform", d => "translate("+ (d3.event.x) + "," + (d3.event.y+32)+")")
            d.links.forEach(l=>{
              d3.select("#"+l).attr("x2", (d3.event.x)).attr("y2", (d3.event.y))
            })
            d.xcoord = xScale.invert(d3.event.x);
            d.ycoord = yScale.invert(d3.event.y+32);
          }
          
        }

    

  }
  get_coords(protein_xcoord, protein_ycoord, protein){
    let yMax = Math.max(...this.initData.nodes.map(d=>d.ycoord));
    let x = protein_xcoord + 0.1;
    let y = protein_ycoord + 0.3*this.clicked_nodes[protein];
    // let y_val = 0.3*this.clicked_nodes[protein]
    if (y > yMax) {
      console.log(parseInt(y / yMax))
      x += 0.1*parseInt(y / yMax)*3;
      y = protein_ycoord + 0.3 * (y % yMax)*3;
    }

    return {"x":x, "y":y};
  }
}

//Use hulls for complexes
// Add metabolite node info if doesn't exist
/*
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
*/
