import React, { useState } from "react"

import "./App.css"

import ThreeDBarChart from "./3d-bar-chart"

import "./grid.css"
import "./label.css"

const getColor = (boxes, i) => {
  if (i < boxes.length) {
    return boxes[i].style
  } else {
    const fill = Math.floor(Math.random() * 16777215)
    const stroke = 16777215 - fill
    return {
      fill: `#${fill.toString(16).padStart(6, "0")}`,
      stroke: `#${stroke.toString(16).padStart(6, "0")}`
    }
  }
}

const randomBoxes = ({ xBoxes, zBoxes, oldBoxes = [] }) => {
  const boxes = []
  if (!boxes.length) {
    for (let xi = 0; xi < xBoxes; xi++) {
      const style = getColor(oldBoxes, boxes.length)
      for (let zi = 0; zi < zBoxes; zi++) {
        boxes.push({
          x: xi,
          z: zi,
          height: Math.random(),
          style
        })
      }
    }
  }
  return boxes
}

const filterBoxes = ({ boxes, type, i }) => {
  const newBoxes = []
  boxes.forEach((box) => {
    const newBox = { ...box, style: { ...box.style, opacity: 0.08 } }
    if (
      (type === "left" && newBox.x === i) ||
      (type === "right" && newBox.z === i) ||
      i === undefined
    ) {
      newBox.style.opacity = 1
    }
    newBoxes.push(newBox)
  })
  return newBoxes
}

const xBoxes = 10
const yBoxes = 10
const zBoxes = 10

const leftLabels = [
  "able",
  "baker",
  "charlie",
  "delta",
  "echo",
  "foxtrot",
  "gopher",
  "hotel",
  "icecream",
  "jerkoff"
]

const rightLabels = [
  "Able",
  "Baker",
  "Charlie",
  "Delta",
  "Echo",
  "Foxtrot",
  "Gopher",
  "Hotel",
  "Icecream",
  "Jerkoff"
]

function App() {
  const [boxes, setBoxes] = useState([]) // () => randomBoxes({ xBoxes, zBoxes }))
  return (
    <div className="App">
      <div className="threed-bar-chart-container">
        <ThreeDBarChart
          xBoxes={xBoxes}
          yBoxes={yBoxes}
          zBoxes={zBoxes}
          boxes={boxes}
          leftLabels={leftLabels.slice(0, xBoxes)}
          rightLabels={rightLabels.slice(0, zBoxes)}
          onLabelMouseOver={(type, i) =>
            setBoxes(filterBoxes({ boxes, type, i }))
          }
          onLabelMouseOut={() => setBoxes(filterBoxes({ boxes }))}
          onLabelClick={(type, i) => console.log("CLICK", type, i)} // eslint-disable-line
        />
      </div>
      <button
        onClick={() =>
          setBoxes(randomBoxes({ xBoxes, zBoxes, oldBoxes: boxes }))
        }
      >
        Random boxes
      </button>
    </div>
  )
}

export default App
