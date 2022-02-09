export const defineIconStyles = ({
  sizeDefault = 50,
  fillDefault = "rgb(25, 110, 210)",
  strokeDefault = "rgb(25, 110, 210)",
}) => {
  return {
    size: { type: Number, default: sizeDefault },
    fill: { type: String, default: fillDefault },
    stroke: { type: String, default: strokeDefault },
  }
}
