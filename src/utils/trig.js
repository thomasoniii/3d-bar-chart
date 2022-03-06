const deg2rad = (angle) => (angle * Math.PI) / 180

export const h = (width, angle) => {
  return width * Math.cos(deg2rad(angle))
}

export const v = (height, angle) => {
  return height * Math.sin(deg2rad(angle))
}

export const t = (height, angle) => {
  return height * Math.tan(deg2rad(angle))
}
