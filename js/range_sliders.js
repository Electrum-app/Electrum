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

// Initialize lines with slider defaults
var default_q1 = 0.05;
var default_q2 = 0.05;
var default_fc2 = 0;
var _abs_max = 5;
var toggle_scaling = false;
var line1d_selector = "line-1D";
var line2d_selector = "line-2D";
var _cmap = drawColormap(_abs_max, "coolwarm")

initLine1();
initLine2();

function initLine1() {
  toggle_scaling = false;
  d3.select("div#" + line1d_selector)
    .style("height", 10)
    .style("background", draw_color_slider(default_q1, _abs_max, _cmap))
}

function initLine2() {
  toggle_scaling = true;
  d3.select("div#" + line2d_selector)
    .style("margin-bottom", 25)
    .style("height", 10)
    .style("background", draw_color_slider(default_fc2, _abs_max, _cmap))
}

function updateSliderQ1(value) {
  toggle_scaling = false;
  d3.select("div#" + line1d_selector)
    .style("height", 10)
    .style("background", draw_color_slider(value, _abs_max, _cmap))
}

function updateSliderQ2(value) {
  toggle_scaling = true;
  console.log(value)
  d3.select("div#" + line2d_selector)
    .style("margin-bottom", (25 - (value * 10)))
    .style("height", (10 + (value * 10)))
}

function updateSliderFC2(value) {
  toggle_scaling = true;
  d3.select("div#" + line2d_selector)
    .style("background", draw_color_slider(value, _abs_max, _cmap))
}


function draw_color_slider(d, abs_max, cmap) {
  let _val;
  if (toggle_scaling === true) {
    _val = parseFloat(d);
  } else {
    _val = (parseFloat(d) * abs_max);
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
  return cmap[_val.toFixed(1)];
}
