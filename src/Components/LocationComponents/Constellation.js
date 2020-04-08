import React from "react";
import * as d3 from "d3";
// import drawConstellations from "../../js/d3/constellation_script.js";

class Constellation extends React.Component {
  constructor(props) {
    super(props);

    this.state = { locations: this.props.location.state.locations };
  }

  drawConstellations(locations) {
    var width = 1260,
      height = 615,
      radius = Math.min(width, height) * 0.8;

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
      .select("#d3Body")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 1.2 + ")");

    let modalityArray = [];

    function degreesToRadians(degrees) {
      var pi = Math.PI;
      return degrees * (pi / 180);
    }

    function getXYFromTranslate(element) {
      var trans_string = d3
        .select(element)
        .attr("transform")
        .split(" ");
      var x = ~~trans_string[0].split("(")[1].split(",")[0];
      var y = ~~trans_string[1].split(")")[0];
      return [x, y];
    }

    function handleMouseOver(d, i) {
      let positionArray = getXYFromTranslate(this);

      d3.select(this).attr("fill", "orange");

      d3.selectAll("g.layer1")
        .append("text")
        .attr("id", "t" + positionArray[0] + "-" + positionArray[1] + "-" + i)
        .attr("x", positionArray[0] - 30)
        .attr("y", positionArray[1] - 15)
        .attr("font-family", "serif")
        .attr("font-size", "20px")
        .attr("fill", "white")
        .text(function() {
          return `${d["name"]}`; // Value of the text
        });
    }

    function handleMouseOut(d, i) {
      let positionArray = getXYFromTranslate(this);

      svg
        .selectAll("#t" + positionArray[0] + "-" + positionArray[1] + "-" + i)
        .remove();
    }

    function positionRandomizer(parentPosition) {
      var num = Math.floor(Math.random() * 35 + 20) + 1;
      num *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
      return parentPosition + num;
    }

    function generateArray(locations) {
      var initialArray = Object.keys(locations);
      var interval = 180 / (initialArray.length - 1);
      initialArray.map((entry, index) => {
        var modalityObject = locations[entry];
        var degree = index * interval + 180;
        modalityObject["capitalizedEntry"] =
          entry.charAt(0).toUpperCase() + entry.slice(1);
        modalityObject["degree"] = degree;
        modalityObject["xVal"] = 0.5 * Math.cos(degreesToRadians(degree)) - 0.1;
        modalityObject["yVal"] = 1.1 * Math.sin(degreesToRadians(degree));
        modalityArray.push(modalityObject);
      });
    }

    generateArray(locations);

    var circle = d3
      .select("g")
      .append("circle")
      .attr("fill", "url(#svgGradient)")
      .attr("r", radius);

    var defs = svg.append("defs");

    var symbolGenerator = d3
      .symbol()
      .type(d3.symbolStar)
      .size(80);

    var pathData = symbolGenerator();

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
      .attr("stop-color", "blue")
      .attr("stop-opacity", 1);

    gradient
      .append("stop")
      .attr("class", "end")
      .attr("offset", "100%")
      .attr("stop-color", "purple")
      .attr("stop-opacity", 1);

    var layer1 = d3
      .select("g")
      .selectAll("g.layer1")
      .data(modalityArray)
      .enter()
      .append("g")
      .classed("layer1", true);

    var modality = d3
      .select("g")
      .selectAll("text")
      .data(modalityArray)
      .enter()
      .append("text");

    var textLabels = modality
      .attr("x", function(d) {
        return xScale(d.xVal);
      })
      .attr("y", function(d) {
        return yScale(d.yVal);
      })
      .text(function(d) {
        return `${d.capitalizedEntry}`;
      })
      .attr("font-family", "serif")
      .attr("font-size", "20px")
      .attr("fill", "yellow");

    var locationStars = d3
      .selectAll("g.layer1")
      .data(modalityArray)
      .selectAll("path")
      .data(function(d) {
        return d.locations;
      })
      .enter()
      .append("path")
      .attr("transform", function() {
        let xPos = positionRandomizer(xScale(this.parentNode.__data__.xVal));
        let yPos = positionRandomizer(yScale(this.parentNode.__data__.yVal));
        return "translate(" + xPos + ", " + yPos + ")";
      })
      .attr("d", pathData)
      .style("fill", "white")
      .style("stroke", "yellow")
      .on("mouseover", handleMouseOver)
      .on("mouseout", handleMouseOut);
  }

  componentDidMount() {
    const { locations } = this.state;
    this.drawConstellations(locations);
  }

  render() {
    return (
      <div>
        <h4>Constellation Here!</h4>
        <div id="d3Body" style={{ display: "inline-block" }} />
      </div>
    );
  }
}

export default Constellation;
