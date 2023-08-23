export function displayTime(hours, minutes) {

  const suffix = (hours < 12) ? "AM" : "PM"
  hours = (hours <= 12) ? hours : hours - 12
  const timeString = `${hours}:${(minutes >= 10) ? minutes : "0"+minutes} ${suffix}`

  return timeString
}