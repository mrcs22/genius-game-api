import dbConnection from "../database/dbConnection.js";
import * as userService from "./userService.js";


async function saveScore(username, points) {
  try {      
    
    const user = await userService.getUserByUsername(username)
    
    await dbConnection.execute(`
    INSERT INTO scores
    (id_user, points)
    VALUES
    (${user.id_user}, ${points})
    `);

    
    
    return true;
  } catch (error) {
    throw error;
  }
}

async function getUserScore(username) {
    try {      
      
      const user = await userService.getUserByUsername(username)
      
      const [rows] = await dbConnection.execute(`
      SELECT points FROM scores
      WHERE id_user=${user.id_user}
      ORDER BY ts DESC
      `);
  
      
      
      return rows[0] ? rows[0].points : null;
    } catch (error) {
      throw error;
    }
  }

  async function getTopScores() {
    try {      
         
      const [rows] = await dbConnection.execute(`
      SELECT username, points, ts as date FROM scores
      JOIN users on scores.id_user=users.id_user
      ORDER BY points DESC
      LIMIT 5
      `);
  
      
      
      return rows;
    } catch (error) {
      throw error;
    }
  }
export {saveScore, getUserScore,getTopScores}