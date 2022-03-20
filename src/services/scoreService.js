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

export {saveScore}