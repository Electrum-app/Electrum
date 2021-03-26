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
const streamSaver = window.streamSaver

$("#upfile1").click(function () {
    $("#saveSVG").trigger('click');
});

function download_png(d) {
  saveSvgAsPng(
    d3.select("#svg_viewer_id")._groups[0][0].cloneNode(true),
    "plot.png", {
      encoderOptions: 1,
      scale: 1,
      encoderType: "image/svg+xml"
    }
  );
}


function holder_function() {
  const xmlns = "http://www.w3.org/2000/xmlns/";
  const xlinkns = "http://www.w3.org/1999/xlink";
  const svgns = "http://www.w3.org/2000/svg";

  var _this_svg = d3.select("#svg_viewer_id")
    .classed('c3', true)
    ._groups[0][0].cloneNode(true);
  _this_svg.setAttributeNS(xmlns, "xmlns", svgns);
  _this_svg.setAttributeNS(xmlns, "xmlns:xlink", xlinkns);

  var text = '';
  $.ajax({
    type: "GET",
    url: "./css/visualize.css",
    async: false,
    success : function(response) {
      text = response;
    }
  });
  text = text.split('*/')[1];

  var _Serializer = new XMLSerializer();
  svg_output = _Serializer.serializeToString(_this_svg);

  // Additional clean-up
  svg_output = svg_output.replace(/--link_color/g, "fill: none; stroke");

}

function download_svg(d) {

  toSVG()


  var svg = document.querySelector('#svg_viewer_id');
  var xml = new XMLSerializer().serializeToString(svg);
  xml = xml.replace(/--link_color/g, "fill: none; stroke");
  console.log(xml)

  var blob = new Blob([xml])
  var fileStream = streamSaver.createWriteStream('plot.svg', {
    size: blob.size
  })
  var readableStream = blob.stream()
  if (window.WritableStream && readableStream.pipeTo) {
    return readableStream.pipeTo(fileStream)
      .then(() => console.log('SVG exported'))
  }
  window.writer = fileStream.getWriter()
  var reader = readableStream.getReader()
  var pump = () => reader.read()
    .then(res => res.done
      ? writer.close()
      : writer.write(res.value).then(pump))

  pump()
}


d3.select("#saveSVGForm").on("change", function() {

  console.log("Hello")

  var _this_svg = d3.select("#svg_viewer_id")._groups[0][0].cloneNode(true);
  var xmlns = "http://www.w3.org/2000/xmlns/";
  var xlinkns = "http://www.w3.org/1999/xlink";
  var svgns = "http://www.w3.org/2000/svg";
  _this_svg.setAttributeNS(xmlns, "xmlns", svgns);
  _this_svg.setAttributeNS(xmlns, "xmlns:xlink", xlinkns);

  var text = fs.readFileSync('./css/visualize.css', {encoding: 'utf-8'});
  text = text.split('*/')[1];

  var _Serializer = new XMLSerializer();
  svg_output = _Serializer.serializeToString(_this_svg);
  var svg_split = svg_output.split("<defs><marker");
  svg_string = svg_split[0] + "<defs><style>" + text + "</style><marker" + svg_split[1];
  filename = dialog
    .showSaveDialog({
      title: "graph",
      defaultPath: ".." + path.sep + ".." + path.sep,
      properties: ["createDirectory"],
      filters: [{
        name: "svg",
        extensions: ["svg"]
      }]
    })
    .then(result => {
      let hasExtension = /\.[^\/\\]+$/.test(result.filePath);
      if (hasExtension === false) {
        result.filePath = `${ result.filePath }.${ "svg" }`;
      }
      filename = result.filePath;
      if (filename === undefined) {
        alert("File selection unsuccessful");
        return;
      }
      fs.writeFileSync(filename, svg_string, 'utf-8');
      console.log(filename);;
    })
    .catch(err => {
      console.log(err);
    });
});
