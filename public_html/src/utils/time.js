const clockID = "clock"
const miniClockID = "mini_clock"
const clockContainer = document.getElementById(clockID)
const miniClockContainer = document.getElementById(miniClockID)

const updateClock = ()=>{
    const currentTime = new Date()
    const formattedTime = currentTime.toLocaleString("ru-RU", {hour:"2-digit", minute: "2-digit"})
    const formattedMini = currentTime.toLocaleString("ru-RU", {second: "2-digit"})
    clockContainer.innerText = formattedTime
    miniClockContainer.innerText = formattedMini
}
setInterval(updateClock,1000)
updateClock()