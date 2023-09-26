import {AuthService} from "../../services/Auth.service.js"
import { redirect } from "../../utils/redirect.js"

const button = document.getElementById("submit_login")
const login = document.getElementById("login")


AuthService.logout()
button.addEventListener("click", (event)=>{
    event.preventDefault()
    event.stopPropagation()
    try {
        const userName = login.value
        AuthService.login({name:userName})
        redirect("lk")
    } catch (err) {
        login.classList.add('error')
    }
})