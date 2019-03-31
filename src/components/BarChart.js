import React, { Component } from "react";
import numeral from 'numeral';
import * as d3 from "d3";

class BarChart extends Component {
  drawChart() {
    const data = this.props.data['2008'];

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

    // Scale the range of the data in the domains
    x.domain([
      0,
      d3.max(data, function(d) {
        return d.value;
      })
    ]);
    y.domain(
      data.map(function(d) {
        return d.category;
      })
    );

    // append the rectangles for the bar chart
    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("fill", "blue")
      .attr("width", function(d) {
        return x(d.value);
      })
      .attr("y", function(d) {
        return y(d.category);
      })
      .attr("height", y.bandwidth());

    svg.selectAll(".category-label")  		
	  .data(data)
	  .enter()
	  .append("text")
	  .attr("class","label")
	  .attr("x", (function(d) { return x(d.value) } ))
	  .attr("y", function(d) { return y(d.category) })
      .attr("dy", ".75em")
      .attr("fill", "white")
      .attr("text-anchor", "end")
	  .text(function(d) { return d.category; });   

    svg.selectAll(".value-label")  		
	  .data(data)
	  .enter()
	  .append("text")
	  .attr("class","label")
	  .attr("x", (function(d) { return x(d.value) } ))
	  .attr("y", function(d) { return y(d.category) })
      .attr("dy", ".75em")
      .attr("fill", "black")
      .attr("text-anchor", "beginning")
      .text(function(d) { return numeral(d.value).format('0.0a'); });   
      
    // add the x Axis
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x)
        .ticks(10)
        .tickFormat(d3.format('.1s')))
  }

  componentDidMount() {
    this.drawChart();
  }

  render() {
    return <div id={"#" + this.props.id} />;
  }
}

export default BarChart;
