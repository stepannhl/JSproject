import { DrawerService } from "../../../services/Draw.service.js"
import { useTimer } from "../../../utils/timer.js"
import { useRating } from "../../../utils/rating.js"
import { AuthService } from "../../../services/Auth.service.js"
import { GameService } from "../../../services/Game.service.js"
import { redirect } from "../../../utils/redirect.js"
import { initModalWindow } from "../../../components/modal.js"

const figuresAmount = 10
const currentLevelName = "secondLevel"
const level = GameService.getLevelData(currentLevelName)
const user = AuthService.getUser()

const generateFigure=(index, callback)=>{
    const [figure, removeFigure] = DrawerService.drawNAngleFigure(index, level.figureSize, index)
    figure.addEventListener("click", ()=>{
        removeFigure()
        callback&&callback(index)
    })
}

const completeLevel = (rating) =>{
    const userWithCompletedLevel = GameService.compliteLevel(user, level.levelName, rating)
    const userWithUnlockedLevel = GameService.unlockLevel(userWithCompletedLevel, level.nextLevelName)
    AuthService.update(userWithUnlockedLevel)

    const modalText = `Вы набрали ${rating} баллов. Вы можете вернуться в меню, или перепройти уровень.`
    const modalButtons = [
        ["Меню", ()=>redirect("lk")],
        ["Предыдущий уровень", ()=>redirect("firstLevel", 'levels')],
        ["Следующий уровень", ()=>redirect("thirdLevel", 'levels')],
        ["Повторить", ()=>redirect("secondLevel", 'levels')]
    ]
    const {openModalWindow} = initModalWindow(modalText, modalButtons)
    openModalWindow()
}

const processClick = (updateRating) => {
    let clicked = new Array(figuresAmount+1).fill(false)
    let currentIndex = 1
    const validateClick = (index) => {
        clicked[index] = true
        if (index === currentIndex){
            updateRating(100)
            while (clicked[currentIndex]){
                ++currentIndex
            }
        }
        else{
            updateRating(-100)
        }
    }
    return validateClick
}


const init=()=>{
    const [rating, updateRating] = useRating("rating", 0)
    useTimer("timer", level.timerTime, ()=>completeLevel(rating.value))
    const clickCallback = processClick(updateRating)
    for (let i =1; i<=figuresAmount; ++i){
        generateFigure(i, clickCallback)
    } 
    
}



if (!user) {
    redirect('auth')
}
else { 
    init(user) 
}