export function displayTime(date) {

  const suffix = (date.hours < 12) ? "AM" : "PM"
  const adjustedHours = (date.hours <= 12) ? date.hours : date.hours - 12
  const timeString = `${adjustedHours}:${(date.minutes >= 10) ? date.minutes : "0"+date.minutes} ${suffix}`

  return timeString
}