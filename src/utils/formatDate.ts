/**
 * return a properly formatted date. e.g. Jan 1, 2020
 * @param value: date is ISO format
 */
export function formatDate(value: string | Date | undefined): string {
  let dateValue: Date
  if (typeof value === "string") {
    dateValue = new Date(value)
  } else if (value instanceof Date) {
    dateValue = value
  } else {
    return ""
  }

  return dateValue.toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}
