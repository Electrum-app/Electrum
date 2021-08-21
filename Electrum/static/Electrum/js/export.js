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
const xmlns = "http://www.w3.org/2000/xmlns/";
const xlinkns = "http://www.w3.org/1999/xlink";
const svgns = "http://www.w3.org/2000/svg";

$("#upfile1").click(function () {
    $("#saveSVG").trigger('click');
});

function download_svg() {


  var svg = document.querySelector('#svg_viewer_id');
  console.log(svg)
  svg = svg.cloneNode(true);

  svg.setAttributeNS(xmlns, "xmlns", svgns);
  svg.setAttributeNS(xmlns, "xmlns:xlink", xlinkns);
  var serializer = new window.XMLSerializer;
  var string = serializer.serializeToString(svg);

  // Fix formattings
  string = string.replace(/--link_color/g, "fill: none; stroke");

  var circle_replace = 'circle fill="#343d46" stroke="black" stroke-width="3px" r="24px" ';
  string = string.replace(/circle\ /g, circle_replace);

  var rect_replace = 'fill="orange" stroke="black" stroke-width="5px" width="70px" height="70px" x="-35" y="-35" border-top-right-radius="25px" ';
  string = string.replace(/style="fill: orange;"/g, rect_replace);

  string = string.replace(/dx="/g, 'x="');
  // End fix formattings

  // Embed background image
  //var background_svg;


  //var embed_search = "</svg>"
  //var replace_search = background_svg + embed_search
  //


  // Remove anything in image tag
      /*
      <image id="background_image" xlink:href="data/img/20201218_MIDAS-CCM_pathway-no-proteins-no-metabolites.svg" height="4800" x="0" y="-850"/>
      */



  //


  var blob = new Blob([string], {type: "image/svg+xml"})

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


document.addEventListener('DOMContentLoaded', function(){
  // Bind from JS, not inline
  document.forms["saveSVGForm"].addEventListener('submit', download_svg);
});