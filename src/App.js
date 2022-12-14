import { useEffect, useRef, useState } from 'react';
import './App.css';
import * as d3 from "d3"



function App() {

  const svgRef = useRef()
  const w = 900;
  const h = 450;
  const padding = 60;
  const [barChart, setBarChart] = useState([])

  useEffect(() => {

    fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json")
      .then(response => response.json())
      .then(jsonData => setBarChart(jsonData.data))
      .catch((error) => {
        console.log('Error:', error)})

    console.log("data fetched")
    //create a scale
    
    return () => {}}, [])

  useEffect(() => {
    //create a scale
    const xScale = d3.scaleLinear()
                  .domain([1947, 2016])
                  .range([padding, w - padding]);

    const yScale = d3.scaleLinear()
                    .domain([0, d3.max(barChart, (d) => d[1])])
                    .range([h - padding, padding]);

    //reference to svg
    const svg = d3.select(svgRef.current)


      svg.selectAll("rect")
          .data(barChart)
          .enter()
          .append("rect")
          .attr("class", "bar")
          .attr("data-date", d => d[0])
          .attr("data-gdp", d => d[1])
          .attr("width", w / barChart.length * 0.6)
          .attr("height", d => h - yScale(d[1]) - padding)
          .attr("x", (d, i) => padding + i * (w - 2 * padding) / barChart.length)
          .attr("y", (d, i) => yScale(d[1]))
          .attr("class", "bar")
          .append("title")
          .attr("id", "tooltip")
          .attr("data-date", d => d[0])
          .attr("data-gdp", d => d[1])
          .text(d => `${d[0]} ${d[1]}`)
          
    //create axises
    const xAxis = d3.axisBottom(xScale)
                    .tickFormat(x => x.toFixed(0))
                    
    const yAxis = d3.axisLeft(yScale)

    //drawing axises
      svg.append("g")
          .attr("transform", `translate(0, ${ h - padding })`)
          .call(xAxis)
          .attr("id", "x-axis")

      svg.append("g")
          .attr("transform", `translate(${padding}, 0)`)
          .call(yAxis)
          .attr("id", "y-axis")

    return () => {}}, [barChart])

  return (
    <div className="App">
      <svg width={w} height={h} ref={svgRef}></svg>
    </div>
  );
}

export default App;
