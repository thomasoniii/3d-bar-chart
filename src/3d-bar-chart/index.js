import React from "react"

/* eslint-disable */

import Grid from "./Grid"
import { h, v, t } from "../utils/trig"
import Box from "./Box"
import { ChartDataProvider } from "./ChartDataProvider"
import { XPlane, YPlane, ZPlane, Plane } from "./Planes"

const CHART_WIDTH = 250
const CHART_HEIGHT = 250

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
  const angle = 30
  const horizontal = h(CHART_WIDTH / 2, angle)
  const vertical = CHART_HEIGHT / 2

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
      {/* <ChartDataProvider
        data={{
          chartWidth: CHART_WIDTH,
          chartHeight: CHART_HEIGHT,
          xBoxes,
          yBoxes,
          zBoxes,
          boxSize: { ...boxSize, xzw: 12.5 },
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
        <YPlane>
          <Grid />
        </YPlane>
        <ZPlane>
          <Grid />
        </ZPlane>
        <XPlane offset={xOffset}>
          <Box
            width={CHART_WIDTH / 2}
            height={CHART_HEIGHT / 2}
            angle={angle}
            x={box.x}
            y={box.y}
            measure={box.height}
            fill={"red"}
            flipVertical={true}
          />
        </XPlane>
        <YPlane offset={yOffset}>
          <Box
            width={CHART_WIDTH / 2}
            height={CHART_HEIGHT / 2}
            angle={angle}
            x={box.z}
            y={box.y}
            measure={box.height}
            fill={"green"}
            flipVertical={true}
          />
        </YPlane>
        <ZPlane offset={zOffset}>
          <Box
            width={CHART_WIDTH / 2}
            height={CHART_HEIGHT / 2}
            angle={`-${angle}`}
            x={box.x}
            y={box.z}
            fill={"blue"}
          />
        </ZPlane>
        {/*
        <Plane>
          <Grid
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
          />
        </Plane>{" "}
        */}
      </ChartDataProvider>
    </svg>
  )
}

export default ThreeDBarChart
