
// Interaction 1
// when I click the control button
// - change the icon to a pause button
// - decrease counter

// Interaction 2
// when first timer ends, second timer starts
// - change the background colour
// - decrease counter

// declare variables that hold unchanging state
const controlBtn = document.querySelector(".control-btn")
const workTimer = document.querySelector("#workTimer")
const breakTimer = document.querySelector("#breakTimer")
const workSeconds = 3
const breakSeconds = 3
// declare variables that hold changing state
let isPaused, timerInterval, currentSeconds, currentTimer, isWorkPhase
isPaused = true
isWorkPhase = true
currentSeconds = workSeconds
currentTimer = workTimer

// Initialise app
updateTimer(workTimer, workSeconds)
updateTimer(breakTimer, breakSeconds)


controlBtn.addEventListener("click", () => {
  // toggle isPaused value
  isPaused = !isPaused
  // apply the appropriate control icon to the element
  controlBtn.classList.toggle("control-btn--pause", !isPaused)
  // start the timer
  if (!timerInterval) {
    timerInterval = setInterval(decrement, 1000)
  }
})

// calculate new times, update the page, handle ending timer
function decrement() {
  // don't do anything if paused
  if (isPaused) return

  // update the count
  currentSeconds--

  // format the count and update the page
  updateTimer(currentTimer, currentSeconds)

  // if timer ends
  if (currentSeconds === 0) {
    // stop the interval
    clearInterval(timerInterval)

    if (isWorkPhase) {
      isWorkPhase = false
      // switch timers *phases
      currentSeconds = breakSeconds
      // currentTotal = breakTotal
      currentTimer = breakTimer
      workTimer.classList.remove("timer--active")
      breakTimer.classList.add("timer--active")
      // change the colours
      document.body.classList.add("break-phase")
      // start the new timer
      timerInterval = setInterval(decrement, 1000)
    } else {
      // disable the buttons
      controlBtn.classList.remove("control-btn-pause")
      controlBtn.setAttribute("disabled", "disabled")
      addTimeBtn.setAttribute("disabled", "disabled")
    }
  }
}


function updateTimer(timer, numSeconds) {
  const minutes = Math.floor(numSeconds / 60) //integer divisions
  const seconds = numSeconds % 60
  const formattedSeconds = seconds.toString().padStart(2, '0')
  // calculate the right time before updating
  timer.innerText = `${minutes}:${formattedSeconds}`
}
//
