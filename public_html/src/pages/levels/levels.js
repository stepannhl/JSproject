import { redirect } from "../../utils/redirect.js"
import { AuthService } from "../../services/Auth.service.js"

const user = AuthService.getUser()
if (!user) {
    redirect('auth')
}