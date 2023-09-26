import { DrawerService } from "../../../services/Draw.service.js"
import { useTimer } from "../../../utils/timer.js"
import { useRating } from "../../../utils/rating.js"
import { AuthService } from "../../../services/Auth.service.js"
import { GameService } from "../../../services/Game.service.js"
import { useDragNDrop } from "../../../utils/dragNDrop.js"
import { redirect } from "../../../utils/redirect.js"
import { initModalWindow } from "../../../components/modal.js"

const figuresAmount = 10
const currentLevelName = "thirdLevel"
const level = GameService.getLevelData(currentLevelName)
const user = AuthService.getUser()

const generateFigure=(index, callback)=>{
    const [figure, removeFigure] = DrawerService.drawNAngleFigure(`figure_${index}`, level.figureSize, index)
    useDragNDrop(index, figure, callback)
    callback(index, figure)
}

const completeLevel = (rating) =>{
    const userWithCompletedLevel = GameService.compliteLevel(user, level.levelName, rating)
    const userWithUnlockedLevel = GameService.unlockLevel(userWithCompletedLevel, level.nextLevelName)
    AuthService.update(userWithUnlockedLevel)

    const modalText = `Вы набрали ${rating} баллов. Вы можете вернуться в меню, или перепройти уровень.`
    const modalButtons = [
        ["Меню", ()=>redirect("lk")],
        ["Предыдущий уровень", ()=>redirect("secondLevel", 'levels')],
        ["Повторить", ()=>redirect("thirdLevel", 'levels')]
    ]
    const {openModalWindow} = initModalWindow(modalText, modalButtons)
    openModalWindow()
}

const processDrop = (updateRating) => {
    const state = new Array(figuresAmount+1).fill(false)
    const odd = document.querySelector(".odd").getBoundingClientRect()
    const even = document.querySelector(".even").getBoundingClientRect()
    const validateDrop=(index, figure)=>{
        const figureCoordinates = figure.getBoundingClientRect()
        const containerCoordinates = index%2 ? odd : even
        const valid = 
            figureCoordinates.top > containerCoordinates.top 
            &&
            figureCoordinates.right < containerCoordinates.right
            &&
            figureCoordinates.bottom < containerCoordinates.bottom
            &&
            figureCoordinates.left > containerCoordinates.left
        if (valid){
            if (!state[index]) {
                updateRating(100)
                state[index] = true
            }
        }
        else{
            if (state[index]){
                updateRating(-100)
                state[index] = false
            }
        }  
    }
    return validateDrop
}


const init=()=>{
    const [rating, updateRating] = useRating("rating", 0)
    useTimer("timer", level.timerTime, ()=>completeLevel(rating.value))
    const dropCallback = processDrop(updateRating)
    for (let i =1; i<=figuresAmount; ++i){
        generateFigure(i, dropCallback)
    } 
    
}

if (!user) {
    redirect('auth')
}
else { 
    init(user) 
}