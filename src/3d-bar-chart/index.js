import React from "react"

/* eslint-disable */

import Grid from "./Grid"
import { h, v, t } from "../utils/trig"
import Box from "./Box"

const CHART_WIDTH = 250
const CHART_HEIGHT = 250

const ThreeDBarChart = ({ rows = 10, cols = 10 }) => {
  const angle = 30
  const horizontal = h(CHART_WIDTH / 2, angle)
  const vertical = CHART_HEIGHT / 2
  const boxWidth = horizontal / cols
  const boxHeight = vertical / rows
  console.log(
    "BOX H : ",
    CHART_HEIGHT / 2,
    vertical,
    boxHeight,
    CHART_HEIGHT / 2 / rows
  )

  const xOffset = 0
  const yOffset = 0
  const zOffset = 0

  const box = { x: 0, y: 0, z: 0, height: 0.55 }

  return (
    <svg
      viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%" }}
      className="3d-bar-chart"
    >
      <rect x="0" y="0" width="50" height="50" fill="blue" />
      <g
        transform-origin="center"
        transform={`
          translate(-${boxWidth * xOffset},${(boxHeight * xOffset) / 2})
          translate(${CHART_WIDTH / 2},0)
        `}
      >
        <Grid
          width={CHART_WIDTH / 2}
          height={CHART_HEIGHT / 2}
          rows={rows}
          cols={cols}
          angle={angle}
        />
        <Box
          width={CHART_WIDTH / 2}
          height={CHART_HEIGHT / 2}
          rows={rows}
          cols={cols}
          angle={angle}
          x={box.x}
          y={box.y}
          measure={box.height}
          fill={"red"}
          flipVertical={true}
        />
      </g>
      <g
        transform-origin="center"
        transform={`translate(${boxWidth * zOffset},${
          (boxHeight * zOffset) / 2
        })
        scale(-1,1)
        translate(${CHART_WIDTH / 2},0)
        `}
      >
        <Grid
          width={CHART_WIDTH / 2}
          height={CHART_HEIGHT / 2}
          rows={rows}
          cols={cols}
          angle={angle}
        />
        <Box
          width={CHART_WIDTH / 2}
          height={CHART_HEIGHT / 2}
          rows={rows}
          cols={cols}
          angle={angle}
          x={box.z}
          y={box.y}
          measure={box.height}
          fill={"green"}
          flipVertical={true}
        />
      </g>
      <g
        transform-origin={"center"}
        transform={`
        translate(0,-${boxHeight * yOffset})
        rotate(60)
        translate(${CHART_WIDTH / 2},${CHART_HEIGHT / 2})
      `}
      >
        <Grid
          width={CHART_WIDTH / 2}
          height={CHART_HEIGHT / 2}
          rows={rows}
          cols={cols}
          angle={`-${angle}`}
        />
        <Box
          width={CHART_WIDTH / 2}
          height={CHART_HEIGHT / 2}
          rows={rows}
          cols={cols}
          angle={`-${angle}`}
          x={box.x}
          y={box.z}
          fill={"blue"}
        />
      </g>
      <Grid
        width={CHART_WIDTH / 2}
        height={CHART_HEIGHT / 2}
        rows={rows}
        cols={cols}
        Xtransform-origin={"center"}
        Xtransform={`translate(${CHART_WIDTH / 2},0)`}
        angle={0}
      />
      <Box
        width={CHART_WIDTH / 2}
        height={CHART_HEIGHT / 2}
        rows={rows}
        cols={cols}
        angle={0}
        x={0}
        y={0}
        fill={"purple"}
      />
    </svg>
  )
}

export default ThreeDBarChart
