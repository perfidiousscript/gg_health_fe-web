import * as d3 from "d3";

export default function drawConstellations(locations) {
  var symbolGenerator = d3
    .symbol()
    .type(d3.symbolStar)
    .size(80);

  var points = [
    [0, 80],
    [100, 100],
    [200, 30],
    [300, 50],
    [400, 40],
    [500, 80]
  ];

  var pathData = symbolGenerator();

  d3.select("g")
    .selectAll("path")
    .data(points)
    .enter()
    .append("path")
    .attr("transform", function(d) {
      return "translate(" + d + ")";
    })
    .attr("d", pathData);
}
