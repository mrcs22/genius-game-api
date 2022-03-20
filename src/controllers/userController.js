import {userData} from "../schemas/userSchema.js"
import * as userService from "../services/userService.js"
import bcrypt from "bcrypt";

async function signUp(req, res){
    try {
        const validation = userData.validate(req.body)
        if(validation.error) return res.sendStatus(422)
        
        const {username, password} = req.body
        const hashedPassword = bcrypt.hashSync(password, 12);

        const user = await userService.getUserByUsername(username)
        if(user) return res.sendStatus(409)

        await userService.saveUser(username, hashedPassword)

        res.sendStatus(201)
        
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
}

export {signUp}