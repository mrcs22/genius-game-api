import getDbConnection from "../database/getDbConnection.js";
import * as userService from "./userService.js";


async function saveScore(username, points) {
  try {      
    const dbConnection = await getDbConnection();

    const user = await userService.getUserByUsername(username)
    
    await dbConnection.execute(`
    INSERT INTO scores
    (id_user, points)
    VALUES
    (${user.id_user}, ${points})
    `);

    dbConnection.end()
    
    return true;
  } catch (error) {
    throw error;
  }
}

async function getUserScore(username) {
    try {      
      const dbConnection = await getDbConnection();
  
      const user = await userService.getUserByUsername(username)
      
      const [rows] = await dbConnection.execute(`
      SELECT points FROM scores
      WHERE id_user=${user.id_user}
      ORDER BY ts DESC
      `);
  
      dbConnection.end()
      
      return rows[0] ? rows[0].points : null;
    } catch (error) {
      throw error;
    }
  }

export {saveScore, getUserScore}