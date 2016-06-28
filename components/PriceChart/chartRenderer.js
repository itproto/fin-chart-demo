
export default ({width, height}) => {
  const xScale = () => {
    return d3.time.scale()
            .range([0, width])
  };

  const yScale = () => {
    return d3.scale.linear()
            .range([height, 0]);
  };

  const _xScale = xScale(width);
  const _yScale = yScale(height);

  const xAxis = () => {
    return d3.svg.axis()
            .scale(_xScale)
            .orient('bottom')
            .ticks(d3.time.minute, 60);
  }

  const yAxis = () => { 
    return d3.svg.axis()
        .scale(_yScale)
        .orient('left');
  }

  const tradeLine = () => {
    return d3.svg.line()
      .x(d => _xScale(d.time))
      .y(d => _yScale(d.price))
      .interpolate('linear');
  }

  const xMapData = (data) => {
    _xScale
      .domain(d3.extent(data, d => d.time));
      //.nice(d3.time.day)
  }

  const yMapData = (data) => {
    _yScale.domain(d3.extent(data, d => d.price));
  }

  return {
    xAxis,
    yAxis,
    tradeLine,
    xMapData,
    yMapData
  };
}
