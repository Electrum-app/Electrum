
var xmlns = "http://www.w3.org/2000/xmlns/";
var xlinkns = "http://www.w3.org/1999/xlink";
var svgns = "http://www.w3.org/2000/svg";
_this_svg.setAttributeNS(xmlns, "xmlns", svgns);
_this_svg.setAttributeNS(xmlns, "xmlns:xlink", xlinkns);

var text1 = '';
$.ajax({
  type: "GET",
  url: "./css/visualize.css",
  async: false,
  success : function(response) {
    text1 = response;
  }
});
text1 = text1.split('*/')[1];

var text2 = '';
$.ajax({
  type: "GET",
  url: "./css/style.css",
  async: false,
  success : function(response) {
    text2 = response;
  }
});
text2 = text2.split('*/')[1];

var text = text1 + text2;

var _Serializer = new XMLSerializer();
svg_output = _Serializer.serializeToString(_this_svg);
var svg_split = svg_output.split("<defs><marker");
svg_string = svg_split[0] + "<defs><style>" + text + "</style><marker" + svg_split[1];
