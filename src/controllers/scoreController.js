import jwt from "jsonwebtoken"
import * as scoreService from "../services/scoreService.js";


async function getScore(req, res){
    const { authorization } = req.headers
    const token = authorization.replace("Bearer ", "")

    try {
       if(!token) return res.sendStatus(401)

        const jwtSecret = process.env.JWT_SECRET;
        const { username } = jwt.decode(token, jwtSecret);

        const score = await scoreService.getUserScore(username)
   
        return res.send({ score });
        
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
}

export {getScore}