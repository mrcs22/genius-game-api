import dbConnection from "../database/dbConnection.js";
import * as userService from "./userService.js";

async function resetMoves(username){
    try {      
     
        const user = await userService.getUserByUsername(username)
        
        await dbConnection.execute(`
        DELETE FROM moves
        WHERE id_user=${user.id_user}
        `);
        
        const nextMove = Math.floor(Math.random()*4);
        await dbConnection.execute(`
        INSERT INTO moves
        (id_user, value, points)
        VALUES
        (${user.id_user}, ${nextMove}, 0)
        `);


        
        
        return true
      } catch (error) {
        throw error;
      }
}

async function saveNextMove(username){
    try {      
   
        const user = await userService.getUserByUsername(username)

        const nextMove = Math.floor(Math.random()*4);
        
        await dbConnection.execute(`
        UPDATE moves
        SET value=${nextMove}, points=points+1
        WHERE id_user=${user.id_user}
        `);
    
        
        
        return nextMove;
      } catch (error) {
        throw error;
      }
}

async function getExpectedMove(username){
    try {      
        const user = await userService.getUserByUsername(username)

        const [rows] = await dbConnection.execute(`
        SELECT value, points FROM moves
        WHERE id_user=${user.id_user}
        `);
    
        
 
        return rows[0] ? rows[0].value : 1;
      } catch (error) {
        throw error;
      }
}

async function getMaxMovesHit(username){
    try {      
      
        const user = await userService.getUserByUsername(username)

        const [rows] = await dbConnection.execute(`
        SELECT points FROM moves
        WHERE id_user=${user.id_user}
        `);
        
        return rows[0] ? rows[0].points : null;
      } catch (error) {
        throw error;
      }
}

export {resetMoves, saveNextMove, getExpectedMove,getMaxMovesHit}