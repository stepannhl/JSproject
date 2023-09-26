import {randomRange} from "../utils/random.js";


export class DrawerService {

    static colorsPool = [
        '#edc7b7',
        '#123c69',
        '#DA789A',
        '#ac3b61',
    ]

    static getRandomColor = () => {
        const index = randomRange(0, this.colorsPool.length);
        return this.colorsPool[index];
    }

    static #calculateVertexes = (n, len) => {
        const vertexes = [];
        const rad = 2 * Math.PI / n;
        const rotation = Math.random();

        for (let i = 0; i <= n; i++) {
            vertexes.push([
                len * (Math.cos(rad * (i + rotation)) + 1),
                len * (Math.sin(rad * (i + rotation)) + 1),
            ]);
        }

        return vertexes;
    }

    static drawNAngleFigure = (index, size, text) => {
        const len = randomRange(size.min, size.max)
        const angles = randomRange(3, 6)
        const container = document.querySelector(".playground")
        const canvas = this.generateCanvas(len*2)
        const ctx = canvas.getContext("2d")
        const color = this.getRandomColor()

        canvas.id = `figure_${index}`
        canvas.style.zIndex = 16-index
        container.appendChild(canvas)
        
        if (angles < 3) return;
        const vertexes = this.#calculateVertexes(angles, len);
        const [x0, y0] = vertexes[0];

        ctx.beginPath()
        ctx.moveTo(x0, y0);
        for (let i = 1; i <= angles; ++i) {
            const [toX, toY] = vertexes[i];
            ctx.lineTo(toX, toY);
        }
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();

        if (text){
            ctx.fillStyle = "white"
            ctx.font = "bold 3rem Arial"
            ctx.textAlign = "center"
            ctx.textBaseline = "middle"
            ctx.fillText(text, len, len)
        }

        const deleteCanvas = () => {
            container.removeChild(canvas)
        }
        return [canvas,deleteCanvas]
    }

    static generateCanvas=(len)=>{
        const x = randomRange(0,window.innerWidth-len)
        const y = randomRange(0, window.innerHeight-len)
        const canvas = document.createElement("canvas")
        canvas.width=len
        canvas.height=len
        canvas.style.position="absolute"
        canvas.style.left=`${x}px`
        canvas.style.top=`${y}px`
        canvas.style.cursor="pointer"
        canvas.style.zIndex="3"
        return canvas
    }
}

