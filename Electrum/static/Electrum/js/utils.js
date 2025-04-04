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

const _hmdb_url = "https://hmdb.ca/metabolites/";
const _uniprot_url = "https://www.uniprot.org/uniprot/";
const _reactome_url = "https://reactome.org/content/detail/";
const SPINNER_TARGET = "svg_viewer_id";

// Spinner.js settings 
const opts = { // Spinner opts from http://spin.js.org/
  lines: 10, // The number of lines to draw
  length: 19, // The length of each line
  width: 5, // The line thickness
  radius: 14, // The radius of the inner circle
  scale: 1, // Scales overall size of the spinner
  corners: 1, // Corner roundness (0..1)
  speed: 1, // Rounds per second
  rotate: 0, // The rotation offset
  animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#454545', // CSS color or array of colors
  fadeColor: 'transparent', // CSS color or array of colors
  top: '50%', // Top position relative to parent
  left: '50%', // Left position relative to parent
  shadow: '0 0 1px transparent', // Box-shadow for the lines
  zIndex: 2000000000, // The z-index (defaults to 2e9)
  className: 'spinner', // The CSS class to assign to the spinner
  position: 'relative', // Element positioning
};


function set_selection(data, selection) {

  // get nodes, links, coordinates for pathway or protein selection
  if (selection.includes("All proteins")) {
    _links = data.links;
    _nodes = data.nodes;
    coordinates = {};
    _distances = 3000;
  } else if (selection in data.pathway_dictionary) {
    let _selector_ids = data.pathway_dictionary[selection];
    let _intra_ids = data.components_dictionary[selection];

    let _metabolite_ids = [];
    if (show_intra_pathway === true) {
      _metabolite_ids = _metabolite_ids.concat(_intra_ids);
    } else {
      _metabolite_ids = data.metabolites.filter(e => e);
    }

    let _all_ids = Object.keys(_selector_ids).concat(_metabolite_ids)

    _links = data.links
      .filter(link => link.source.id in _selector_ids)
      .filter(link => _metabolite_ids.includes(link.target.id))

    let _metabolites = [];
    for (let _m in _links) {
      if (_all_ids.includes(_links[_m].target.id)) {
        _metabolites.push(_links[_m].target.id)
      }
    }
    _nodes = data.nodes
      .filter(function(node) {
        return node.id in _selector_ids || _metabolites.includes(node.id);
      })
    if (show_intra_pathway === true) {
      coordinates = data.pathway_dictionary_i[selection];
    } else {
      coordinates = data.pathway_dictionary[selection];
    }
    _distances = 3000;
  } else if (data.proteins.includes(selection)) {
    _links = data.links.filter(link => link.source.id === selection)
    // get the nodes with the links
    let _metabolites = [];
    for (let _m in _links) {
      _metabolites.push(_links[_m].target.id)
    }
    _nodes = data.nodes.filter(node => node.id === selection || _metabolites.includes(node.id))
    coordinates = {};
    coordinates[selection] = [0, 2500, 1];
    _distances = 1500;
  } else {
    console.log("Did not select a protein or pathway")
    return
  }

  return [
    _links,
    _nodes,
    _distances,
    coordinates
  ];
}

function init_simulation(
  _nodes, _links, _distances,
  _width, _height, _height_center) {
  let _sim = d3
    .forceSimulation(_nodes)
    .force("link", d3.forceLink(_links)
      .id(d => parsed_string(d.id))
      .distance(_distances)
      .strength(1))
    //.force("collide", d3.forceCollide().radius(d => d.r * 500).iterations(2))
    //.force("charge", d3.forceManyBody().strength(-350))
    //.force("center", d3.forceCenter(_width / 0.9, _height / _height_center))
    //.alphaDecay(0.007)
    //.velocityDecay(0.7);
  return _sim;
}

function init_canvas(selector, _width, _height) {

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
        svg_viewer
          .transition()
            .duration(500)
          .attr("transform", d3.event.transform);
      })
    )
    .on("dblclick.zoom", null)
    .append("g")
    .attr("transform", "translate(" + _width_factor + "," + _height_factor + ") scale(" + _scale_factor + "," + _scale_factor + ")");

  return svg_viewer;
}

function sort_links(links) {
  return links.sort(function(a, b) {
    return b.metadata.q_value - a.metadata.q_value;
  });
}

function sort_nodes(nodes, radial_order) {
  let mod_nodes;
  mod_nodes = nodes.filter(n => n.type !== "metabolite")
  for (let r in radial_order) {
    for (let m in nodes) {
      if (radial_order[r] === nodes[m].id) {
        mod_nodes.push(nodes[m])
      }
    }
  }
  for (let m in nodes) {
    if (!(radial_order.includes(nodes[m].id)) && nodes[m].type === "metabolite") {
      mod_nodes.push(nodes[m])
    }
  }
  return mod_nodes
}

function init_edges(svg_viewer) {
  svg_viewer
    .append("defs")
    .selectAll("marker")
    .data([
      "core",
      "protein",
      "metabolite",
    ])
    .enter()
    .append("marker")
    .attr("id", function(d) {
      return parsed_string(d);
    })
    .append("path");
}

function make_edges(svg_viewer, div_edge, data, _links, selection) {
  var link = svg_viewer
    .append("g")
    .selectAll("path")
    .data(_links)
    .enter()
    .append("path")
    .attr("id", function(d) {
      return parsed_string(d.source.id) + "\," + parsed_string(d.target.id)
    })
    .attr("class", function(d) {
      return "link";
    })
    .attr("stroke-width", function(d) {
      if (d.metadata.type === "core" && toggle_scaling === true) {
        return ((-1 * Math.log(d.metadata.q_value)) / 18) + 10;
      } else {
        return 10;
      }
    })
    .style("--link_color", function(d) {
      return draw_color(d, data.abs_max, data.cmap)
    })
    .on("mouseover", function(d) {
      // show label tooltip
      if (d.metadata.type === "core") {
        let _target = d.source.id;
        let _metabolite = d.target.display_name;
        let _fold_change = parseFloat(d.metadata.corrected_fold_change).toFixed(2);
        let _q_value = parseFloat(d.metadata.q_value).toExponential(2);
        let _display_string = ("" +
          "<b>Protein:</b> " + _target + "<br>" +
          "<b>Metabolite:</b> " + _metabolite + "<br>" +
          "<b>log<sub>2</sub>(Fold Change):</b> " + _fold_change + "<br>" +
          "<b>q-value:</b> " + _q_value
        )
        div_edge.transition()
          .duration(100)
          .style("opacity", .9);
        div_edge
          .html(_display_string)
          .style("left", (d3.event.pageX + 10) + "px")
          .style("top", (d3.event.pageY - 5) + "px");
      }
      link
        .filter(function(e) {
          return e;
        })
        .style("--link_color", function(e) {
          if (e === d) {
            highlight_interacting_proteins(d, e);
            return draw_color(e, data.abs_max, data.cmap)
          } else {
            return draw_color(e, data.abs_max, data.cmap_greys)
          }
        })
        .style("opacity", function(e) {
          if (e === d) {
            return 1;
          } else {
            return 0.1;
          }
        });
    })
    .on("mouseout", function(d) {
      node.each(function(n) {
        if (n.id === current_protein) {
          d3.select("rect#" + parsed_string(n.id)).style("fill", "red");
        } else if (n.type === "other_protein") {
          d3.select("rect#" + parsed_string(n.id)).style("fill", "grey");
        } else if (n.type === "protein") {
          d3.select("rect#" + parsed_string(n.id)).style("fill", "orange");
        }
      })
      // remove label tooltip
      if (d.metadata.type === "core") {
        div_edge.transition()
          .duration(500)
          .style("opacity", 0);
      }
      link
        .filter(function(e) {
          return e;
        })
        .style("--link_color", function(e) {
          return draw_color(e, data.abs_max, data.cmap)
        })
        .style("opacity", function(o) {
          if (show_intra_pathway === true
          && selection in data.pathway_dictionary) {
            return 1
          } else if (!(selection in data.pathway_dictionary)) {
            return 1
          } else {
            return 0.2
          }
        });
    });
  return link;
}

function draw_color(d, abs_max, cmap) {

  let _val;
  if (d.metadata.type === "core") {
    if (toggle_scaling === true) {
      _val = parseFloat(d.metadata.corrected_fold_change);
    } else {
      _val = (parseFloat(d.metadata.q_value_percentile) * abs_max);
    }

    let _mod_val = 1;
    if (Math.abs(_val) >= abs_max) {
      _mod_val = 0;
    }
    if (_val >= 0) {
      _val = parseFloat(_val) + _mod_val;
    } else {
      _val = parseFloat(_val) - _mod_val;
    }

    if (_val >= abs_max) {
      _val = abs_max;
    } else if (_val <= -abs_max) {
      _val = -abs_max;
    }

    if (use_absolute_values === true) {
      _val = Math.abs(_val);
    }
    return cmap[_val.toFixed(1)];
  }
}

function draw_background(svg_viewer, data, selection) {
  if (selection in data.background_dictionary) {
    let _backgrounds = data.background_dictionary[selection];
    let _url;
    let _height;
    let _y_pos;
    if (show_intra_pathway === true) {
      _url = _backgrounds.url_intra;
      _height = _backgrounds.height_intra;
      _y_pos = _backgrounds.y_pos_intra;
    } else {
      _url = _backgrounds.url;
      _height = _backgrounds.height;
      _y_pos = _backgrounds.y_pos;
    }
    svg_viewer
      .append('svg:image')
      .attr('id', 'background_image')
      .attr('xlink:href', _url)
      .attr("height", _height)
      .attr("x", _backgrounds.x_pos)
      .attr("y", _y_pos);
  }
}

function init_nodes(
  svg_viewer, database, link, _nodes, _links, selection,
  coordinates, current_protein, current_metabolite,
  distance, timer, prevent) {
  
  const target = document.getElementById(SPINNER_TARGET)
  const spinner = new Spinner(opts);

  var node = svg_viewer
    .selectAll(".node")
    .data(_nodes)
    .enter()
    .append("g")
    .attr("class", "node")
    .attr("id", function(d) {
      return parsed_string(d.id)
    })

  node
    .on("dblclick", function(d) {
      clearTimeout(timer);
      prevent = true;
      if (d.type === "metabolite") {
        window.open(_hmdb_url + d.hmdb_id, '_blank');
      } else if (d.type === "protein") {
        window.open(_uniprot_url + d.uniprot_id, '_blank');
      }
    })
    .on("mousedown", function() {
      if (d3.event.button === 0) { 
        spinner.spin(target) };
    })
    .on("click", function(d) {
      timer = setTimeout(function() {
        if (!prevent) {
          if (d.type === "protein") {
            console.log("Substructure enrichment results for: " + d.id)
            current_protein = d.id;
            display_substructure_results(d, database);
          } else if (d.type === "metabolite") {
            current_metabolite = d.id;
            display_metabolite_metadata(d, database);
          }

          // reset protein shading
          reset_proteins(_nodes, current_protein);
        }
        spinner.stop();
        prevent = false;
      }, delay);
      
    })

  let node_counter = 0;
  let node_array_len = node._groups[0]
    .filter(function(n) {
      if (n.__data__.type === "metabolite") {
        return n;
      }
    }).length + 1
  
  let node_counter_proteins = 0;
  let node_array_len_proteins = node._groups[0]
    .filter(function(n) {
      if (n.__data__.type === "protein" ||
          n.__data__.type === "other_protein") {
        return n;
      }
    }).length + 1

  // Refresh nodes
  node.each(function(d) {
    if (show_intra_pathway === true &&
      selection in database.pathway_dictionary) {
      d.fx = coordinates[d.id][0] + 1005;
      d.fy = coordinates[d.id][1] - 960;
    } else if ((d.type === "protein" ||
        d.type === "other_protein") && 
        selection.includes("All proteins")) {
      let new_coordinates = circleCoord(node_counter_proteins, node_array_len_proteins, 1250);
      coordinates[d.id + "-all"] = new_coordinates;
      d.fx = undefined;
      d.fy = undefined;
      d.fx = new_coordinates[0] + 950;
      d.fy = new_coordinates[1] + 1600;
      d.radians = (new_coordinates[2] * Math.PI / 180);
      d.degrees = new_coordinates[2];
      node_counter_proteins += 1;
    } else if (d.type === "protein" ||
        d.type === "other_protein") {
      d.fx = coordinates[d.id][0] + 1005;
      d.fy = coordinates[d.id][1] - 960;
    } else {
      let new_positions = circleCoord(node_counter, node_array_len, distance);
      d.fx = undefined;
      d.fy = undefined;
      d.fx = new_positions[0] + 950;
      d.fy = new_positions[1] + 1600;
      d.radians = (new_positions[2] * Math.PI / 180);
      d.degrees = new_positions[2];
      node_counter += 1;
    }

  });

  return [node, current_protein, current_metabolite];
}

function circleCoord(index, num_nodes, radius) {
  let deg = (((index) / (num_nodes - 1)) * 360) -90;
  let x = radius * Math.cos((deg * Math.PI / 180));
  let y = radius * Math.sin((deg * Math.PI / 180));

  return [x, y, deg];
}

function make_nodes(data, node, current_protein, div_protein, selection) {

  var circle = node
    .append(function(d) {
      if (d.type === "protein" || d.type === "other_protein") {
        return document.createElementNS(
          "http://www.w3.org/2000/svg", "rect");
      } else if (d.type === "reaction") {
        return document.createElementNS(
          "http://www.w3.org/2000/svg", "rect");
      } else {
        return document.createElementNS(
          "http://www.w3.org/2000/svg", "circle");
      }
    })
    .attr("id", function(d) {
      return parsed_string(d.id)
    })
    .style("fill", function(d) {
      if (d.type === "protein") {
        return "orange"
      } else if (d.type === "other_protein") {
        return "grey"
      } else if (d.isomers !== "") {
        return "lightgrey"
      } else if (d.type === "added_metabolite") {
        return "white"
      }
    })

  circle
    .on("mouseover", function(d) {
      if (d.type === "protein") {
        d3.select(this).style("fill", "red");

        link
          .filter(function(e) {
            return e;
          })
          .style("--link_color", function(e) {
            if (e.source.id === d.id || e.target.id === d.id) {
              return draw_color(e, data.abs_max, data.cmap)
            } else {
              return draw_color(e, data.abs_max, data.cmap_greys)
            }
          })
          .style("opacity", function(e) {
            if (e.source.id === d.id || e.target.id === d.id) {
              return 1;
            } else {
              return 0.1;
            }
          });


        /*
        let _display_string = "<b>Metabolite Structure Results:</b><br>...";
        // Pop up metabolite analysis side-panel for these metabolites
        div_protein.transition()
          .duration(100)
          .style("opacity", .9);
        div_protein
          .html(_display_string)
            .style("left", (d3.event.pageX + 10) + "px")
            .style("top", (d3.event.pageY - 5) + "px");
        */
      } else if (d.type === "metabolite") {
        let _display_string = "";
        _display_string += "<b>Name:</b> " + d.display_name + "<br>";
        if (d.isomers !== "") {
          _display_string += "<b>Isomeric to:</b> " + d.isomers + "<br>";
        }
        _display_string += "<b>HMDB ID:</b> " + d.hmdb_id + "<br>";
        div_protein.transition()
          .duration(100)
          .style("opacity", .9);
        div_protein
          .html(_display_string)
          .style("left", (d3.event.pageX + 10) + "px")
          .style("top", (d3.event.pageY - 5) + "px");

        // Highlight all its edges
        link
          .filter(function(e) {
            return e;
          })
          .style("--link_color", function(e) {
            if (e.source.id === d.id || e.target.id === d.id) {
              highlight_interacting_proteins(d, e);
              return draw_color(e, data.abs_max, data.cmap)
            } else {
              return draw_color(e, data.abs_max, data.cmap_greys)
            }
          })
          .style("opacity", function(e) {
            if (e.source.id === d.id || e.target.id === d.id) {
              return 1;
            } else {
              return 0.1;
            }
          });
      }
    })
    .on("mouseout", function(d) {
      node.each(function(n) {
        if (n.id === current_protein) {
          d3.select("rect#" + parsed_string(n.id)).style("fill", "red");
        } else if (n.type === "other_protein") {
          d3.select("rect#" + parsed_string(n.id)).style("fill", "grey");
        } else if (n.type === "protein") {
          d3.select("rect#" + parsed_string(n.id)).style("fill", "orange");
        }
      })

      div_protein.transition()
        .duration(500)
        .style("opacity", 0);
      link
        .filter(function(e) {
          return e;
        })
        .style("--link_color", function(e) {
          return draw_color(e, data.abs_max, data.cmap)
        })
        .style("opacity", function(o) {
          if (show_intra_pathway === true
          && selection in data.pathway_dictionary) {
            return 1
          } else if (!(selection in data.pathway_dictionary)) {
            return 1
          } else {
            return 0.2
          }
        });
    });
  return circle;
}

function make_text(node, coordinates, selection, data) {
  var text = node
    .append("text")
    .attr("id", function(d) {
      return parsed_string(d.id)
    })
    .html(function(d) {
      if (d.type === "protein" || d.type === "other_protein" || (show_intra_pathway === true &&
        selection in data.pathway_dictionary)) {
        if (show_intra_pathway === true
            && selection in data.pathway_dictionary
            && !selection.includes("All proteins")
            && d.isomers !== "") {
          return handle_intra_isomers(d, selection);
        } else {
          return handle_metabolite_side(d, selection);
        }
      } else {
        if (show_labels === true) {
          return (
            "<tspan id='" + parsed_string(d.id) + "' style='font-size: 46px; font-weight: bold;'>" +
            d.display_name +
            "</tspan>"
          );
        }
      }
    });

  return text;
}

function hide_nodes(node) {
  node
    .filter(function(d) {
      if (d.type !== "protein" && d.type !== "other_protein") {
        return d;
      }
    })
    .style("visibility", "hidden")
    .style("opacity", 1);
}

function show_nodes(node, get_metabolites) {
  node
    .filter(function(n) {
      if (n.type === "metabolite" && get_metabolites.includes(n.id)) {
        return n;
      }
    })
    .style("visibility", "visible")
    .style("opacity", 1);
}

function hide_links(link) {
  link
    .filter(function(d) {
      return d;
    })
    .style("visibility", "hidden")
    .style("opacity", 1);
}

function show_links(link, this_id) {
  let get_metabolites = [];
  link
    .filter(function(l) {
      if (l.source.id === this_id) {
        get_metabolites.push(l.target.id)
        return l;
      }
    })
    .style("visibility", "visible")
    .style("opacity", 1);
  link
    .filter(function(ll) {
      if (get_metabolites.includes(ll.target.id)) {
        return ll;
      }
    })
    .style("visibility", "visible")
    .style("opacity", 1);
  return get_metabolites;
}

function postData(input) {
  $.ajax({
      type: "POST",
      url: input,
      datatype: "json",
      success: function (response) {
        // do something with the response
        alert("111")
        console.log("hello")
        console.log(response);
      },
      error: function(xhr, status, error) {
        console.log(error)
        console.log(xhr)
        console.log(status)
      }
  });
}


function getCookie(c_name) {
  // Source: https://stackoverflow.com/a/6533544 (CC BY-SA 4.0)
  if (document.cookie.length > 0)
  {
    c_start = document.cookie.indexOf(c_name + "=");
    if (c_start != -1)
    {
      c_start = c_start + c_name.length + 1;
      c_end = document.cookie.indexOf(";", c_start);
      if (c_end == -1) c_end = document.cookie.length;
      return unescape(document.cookie.substring(c_start,c_end));
    }
  }
  return "";
}

function display_substructure_results(this_protein, this_data) {

  /* 
    Add sub-structure pop-out here 
    Use modal elements for display space
    If it takes a bit, use spinner
  */
  let d = this_protein;

  let modal_title = document.getElementById('modal-title');
  modal_title.innerHTML = '<h3>Metabolite Substructure Enrichment Results</h3>';

  let modal_body = document.getElementById('modal-fill');
  modal_body.innerHTML = '<br><br><br><br>';
  modal_body.innerHTML += '<b>Selected Protein: ';
  modal_body.innerHTML += '<span class="metabolite-name"><i>';
  modal_body.innerHTML += d.display_name;
  modal_body.innerHTML += '</i></span></b><br>';

  let formData = new FormData();
  formData.append('this_data', '>>>this_data<<<');
  formData.append('protein', d.display_name);
  formData.append('threshold', q_threshold);

  console.log(this_data)
  formData.append('file', this_data.dataURL, this_data.dataURL.name);

  // Run substructure
  $.ajax({
    headers: { "X-CSRFToken": getCookie("csrftoken") },
    url: 'ajax/run_substructure/',
    data: formData,
    cache: false,
    contentType: 'multipart/form-data; charset=utf-8; boundary="random_boundary_key"',
    processData: false,
    type: 'POST',
    success: function (d) {
      // Parse results that pass the q-value threshold
      let results = {};
      for (let ID in d["CHEMONTID"]) {
        //let criteria = "FDR";
        let criteria = "P_value";
        if (d[criteria][ID] < q_threshold) {
          results[ID] = {
            ID: ID,
            NAME: d["Term"][ID],
            FOLDCHANGE: d["Fold_change"][ID],
            PVALUE: d["P_value"][ID],
            FDR: d["FDR"][ID]
          }
        }
      }

      // Sort output
      var sorted_results = [];
      for (let key in results) {
        sorted_results.push([ key, results[key], results[key]["FOLDCHANGE"] ]);
      }
      sorted_results.sort(function compare(kv1, kv2) {
        return kv2[2] - kv1[2];
      })

      // Display results
      var display_table = "<br><table style='width:90%; text-align:left'><tr><th>Substructure</th><th>Fold Change</th><th>p-value</th><th>FDR</th></tr>";

      if (sorted_results.length === 0) {
        display_table +=  "<tr><td>No results to display</td></tr>";
      }

      for (let RESULT in sorted_results) {
        _RESULT = sorted_results[RESULT][1];

        var tr = "<tr>";
        tr += "<td>" + _RESULT["NAME"] + "</td>";
        tr += "<td>" + _RESULT["FOLDCHANGE"].toFixed(2) + "</td>";
        tr += "<td>" + _RESULT["PVALUE"].toExponential(2) + "</td>";
        tr += "<td>" + _RESULT["FDR"].toExponential(2) + "</td>";
        tr += "</tr>";
        display_table += tr;

      }

      modal_body.innerHTML += display_table + "</table><br><br>";
    }
  });



  
  // Print results
  let _items;
  
  // display div
  modal_body.style.height = (_items * 12) + 120;
  modal.style.display = "block";

}

function display_metabolite_metadata(this_metabolite, data) {

  let d = this_metabolite;
  let _data = data.metaboverseData.neighbors_dictionary[d.kegg_id];
  let _pathways = _data.pathways;
  let _reactions = _data.reactions;
  let _reactome = _data.reactome_reactions;
  let _pathway_dictionary = data.metaboverseData.pathway_dictionary;
  let _reaction_database = data.metaboverseData.reaction_database;
  let _reactome_mapper = data.metaboverseData.reactome_mapper;
  let _pathway_names = [];
  let _pathway_dict = {};
  for (let _pathway in _pathways) {
    let _this_pathway = _pathways[_pathway];
    let _this_name = _pathway_dictionary[_this_pathway].name;
    _pathway_names.push(_this_name);
    _pathway_dict[_this_name] = _this_pathway;
  }

  let modal_title = document.getElementById('modal-title');
  modal_title.innerHTML = '<h3>Biological Pathways & Reactions</h3>';

  let modal_body = document.getElementById('modal-fill');
  modal_body.innerHTML = '<br><br><br><br>';
  modal_body.innerHTML += '<b>Selected Metabolite: ';
  modal_body.innerHTML += '<span class="metabolite-name"><i>';
  modal_body.innerHTML += d.display_name;
  modal_body.innerHTML += '</i></span></b><br>';

  // Print pathways
  let _items;
  _pathway_names = _pathway_names.sort();
  for (let _pathway in _pathway_names) {
    let _this_pathway = _pathway_dict[_pathway_names[_pathway]];
    let _this_name = _pathway_dictionary[_this_pathway].name;
    let _this_reactions = _pathway_dictionary[_this_pathway].reactions;
    modal_body.innerHTML += "<br>&emsp;";
    modal_body.innerHTML += "<i><b><a href=\"" + _reactome_url + _this_pathway + "\" target=\"_blank\">" + _this_name + "</a></b></i>";

    let _reaction_names = [];
    let _reaction_dict = {};
    for (let _reaction in _reactions) {
      if (_this_reactions.includes(_reactions[_reaction])) {
        let _this_reaction = _reactions[_reaction];
        let _reaction_name = _reaction_database[_this_reaction].name;
        _reaction_names.push(_reaction_name);
        _reaction_dict[_reaction_name] = _this_reaction;
      }
    }

    // Print reactions within each pathway
    _reaction_names = _reaction_names.sort();
    for (let _reaction in _reaction_names) {
      let _this_reaction = _reaction_dict[_reaction_names[_reaction]];
      let _reaction_name = _reaction_database[_this_reaction].name;
      let _reaction_id = _reaction_database[_this_reaction].reactome;
      modal_body.innerHTML += "<br>&emsp;&emsp;<b>></b>&ensp;";
      modal_body.innerHTML += "<a href=\"" + _reactome_url + _reaction_id + "\" target=\"_blank\">" + _reaction_name + "</a>";
      _items += 1;
    }

    _items += 1;
  }
  modal_body.innerHTML += "<br><br><br>"

  // display div
  modal_body.style.height = (_items * 12) + 120;
  modal.style.display = "block";
}

function reset_proteins(_nodes, current_protein) {
  for (let n in _nodes) {
    if (current_protein === _nodes[n].id) {
      d3.select("rect#" + parsed_string(_nodes[n].id)).style("fill", "red");
    } else if (current_protein !== _nodes[n].id && "protein" === _nodes[n].type) {
      d3.select("rect#" + parsed_string(_nodes[n].id)).style("fill", "orange");
    } else if (current_protein !== _nodes[n].id && "other_protein" === _nodes[n].type) {
      d3.select("rect#" + parsed_string(_nodes[n].id)).style("fill", "grey");
    }
  }
}

function linkFlat(d) {
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

function linkArc(d) {
  var dx = d.target.x - d.source.x;
  var dy = d.target.y - d.source.y;
  var dl = Math.sqrt(dx**2 + dy**2)
  var dr = Math.sqrt(dx * dx + dy * dy) * (2250 / dl);
  return (
    "M" +
    d.source.x +
    "," +
    d.source.y +
    "A" +
    dr +
    "," +
    dr +
    " 0 0,1 " +
    d.target.x +
    "," +
    d.target.y
  );
}

function transform(d) {
  return "translate(" + d.x + "," + d.y + ")";
}

function transform_text(d) {
  if ((d.type !== "metabolite" && show_all_proteins === false)
      || (show_intra_pathway === true
      && selection_in_pathway === true)) {
    return "translate(" + d.x + "," + d.y + ")";
  } else {
    let angle;
    let x_offset;

    let x_mod = "45";
    if (show_all_proteins === true && d.type !== "metabolite") {
      x_mod = "135";
    }

    if (d.degrees >= -90 && d.degrees <= 89) {
      x_offset = d.x;
      y_offset = d.y;
      angle = (d.degrees);
      d3.select("text#" + parsed_string(d.id))
        .attr("text-anchor", "start")
        .attr("dx", x_mod)
        .attr("y", ".35em")
    } else {
      d3.select("text#" + parsed_string(d.id))
        .attr("text-anchor", "end")
        .attr("dx", "-45")
        .attr("y", ".40em")
      x_offset = d.x;
      y_offset = d.y;

      angle = (d.degrees - 180);
    }
    return "translate(" + x_offset + "," + y_offset + ") "
         + "rotate(" + (angle) + ")";
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

function modVar(_var) {
  if (_var === true) {
    _var = false;
  } else {
    _var = true;
  }
  return _var;
}

function highlight_interacting_proteins(d, e) {
  if (e.source.id !== d.id) {
    d3.select("rect#" + parsed_string(e.source.id)).style("fill", "red");
  } else {
    d3.select("rect#" + parsed_string(e.target.id)).style("fill", "red");
  }
}

function handle_intra_isomers(d, selection) {
  if (d.display_name === "Citrate") {
    return (
      "<tspan id='" + parsed_string(d.id) + "' dx='-56px' y='.31em' style='font-size: 64px; font-weight: bold; text-anchor: end;'>Citrate</tspan><tspan dx='200px' y='.31em' style='font-size: 64px; font-weight: bold; text-anchor: end;'>Isocitrate</tspan>"
    );
  } else if (d.display_name === "G3P") {
    return (
      "<tspan id='" + parsed_string(d.id) + "' dx='-56px' y='.31em' style='font-size: 64px; font-weight: bold; text-anchor: end;'>G3P</tspan><tspan dx='160px' y='.31em' style='font-size: 64px; font-weight: bold; text-anchor: end;'>DHAP</tspan>"
    );
  } else if (d.display_name === "F6P") {
    return (
      "<tspan id='" + parsed_string(d.id) + "' dx='-56px' y='.31em' style='font-size: 64px; font-weight: bold; text-anchor: end;'>G6P</tspan><tspan dx='100px' y='.31em' style='font-size: 64px; font-weight: bold; text-anchor: end;'>F6P</tspan>"
    );
  } else {
    return handle_metabolite_side(d, selection);
  }
}

function handle_metabolite_side(d, selection) {

  let this_id = d.id;
  if (selection.includes("All proteins")) {
    this_id = d.id + "-all";
  }

  if (coordinates[this_id][2] === 1) {
    return (
      "<tspan id='" + parsed_string(this_id) + "' x='46px' y='.31em' style='font-size: 64px; font-weight: bold;'>" +
      d.display_name.split("_")[0] +
      "</tspan>"
    );
  } else if (coordinates[this_id][2] === 2) {
    return (
      "<tspan id='" + parsed_string(this_id) + "' x='15px' y='1.5em' style='font-size: 64px; font-weight: bold;'>" +
      d.display_name.split("_")[0] +
      "</tspan>"
    );
  } else {
    if (selection.includes("All proteins") && d.degrees >= -90 && d.degrees <= 89) {
      return (
        "<tspan id='" + parsed_string(this_id) + "' x='-46px' y='.31em' style='font-size: 64px; font-weight: bold; text-anchor: start;'>" +
        d.display_name.split("_")[0] +
        "</tspan>"
      );
    } else {
      return (
        "<tspan id='" + parsed_string(this_id) + "' x='-46px' y='.31em' style='font-size: 64px; font-weight: bold; text-anchor: end;'>" +
        d.display_name.split("_")[0] +
        "</tspan>"
      );
    }
  }
}

function add_intra_nodes(nodes) {
  let add_nodes = [
    "1,3-BPG",
    "2PG",
    "3-PHP",
    "Lactate",
    "Fumarate"
  ];

  for (let n in add_nodes) {
    nodes.push({
      "display_name": add_nodes[n],
      "hmdb_id": "",
      "id": add_nodes[n],
      "isomers": "",
      "kegg_id": "",
      "protein_name": "",
      "type": "added_metabolite",
      "uniprot_id": ""
    })
  }

  return nodes;
}

function parsed_string(s) {
  return "_" + s.replace(/ /g, "_").replace(/\(/g, "").replace(/\)/g, "").replace(/,/g, "").replace(/-/g, "_")
}
