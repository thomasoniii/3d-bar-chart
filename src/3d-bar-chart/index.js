import React from "react"

import Grid from "./Grid"

import Bar from "./Bar"
import { ChartDataProvider } from "./ChartDataProvider"
import { XPlane, YPlane, ZPlane } from "./Planes"
import Labels from "./Labels"

const CHART_WIDTH = 250
const CHART_HEIGHT = 250

const ThreeDBarChart = ({
  xBoxes = 10,
  yBoxes = 10,
  zBoxes = 10,
  boxes,
  leftLabels,
  rightLabels,
  boxSize = {
    xyh: 12.5, // CHART_HEIGHT / 20,
    xzw: 12.5, // CHART_WIDTH / 20,
    ywzh: 12.5 // CHART_WIDTH / 20
  },
  onLabelClick,
  onLabelMouseOver,
  onLabelMouseOut
}) => {
  const angle = 30

  const SCALER = 0.8
  return (
    <svg
      viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%" }}
      className="3d-bar-chart"
    >
      <g
        transform={`scale(${SCALER}) translate(${
          CHART_WIDTH * (1 - SCALER) - 25
        }, ${(CHART_HEIGHT * (1 - SCALER)) / 2 - 25})  `}
      >
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
          <XPlane>
            <Grid />
          </XPlane>
          <YPlane offset={0.0}>
            <Grid />
          </YPlane>
          <ZPlane>
            <Grid />
          </ZPlane>

          {boxes.map((b, i) => (
            <Bar key={i} box={b} />
          ))}

          <Labels
            type="right"
            labels={rightLabels}
            onMouseOver={onLabelMouseOver}
            onMouseOut={onLabelMouseOut}
            onClick={onLabelClick}
          />
          <Labels
            type="left"
            labels={leftLabels}
            onMouseOver={onLabelMouseOver}
            onMouseOut={onLabelMouseOut}
            onClick={onLabelClick}
          />
        </ChartDataProvider>
      </g>
    </svg>
  )
}

export default ThreeDBarChart
