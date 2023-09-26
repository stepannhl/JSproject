export const useDragNDrop = (index, element, callback) =>{

    element.addEventListener("mousedown", (click)=>{
        const cornerX = Number(element.style.left.slice(0,-2))
        const cornerY = Number(element.style.top.slice(0,-2))
        
        const shiftLeft = click.clientX - cornerX
        const shiftTop = click.clientY - cornerY
        const drag = (event) =>{
            const positionX = event.clientX - shiftLeft
            const positionY = event.clientY - shiftTop
            
            element.style.left = `${positionX}px`
            element.style.top = `${positionY}px`
        }
        
        const drop = () =>{
            document.removeEventListener("mousemove", drag)
            callback&&callback(index, element)
        }

        document.addEventListener("mousemove", drag)
        element.addEventListener("mouseup", drop)
    })
}