import React, { Component } from "react";
import numeral from "numeral";
import _ from "lodash";
import * as d3 from "d3";

class BarChart extends Component {
  setUpSVG() {
    // set the dimensions and margins of the graph
    const margin = { top: 20, right: 20, bottom: 30, left: 40 },
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    // set the ranges
    const y = d3
      .scaleBand()
      .range([0, height])
      .padding(0.1);

    const x = d3.scaleLinear().range([0, width]);

    // append the svg object to the body of the page
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    const svg = d3
      .select("body")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // scale y axis
    y.domain(_.range(1, 11));

    return { width, height, x, y, svg };
  }

  drawBar({ barData, svg, x, y }) {
    const bar = svg.append("g");

    bar
      .attr("id", barData.category)

    const input = { barData, bar, x, y };
    this.drawRect(input);
    this.addCategoryLabel(input);
    this.addValueLabel(input);
  }

  drawRect({ barData, bar, x, y }) {
    const { value, rank } = barData;
    bar
      .append("rect")
      .attr("class", "bar")
      .attr("fill", "blue")
      .attr("width", x(value))
      .attr("y", y(rank))
      .attr("height", y.bandwidth());
  }

  addCategoryLabel({ barData, bar, x, y }) {
    const { value, rank, category } = barData;
    bar
      .append("text")
      .attr("class", "category-label")
      .attr("x", x(value))
      .attr("y", y(rank))
      .attr("dy", ".75em")
      .attr("fill", "white")
      .attr("text-anchor", "end")
      .text(category);
  }

  addValueLabel({ barData, bar, x, y }) {
    const { value, rank } = barData;
    bar
      .append("text")
      .attr("class", "value-label")
      .attr("x", x(value))
      .attr("y", y(rank))
      .attr("dy", ".75em")
      .attr("fill", "black")
      .attr("text-anchor", "beginning")
      .text(numeral(value).format("0.0a"));
  }

  drawChart() {
    const data = this.props.data["2008"];

    const { height, x, y, svg } = this.setUpSVG();

    // Scale the range of the data in the domains
    x.domain([
      0,
      d3.max(data, function(d) {
        return d.value;
      })
    ]);

    data.forEach(barData => {
      this.drawBar({ barData, svg, x, y });
    });

    // add the x Axis
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(
        d3
          .axisBottom(x)
          .ticks(10)
          .tickFormat(d3.format(".1s"))
      );
  }

  componentDidMount() {
    this.drawChart();
  }

  render() {
    return <div id={"#" + this.props.id} />;
  }
}

export default BarChart;
