/* eslint-disable */

import React from "react"

import { ZPlane } from "./Planes"
import { RightLabel, LeftLabel } from "./Label"
import { useChartDataContext } from "./ChartDataProvider"

const Labels = ({
  labels,
  type = "left",
  onMouseOver = () => {},
  onClick = () => {}
}) => {
  const {
    angle,
    yBoxes,
    boxSize // { xyh: 10, xzw: 10, ywzh: 10 }
  } = useChartDataContext()
  console.log("MOVE IT : ", yBoxes, boxSize.ywzh, yBoxes * boxSize.ywzh, angle)
  const typeMultiplier = type === "left" ? -1 : 1
  const Label = type === "left" ? LeftLabel : RightLabel
  return (
    <ZPlane>
      <g transform={`rotate(${typeMultiplier * angle})`}>
        {labels.map((label, i) => (
          <Label
            label={label}
            index={i}
            key={i}
            onMouseOver={onMouseOver}
            onClick={onClick}
          />
        ))}
      </g>
    </ZPlane>
  )
}

export default Labels

/*
const Labels = ({ labels }) => {
  const {
    angle,
    yBoxes,
    boxSize // { xyh: 10, xzw: 10, ywzh: 10 }
  } = useChartDataContext()
  console.log("MOVE IT : ", yBoxes, boxSize.ywzh, yBoxes * boxSize.ywzh, angle)
  return (
    <ZPlane>
      <g transform={`rotate(-${angle})`}>
        {labels.map((label, i) => (
          <Label label={label} index={i} key={i} />
        ))}
      </g>
    </ZPlane>
  )
}

export default Labels
*/
