import * as movesService from "../services/movesService.js";
import jwt from "jsonwebtoken"
import *as scoreService from "../services/scoreService.js";

async function play(req, res){
    const { move } = req.params
    const { authorization } = req.headers
    const token = authorization.replace("Bearer ", "")

    try {
        const validMoves = new Set(['0','1','2','3'])
        if(!validMoves.has(move)) return res.sendStatus(403)

        if(!token) return res.sendStatus(401)

        const jwtSecret = process.env.JWT_SECRET;
        const { username } = jwt.decode(token, jwtSecret);

       const expectedMove = await movesService.getExpectedMove(username)

       const isMoveWrong = parseInt(move) !== expectedMove
       if(isMoveWrong){
           const points = await movesService.getMaxMovesHit(username);
           await scoreService.saveScore(username, points)
           
           await movesService.resetMoves(username);
           return res.send({nextMove: null})
       }
       
       const nextMove = await movesService.saveNextMove(username)
        return res.send({ nextMove });
        
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
}


export {play}