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

var _hmdb_url = "https://hmdb.ca/metabolites/";
var _uniprot_url = "https://www.uniprot.org/uniprot/";
var _reactome_url = "https://reactome.org/content/detail/";

function set_selection(data, selection) {
  // get nodes, links, coordinates for pathway or protein selection
  if (selection in data.pathway_dictionary) {
    let _selector_ids = data.pathway_dictionary[selection];
    let _intra_ids = data.components_dictionary[selection];

    let _metabolite_ids = [];
    if (show_intra_pathway === true) {
      _metabolite_ids = _metabolite_ids.concat(_intra_ids);
    }
    if (show_inter_pathway === true) {
      let _inter_ids = data.metabolites.filter(e => !(_intra_ids.includes(e)));
      _metabolite_ids = _metabolite_ids.concat(_inter_ids);
    }
    // finish this
    //if (show_intra_pathway === true && show_inter_pathway === false) {
    //
    //}

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
    if (show_intra_pathway === true && show_inter_pathway === false) {
      coordinates = data.pathway_dictionary_i[selection];
    } else {
      coordinates = data.pathway_dictionary[selection];
    }
    _distances = 2250;
  } else if (data.proteins.includes(selection)) {
    _links = data.links.filter(link => link.source.id === selection)

    console.log(_links)

    // get the nodes with the links
    let _metabolites = [];
    for (let _m in _links) {
      _metabolites.push(_links[_m].target.id)
    }
    _nodes = data.nodes.filter(node => node.id === selection || _metabolites.includes(node.id))

    console.log(_nodes)

    coordinates = {};
    coordinates[selection] = [0, 2500, 1];
    _distances = 850;
  } else {
    console.log("Did not select a protein or pathway")
    return
  }

  //console.log(_nodes)
  //console.log(_links)

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
      .id(d => d.id)
      .distance(_distances)
      .strength(1))
    .force("collide", d3.forceCollide().radius(d => d.r * 500).iterations(2))
    .force("charge", d3.forceManyBody().strength(-350))
    .force("center", d3.forceCenter(_width / 0.9, _height / _height_center))
    .alphaDecay(0.007)
    .velocityDecay(0.7);
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
        svg_viewer.attr("transform", d3.event.transform);
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
      return d;
    })
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 15.7)
    .attr("refY", -0.18)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M0, -5L10, 0L0, 5");
}

function make_edges(svg_viewer, div_edge, data, _links) {
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
        .style("opacity", 1);
    });
  return link;
}

function draw_color(d, abs_max, cmap) {

  console.log(d)

  let _val;
  if (d.metadata.type === "core") {
    if (toggle_scaling === true) {
      _val = parseFloat(d.metadata.corrected_fold_change).toFixed(1);
    } else {
      _val = (parseFloat(d.metadata.q_value_percentile) * abs_max).toFixed(1);
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
    return cmap[_val];
  }
}

function draw_background(svg_viewer, data, selection) {
  if (selection in data.background_dictionary) {
    let _backgrounds = data.background_dictionary[selection];
    let _url;
    let _height;
    let _y_pos;
    if (show_intra_pathway === true && show_inter_pathway === false) {
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
      .attr('xlink:href', _url)
      .attr("height", _height)
      .attr("x", _backgrounds.x_pos)
      .attr("y", _y_pos);
  }
}

function init_nodes(
  svg_viewer, data, link, _nodes, selection,
  coordinates, current_protein, current_metabolite,
  timer, prevent) {

  var node = svg_viewer
    .selectAll(".node")
    .data(_nodes)
    .enter()
    .append("g")
    .attr("class", "node")
    .attr("id", function(d) {
      return d.id
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
    .on("click", function(d) {
      timer = setTimeout(function() {
        if (!prevent) {
          if (d.type === "protein") {
            current_protein = d.id;
            // hide all links and metabolite nodes
            hide_nodes(node)
            hide_links(link)
            // get all interacting links and nodes
            let these_metabolites = show_links(link, current_protein);
            show_nodes(node, these_metabolites)
          } else if (d.type === "metabolite") {
            current_metabolite = d.id;
            display_metabolite_metadata(d, data);
          }

          // reset protein shading
          reset_proteins(_nodes, current_protein);
        }
        prevent = false;
      }, delay);
    })

  node.each(function(d) {
    if (show_intra_pathway === true &&
      show_inter_pathway === false &&
      selection in data.pathway_dictionary) {
      d.fx = coordinates[d.id][0] + 1005;
      d.fy = coordinates[d.id][1] - 960;
    } else if (d.type === "protein" ||
      d.type === "other_protein") {
      d.fx = coordinates[d.id][0] + 1005;
      d.fy = coordinates[d.id][1] - 960;
    }
  });

  return [node, current_protein, current_metabolite];
}

function make_nodes(data, node, current_protein, div_protein) {

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
      return d.id
    })
    .style("fill", function(d) {
      if (d.type === "protein") {
        return "orange"
      } else if (d.type === "other_protein") {
        return "grey"
      } else if (d.isomers !== "") {
        return "lightgrey"
      }
    })

  circle
    .on("mouseover", function(d) {
      if (d.type === "protein") {
        d3.select(this).style("fill", "red");
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
      link
        .filter(function(e) {
          return e;
        })
        .style("--link_color", function(e) {
          return draw_color(e, data.abs_max, data.cmap)
        })
        .style("opacity", 1);
    });
  return circle;
}

function make_text(node, coordinates) {
  var text = node
    .append("text")
    .raise()
    .html(function(d) {
      if (d.type === "protein" || d.type === "other_protein" || (show_intra_pathway === true && show_inter_pathway === false)) {
        if (coordinates[d.id][2] === 1) {
          return (
            "<tspan dx='46' y='.31em' style='font-size: 64px; font-weight: bold;'>" +
            d.display_name.split("_")[0] +
            "</tspan>"
          );
        } else {
          return (
            "<tspan dx='-46' y='.31em' style='font-size: 64px; font-weight: bold; text-anchor: end;'>" +
            d.display_name.split("_")[0] +
            "</tspan>"
          );
        }
      } else {
        if (show_labels === true) {
          return (
            "<tspan dx='32' y='.31em' style='font-size: 46px; font-weight: bold;'>" +
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
      d3.select("rect#" + _nodes[n].id).style("fill", "red");
    } else if (current_protein !== _nodes[n].id && "protein" === _nodes[n].type) {
      d3.select("rect#" + _nodes[n].id).style("fill", "orange");
    } else if (current_protein !== _nodes[n].id && "other_protein" === _nodes[n].type) {
      d3.select("rect#" + _nodes[n].id).style("fill", "grey");
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
  var dr = Math.sqrt(dx * dx + dy * dy) * 0.75;
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
