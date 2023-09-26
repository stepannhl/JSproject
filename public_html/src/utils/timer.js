export const useTimer=(id, duration, callback)=>{
    const timerElement = document.getElementById(id)
    timerElement.innerText = duration
    
    let interval = null
    const updateTimer = ()=>{
        const newTime = Number(timerElement.innerText)-1
        if (newTime===0){
            callback&&callback()
            clearInterval(interval)
        }
        timerElement.innerText = newTime
    }
    interval = setInterval(updateTimer, 1000)
    
}