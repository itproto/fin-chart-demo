import React, { Component } from 'react';
import ReactFauxDOM from 'react-faux-dom';
import d3 from 'd3';
import utils from './chartRenderer';

export default class Chart extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.node = ReactFauxDOM.createElement('svg');

    const margin = {top: 30, right: 20, bottom: 30, left: 50},
        width = 600 - margin.left - margin.right,
        height = 375 - margin.top - margin.bottom;
    
    const fullWidth = width + margin.left + margin.right;
    const fullHeight = height + margin.top + margin.bottom;

    this.chartSize = {width, height};

    const chart = d3.select(this.node)
        .attr('viewBox', `0 0 ${fullWidth} ${fullHeight}`)
        .attr('preserveAspectRatio', 'xMinYMin meet')
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    chart.append('path')		
        .attr('class', "line");

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
    const {xAxis, yAxis, tradeLine, xMapData, yMapData} = utils({width, height});
    const chart = this.chart;

    //hydrate domains
    xMapData(data);
    yMapData(data);

    chart.select('.line')
      //.transition()
     // .duration(1000)
      .attr('d', tradeLine()(data));

    chart.select('.x.axis')
      .call(xAxis());
    chart.select('.y.axis')
      .call(yAxis());

    return this.node.toReact();
  }
}

Chart.propTypes = {
  data: React.PropTypes.array 
};
