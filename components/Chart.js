import React, { Component } from 'react';
import ReactFauxDOM from 'react-faux-dom';
import d3 from 'd3';
import utils from './chartRenderer';

export default class Chart extends React.Component {

  constructor(props) {
    super(props);
  }
  
  render() {
    const data = this.props.data;
    if(!data){
      return (<div>Loading</div>);
    }

    const margin = {top: 30, right: 20, bottom: 30, left: 50},
        width = 600 - margin.left - margin.right,
        height = 375 - margin.top - margin.bottom;

    const {xAxis, yAxis, tradeLine, xMapData, yMapData} = utils({width, height});
    xMapData(data);
    yMapData(data);

    const fullWidth = width + margin.left + margin.right;
    const fullHeight = height + margin.top + margin.bottom;
    
    const node = ReactFauxDOM.createElement('svg');
    const svg = d3.select(node)
        .attr('viewBox', `0 0 ${fullWidth} ${fullHeight}`)
        .attr('preserveAspectRatio', 'xMinYMin meet')
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    svg.append('path')		
        .attr('class', "line")
        .attr('d', tradeLine()(data));

    svg.append('g')		
        .attr('class', 'x axis')
        .attr('transform', `translate(0, ${height})`)
        .call(xAxis());

    svg.append('g')	
        .attr('class', 'y axis')
        .call(yAxis());

    return node.toReact();
  }
}

Chart.propTypes = { data: React.PropTypes.array };
Chart.defaultProps = { initialCount: 0 };
