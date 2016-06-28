import React, { Component } from 'react';
import ReactFauxDOM from 'react-faux-dom';
import d3 from 'd3';
//import utils from './chartRenderer';

export default class Chart extends React.Component {

  constructor() {
    super(...arguments);
  }

  componentDidMount(){
    this.node = ReactFauxDOM.createElement('svg');

    const margin = {top: 30, right: 20, bottom: 30, left: 50},
        width = 600 - margin.left - margin.right,
        height = 100 - margin.top - margin.bottom;
    
    const fullWidth = width + margin.left + margin.right;
    const fullHeight = height + margin.top + margin.bottom;

    this.chartSize = {width, height};

    const chart = d3.select(this.node)
        .attr('viewBox', `0 0 ${fullWidth} ${fullHeight}`)
        .attr('preserveAspectRatio', 'xMinYMin meet')
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    chart.append('g')		
        .attr('class', 'bars');

    chart.append('g')		
        .attr('class', 'x axis')
        .attr('transform', `translate(0, ${height})`);

    chart.append('g')	
        .attr('class', 'y axis');

    this.chart = chart;
  }
  
  render() {
    const data = this.props.data;
    if(!data || !this.chartSize){
      return (<div>Loading</div>);
    }

    const {width, height} = this.chartSize;
    const chart = this.chart;

    let xScale = d3.time.scale()
      .range([0, width])
      .domain(d3.extent(data, d => d.time));

    const histo = d3.layout
      .histogram()
      .value(d => d.time);
    let histoData = histo.bins(xScale.ticks(d3.time.minute, 10))(data);

    histoData = histoData.map(d => {
      return Object.assign(d, {
        sum: d3.sum(d, d1 => d1.volume)
      });
    });

    let yScale = d3.scale.linear()
      .range([height, 0])
      .domain(d3.extent(histoData, d => d.sum));

    let sel = chart.selectAll('.bar')
      .data(histoData);

    sel.enter()
      .append('rect')
      .attr("class", "bar");

    sel.exit().remove();

    sel
      .attr("x", d => {
        return xScale(d.x); 
      })
    .attr("width", function(d) { 
      return xScale(new Date(d.x.getTime() + d.dx)) - xScale(d.x);
    })
    .attr("y", function(d) { 
      return yScale(d.sum);
    })
    .attr("height", function(d) { 
      return height -  yScale(d.sum);
    });

    return this.node.toReact();
  }
}

Chart.propTypes = {
  data: React.PropTypes.array 
};
