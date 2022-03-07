import React, { useState } from "react"

/* eslint-disable */

import Grid from "./Grid"
import { h, v, t } from "../utils/trig"

import Bar from "./Bar"
import { ChartDataProvider } from "./ChartDataProvider"
import { XPlane, YPlane, ZPlane, Plane } from "./Planes"

const CHART_WIDTH = 250
const CHART_HEIGHT = 250

const getColor = (boxes, i) => {
  if (i < boxes.length) {
    return boxes[i]
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
      const { fill, stroke } = getColor(oldBoxes, boxes.length)
      for (let zi = 0; zi < zBoxes; zi++) {
        boxes.push({
          x: xi,
          z: zi,
          height: Math.random(),
          fill,
          stroke
        })
      }
    }
  }
  return boxes
}

const ThreeDBarChart = ({
  xBoxes = 10,
  yBoxes = 10,
  zBoxes = 10,
  boxSize = {
    xyh: 12.5, //CHART_HEIGHT / 20,
    xzw: 12.5, //CHART_WIDTH / 20,
    ywzh: 12.5 //CHART_WIDTH / 20
  }
}) => {
  const box = {
    x: 0,
    z: 0,
    height: 0.5,
    fillX: "red",
    fillY: "green",
    fillZ: "blue"
  }

  const [boxes, setBoxes] = useState(() => randomBoxes({ xBoxes, zBoxes }))
  //const [boxes, setBoxes] = useState([box])
  const angle = 30
  const horizontal = h(CHART_WIDTH / 2, angle)
  const vertical = CHART_HEIGHT / 2

  const xOffset = 0
  const yOffset = 0
  const zOffset = 0

  return (
    <>
      <svg
        viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%" }}
        className="3d-bar-chart"
      >
        {/* <ChartDataProvider
        data={{
          chartWidth: CHART_WIDTH,
          chartHeight: CHART_HEIGHT,
          xBoxes,
          yBoxes,
          zBoxes,
          boxSize: { ...boxSize, yzw: 12.5 },
          angle
        }}
      >
        <XPlane>
          <Grid />
        </XPlane>
      </ChartDataProvider> */}
        <ChartDataProvider
          data={{
            chartWidth: CHART_WIDTH,
            chartHeight: CHART_HEIGHT,
            xBoxes,
            yBoxes,
            zBoxes,
            boxSize,
            angle
          }}
        >
          <rect x="0" y="0" width="50" height="50" fill="blue" />
          <XPlane>
            <Grid />
          </XPlane>
          <YPlane offset={0.0}>
            <Grid />
          </YPlane>
          <ZPlane>
            <Grid />
          </ZPlane>
          {/*<Bar box={box} />
        <Bar box={box2} />
        <Bar box={box3} /> */}
          {boxes.map((b, i) => (
            <Bar key={i} box={b} />
          ))}

          {/* <Grid
          width={CHART_WIDTH / 2}
          height={CHART_HEIGHT / 2}
          Xtransform-origin={"center"}
          Xtransform={`translate(${CHART_WIDTH / 2},0)`}
          angle={0}
        />
        <Box
          width={CHART_WIDTH / 2}
          height={CHART_HEIGHT / 2}
          angle={0}
          x={0}
          y={0}
          fill={"purple"}
        /> */}
        </ChartDataProvider>
      </svg>
      <button
        onClick={() =>
          setBoxes(randomBoxes({ xBoxes, zBoxes, oldBoxes: boxes }))
        }
      >
        Random boxes
      </button>
    </>
  )
}

export default ThreeDBarChart
