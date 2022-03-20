import getDbConnection from "../database/getDbConnection.js";
import * as userService from "./userService.js";

async function resetMoves(username){
    try {      
        const dbConnection = await getDbConnection();

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


        dbConnection.end()
        
        return true
      } catch (error) {
        throw error;
      }
}

async function saveNextMove(username){
    try {      
        const dbConnection = await getDbConnection();

        const user = await userService.getUserByUsername(username)

        const nextMove = Math.floor(Math.random()*4);
        
        await dbConnection.execute(`
        UPDATE moves
        SET value=${nextMove}, points=points+1
        WHERE id_user=${user.id_user}
        `);
    
        dbConnection.end()
        
        return nextMove;
      } catch (error) {
        throw error;
      }
}

async function getExpectedMove(username){
    try {      
        const dbConnection = await getDbConnection();

        const user = await userService.getUserByUsername(username)

        const [rows] = await dbConnection.execute(`
        SELECT value, points FROM moves
        WHERE id_user=${user.id_user}
        `);
    
        dbConnection.end()
 
        return rows[0] ? rows[0].value : 1;
      } catch (error) {
        throw error;
      }
}

async function getMaxMovesHit(username){
    try {      
        const dbConnection = await getDbConnection();

        const user = await userService.getUserByUsername(username)

        const [rows] = await dbConnection.execute(`
        SELECT points FROM moves
        WHERE id_user=${user.id_user}
        `);
    
        dbConnection.end()
        
        return rows[0] ? rows[0].points : null;
      } catch (error) {
        throw error;
      }
}

export {resetMoves, saveNextMove, getExpectedMove,getMaxMovesHit}