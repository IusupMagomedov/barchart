import { useEffect, useRef, useState } from 'react';
import './App.css';
import * as d3 from "d3"



function App() {

  const svgRef = useRef()

  const dataset = [
    [ 34,     78 ],
    [ 109,   280 ],
    [ 310,   120 ],
    [ 79,   411 ],
    [ 420,   220 ],
    [ 233,   145 ],
    [ 333,   96 ],
    [ 222,    333 ],
    [ 78,    320 ],
    [ 21,   123 ]
  ];

  const w = 500;
  const h = 500;
  const padding = 60;


  const [barChart, setBarChart] = useState(dataset)

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json")
      .then(response => response.json())
      .then(jsonData => setBarChart(jsonData.data))

    return () => {

      //create a scale
      const xScale = d3.scaleLinear()
                     .domain([0, d3.max(dataset, (d) => d[0])])
                     .range([padding, w - padding]);

      const yScale = d3.scaleLinear()
                      .domain([0, d3.max(dataset, (d) => d[1])])
                      .range([h - padding, padding]);

      //reference to svg
      const svg = d3.select(svgRef.current)


        svg.selectAll("circle")
            .data(dataset)
            .enter()
            .append("circle")
            .attr("cx", (d) => xScale(d[0]))
            .attr("cy",(d) => yScale(d[1]))
            .attr("r", (d) => 5);  
        
        svg.selectAll("text")
            .data(barChart)
            .enter()
            .append("text")
            .attr("x", d => xScale(d[0])+10)
            .attr("y", d => yScale(d[1]))
            .text(d => `${d[0]}, ${d[1]}`)

      //create axises
      const xAxis = d3.axisBottom(xScale)
      const yAxis = d3.axisLeft(yScale)

      //drawing axises
        svg.append("g")
            .attr("transform", `translate(0, ${ w - padding })`)
            .call(xAxis)
            .attr("id", "x-axis")

        svg.append("g")
            .attr("transform", `translate(${padding}, 0)`)
            .call(yAxis)
            .attr("id", "y-axis")
    }
  }, [barChart])

  return (
    <div className="App">
      
      <svg width="900" height="500" ref={svgRef}>
      </svg>
      {barChart.map(element => <li>{element[0]} {element[1]}</li>)}
    </div>
  );
}

export default App;
