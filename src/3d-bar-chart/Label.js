import React from "react"

import { useChartDataContext } from "./ChartDataProvider/ChartDataContext"

import "./label.css"

export const RightLabel = ({
  label,
  index,
  onMouseOver,
  onMouseOut,
  onClick
}) => {
  const {
    angle,
    xBoxes,
    boxSize // { xyh: 10, xzw: 10, ywzh: 10 }
  } = useChartDataContext()

  const xCoord = boxSize.xzw / 2 + boxSize.xzw * index
  return (
    <g transform={`rotate(-${angle * 2}, ${xCoord}, 0)`}>
      <text
        x={xBoxes * boxSize.xzw + 5}
        y={0}
        className="left-label label"
        textAnchor="start"
        alignmentBaseline="middle"
        onMouseOver={() => onMouseOver("right", index)}
        onMouseOut={() => onMouseOut("right", index)}
        onClick={() => onClick("right", index)}
      >
        {label}
      </text>
      <line
        x1={xBoxes * boxSize.ywzh + 5}
        y1={0}
        x2={xBoxes * boxSize.ywzh}
        y2={0}
        stroke="black"
      />
    </g>
  )
}

export const LeftLabel = ({
  label,
  index,
  onMouseOver,
  onMouseOut,
  onClick
}) => {
  const {
    angle,
    zBoxes,
    boxSize // { xyh: 10, xzw: 10, ywzh: 10 }
  } = useChartDataContext()

  const xCoord = boxSize.xzw / 2 + boxSize.xzw * index
  return (
    <g transform={`rotate(-${angle * 2}, ${xCoord}, 0)`}>
      <text
        x={-zBoxes * boxSize.ywzh + xCoord - 5}
        y={0}
        className="left-label label"
        textAnchor="end"
        alignmentBaseline="middle"
        onMouseOver={() => onMouseOver("left", index)}
        onMouseOut={() => onMouseOut("right", index)}
        onClick={() => onClick("left", index)}
      >
        {label}
      </text>
      <line
        x1={-zBoxes * boxSize.ywzh + xCoord - 5}
        y1={0}
        x2={-zBoxes * boxSize.ywzh + xCoord}
        y2={0}
        stroke="black"
      />
    </g>
  )
}
