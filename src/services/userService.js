import dbConnection from "../database/dbConnection.js";
import * as movesService from "./movesService.js";

async function getUserByUsername(username) {
  try {      
    
    const safeUsername = dbConnection.escape(username).toLocaleLowerCase();
    
    const [rows] = await dbConnection.execute(`
    SELECT * FROM USERS
    WHERE username=${safeUsername}
    `);

    
    
    return rows[0] ? rows[0] : null;
  } catch (error) {
    throw error;
  }
}

async function saveUser(username, password) {
    try {      
        
      const safeUsername = dbConnection.escape(username).toLocaleLowerCase();
      
      
      await dbConnection.execute(`
        INSERT INTO users
        (username, password)
        VALUES
        (${safeUsername}, '${password}')
      `);
  
      
      
      return true;
    } catch (error) {
      throw error;
    }
  }

export {
    getUserByUsername,saveUser
}