import { DrawerService } from "../../../services/Draw.service.js"
import { useTimer } from "../../../utils/timer.js"
import { useRating } from "../../../utils/rating.js"
import { AuthService } from "../../../services/Auth.service.js"
import { GameService } from "../../../services/Game.service.js"
import { redirect } from "../../../utils/redirect.js"
import { initModalWindow } from "../../../components/modal.js"

const currentLevelName = "firstLevel"
const level = GameService.getLevelData(currentLevelName)
const user = AuthService.getUser()


const generateFigure=(callback)=>{
    const [figure, removeFigure] = DrawerService.drawNAngleFigure("figure", level.figureSize)
    figure.addEventListener("click", ()=>{
        removeFigure()
        callback&&callback(100)
        generateFigure(callback)
    })
}

const completeLevel = (rating) =>{
    const userWithCompletedLevel = GameService.compliteLevel(user, level.levelName, rating)
    const userWithUnlockedLevel = GameService.unlockLevel(userWithCompletedLevel, level.nextLevelName)
    AuthService.update(userWithUnlockedLevel)

    const modalText = `Вы набрали ${rating} баллов. Вы можете вернуться в меню, или перепройти уровень.`
    const modalButtons = [
        ["Меню", ()=>redirect("lk")],
        ["Следующий уровень", ()=>redirect("secondLevel", 'levels')],
        ["Повторить", ()=>redirect("firstLevel", 'levels')]
    ]
    const {openModalWindow} = initModalWindow(modalText, modalButtons)
    openModalWindow()
}

const init=()=>{
    const [rating, updateRating] = useRating("rating", 0)
    useTimer("timer", level.timerTime, ()=>completeLevel(rating.value))
    generateFigure(updateRating)
}



if (!user) {
    redirect('auth')
}
else { 
    init(user) 
}