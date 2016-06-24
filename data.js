import d3 from 'd3';


var margin = {top: 30, right: 20, bottom: 30, left: 50},
    width = 600 - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom;

var xScale = d3.time.scale().range([0, width]);
var yScale = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom")
    .ticks(d3.time.minute, 60);


var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left");

var tradeLine = d3.svg.line()
    .x(d => xScale(d.time))
    .y(d => yScale(d.price))
    .interpolate('linear');

var w = width + margin.left + margin.right;
var h = height + margin.top + margin.bottom;

var svg = d3.select("body")
    .append("svg")
    .attr("viewBox", `0 0 ${w} ${h}`)
    .attr("preserveAspectRatio", "xMinYMin meet")
    .append("g")
        .attr("transform", 
              "translate(" + margin.left + "," + margin.top + ")");

const parseDate = d3.time.format('%Y-%m-%dT%H:%M:%S.%LZ').parse;
d3.json('./data.json', (err, srcData) => {

    let data = srcData.data.map(d => Object.assign({}, d, {
          time: parseDate(d.time),
          price: Math.random()*100,
          change: +d.change
       })
    );

    // Scale the range of the data
    xScale.domain(d3.extent(data, d => d.time));
    yScale.domain(d3.extent(data, d => d.price));

    svg.append("path")		// Add the tradeLine path.
        .attr("class", "line")
        .attr("d", tradeLine(data));

    svg.append("g")			// Add the X Axis
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")			// Add the Y Axis
        .attr("class", "y axis")
        .call(yAxis);
});
