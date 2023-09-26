import { redirect } from "../../utils/redirect.js"
import { AuthService } from "../../services/Auth.service.js"
import { GameService } from "../../services/Game.service.js"

const user = AuthService.getUser()
const login = document.getElementById("login")
const rating = document.getElementById("rating")
const level_successed = document.getElementById("level_successed")
const logout_button = document.getElementById("logout_button")

const init = (user)=>{
    login.innerText = user.name
    rating.innerText = GameService.getRating(user)
    level_successed.innerText = GameService.complitedLevelsAmount(user)
}

logout_button.addEventListener("click", (event)=>{
    event.preventDefault()
    event.stopPropagation()
    AuthService.logout()
    redirect('auth')
})


if (!user) {
    redirect('auth')
}
else { 
    init(user) 
}


