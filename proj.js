// Set graph margins and dimensions
var margin = {top: 40, right: 40, bottom: 100, left: 50},
    width = 800 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;

// Set ranges
var x = d3.scaleBand()
          .range([0, width])
          .padding(0.1);

var y = d3.scaleLinear()
          .range([height, 0]);

var svg = d3.select("#seat").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
          
// Get data
d3.csv("to50mean.csv").then(function(data) {

  // Convert numeric data to numbers
  data.forEach(function(d) {
    d.Seat_Comfort = +d.Seat_Comfort;
  });

  data.sort(function(x, y){
    return d3.descending(x.Seat_Comfort, y.Seat_Comfort)
  })

  // Scale the range of the data in the domains
  x.domain(data.map(function(d) { return d.Airline; }));
  y.domain([0, d3.max(data, function(d) { return d.Seat_Comfort; })]);
  
  // Append rectangles for bar chart
  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.Airline); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.Seat_Comfort); })
      .attr("height", function(d) { return height - y(d.Seat_Comfort); })
      .attr("fill", "steelblue"); // Optional: Add color

  // Add x axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text") // Rotate x-axis labels for better readability
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

  // Add y axis
  svg.append("g")
      .call(d3.axisLeft(y));
      svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Rating");
});

