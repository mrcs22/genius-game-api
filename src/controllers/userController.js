import {userData} from "../schemas/userSchema.js"
import * as userService from "../services/userService.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { resetMoves } from "../services/movesService.js";

async function signUp(req, res){
    try {
        const validation = userData.validate(req.body)
        if(validation.error) return res.sendStatus(422)
        
        const {username, password} = req.body
        const hashedPassword = bcrypt.hashSync(password, 8);

        const user = await userService.getUserByUsername(username)
        if(user) return res.sendStatus(409)

        await userService.saveUser(username, hashedPassword)

        res.sendStatus(201)
        
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
}

async function signIn(req, res){
    try {
        const validation = userData.validate(req.body)
        if(validation.error) return res.sendStatus(422)

        const {username, password} = req.body

        const user = await userService.getUserByUsername(username)
        if(!user) return res.sendStatus(404)

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) return res.sendStatus(401)

        const jwtSecret = process.env.JWT_SECRET;
        const tokenconfig = { expiresIn: 60 * 60 * 24 * 7 };
  
        const token = jwt.sign({ username }, jwtSecret, tokenconfig);

        await resetMoves(username)
  
        return res.send({ token });
        
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
}

export {signUp,signIn}