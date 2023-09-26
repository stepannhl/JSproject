import { AuthService } from "../../services/Auth.service.js"
import { GameService } from "../../services/Game.service.js"
import { redirect } from "../../utils/redirect.js"

const generateItem = (value) => {
    const item = document.createElement("p")
    item.classList.add("item")
    item.style.width="100%"
    item.style.padding="1rem"
    item.style.textAlign="center"
    item.innerText = value
    return item
}

const generateRow = (name, rating, isOdd) => {
    const current = AuthService.getUser().name === name
    const row = document.createElement("div")
    const items = [
        generateItem(name),
        generateItem(rating)
    ]
    if (!isOdd) {
        row.style.background="#faf0ca"
    }
    if (current) {
        row.style.border="1px solid #0d3b66"
        row.style.background="#f4d35e"
    }
    row.classList.add("row")
    row.style.width="100%"
    row.style.display="flex"
    items.forEach(item => row.appendChild(item))
    return row
}

const init = (users) => {
    const table = document.querySelector(".table")
    const rows = [
        generateRow("Пользователь", "Рейтинг", true),
        ...Object.keys(users).map((key, index)=>{
            const rating = GameService.getRating({name:key, ...users[key]})
            return generateRow(key, rating, index%2)
        })   
    ]
    rows.forEach(row=>table.appendChild(row))
}

const user = AuthService.getUser()
const users = AuthService.getUserList()
if (!user) {
    redirect('auth')
}
else { 
    init(users) 
}