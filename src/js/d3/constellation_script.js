import * as d3 from "d3";

export default function drawConstellations(locations) {
  var width = 960,
    height = 500,
    radius = Math.min(width, height) / 2 - 30;

  var xScale = d3
    .scaleLinear()
    .domain([-1, 1])
    .range([-width / 2, width / 2]);

  var yScale = d3
    .scaleLinear()
    .domain([-1, 1])
    .range([-height / 2, height / 2]);

  var r = d3
    .scaleLinear()
    .domain([0, 2])
    .range([0, radius]);

  var svg = d3
    .select("d3Body")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 1.2 + ")");

  let modalityArray = [];

  function generateModalityArray(locations) {
    var initialArray = Object.keys(locations);
    var interval = 180 / (initialArray.length - 1);
    initialArray.map((entry, index) => {
      let capitalizedEntry = entry.charAt(0).toUpperCase() + entry.slice(1);
      let degree = index * interval + 180;
      modalityArray.push([capitalizedEntry, degree]);
    });
  }

  function degreesToRadians(degrees) {
    var pi = Math.PI;
    return degrees * (pi / 180);
  }

  generateModalityArray(locations);

  console.log("modalityArray: ", modalityArray);

  var circle = d3
    .select("g")
    .append("circle")
    .attr("fill", "url(#svgGradient)")
    .attr("r", 400);

  var defs = svg.append("defs");

  var gradient = defs
    .append("linearGradient")
    .attr("id", "svgGradient")
    .attr("x1", "0%")
    .attr("x2", "100%")
    .attr("y1", "0%")
    .attr("y2", "100%");

  gradient
    .append("stop")
    .attr("class", "start")
    .attr("offset", "0%")
    .attr("stop-color", "purple")
    .attr("stop-opacity", 1);

  gradient
    .append("stop")
    .attr("class", "end")
    .attr("offset", "100%")
    .attr("stop-color", "blue")
    .attr("stop-opacity", 1);

  var text = d3
    .select("g")
    .selectAll("text")
    .data(modalityArray)
    .enter()
    .append("text");

  var textLabels = text
    .attr("x", function(d) {
      return xScale(0.6 * Math.cos(degreesToRadians(d[1])) - 0.1);
    })
    .attr("y", function(d) {
      return yScale(1.1 * Math.sin(degreesToRadians(d[1])));
    })
    .text(function(d) {
      return `${d[0]}`;
    })
    .attr("font-family", "serif")
    .attr("font-size", "20px")
    .attr("fill", "yellow");
}
