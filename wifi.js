// Set graph margins and dimensions
var margin = {top: 40, right: 40, bottom: 100, left: 40},
    width = 800 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

// Set ranges
var x = d3.scaleBand()
          .range([0, width])
          .padding(0.1);

var y = d3.scaleLinear()
          .range([height, 0]);

var svg4 = d3.select("#wifi").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
          
// Get data
d3.csv("to50mean.csv").then(function(data) {

  // Convert numeric data to numbers
  data.forEach(function(d) {
    d.Wifi___Connectivity = +d.Wifi___Connectivity;
  });

  // Scale the range of the data in the domains
  x.domain(data.map(function(d) { return d.Airline; }));
  y.domain([0, d3.max(data, function(d) { return d.Wifi___Connectivity; })]);
  
  // Append rectangles for bar chart
  svg4.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.Airline); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.Wifi___Connectivity); })
      .attr("height", function(d) { return height - y(d.Wifi___Connectivity); })
      .attr("fill", "steelblue"); // Optional: Add color

  // Add x axis
  svg4.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text") // Rotate x-axis labels for better readability
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

  // Add y axis
  svg4.append("g")
      .call(d3.axisLeft(y));
});
