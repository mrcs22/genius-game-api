import getDbConnection from "../database/getDbConnection.js";

async function getUserByUsername(username) {
  try {      
    const dbConnection = await getDbConnection();

    const safeUsername = dbConnection.escape(username).toLocaleLowerCase();
    
    const [rows] = await dbConnection.execute(`
    SELECT * FROM USERS
    WHERE username=${safeUsername}
    `);

    dbConnection.end()
    
    return rows[0] ? rows[0] : null;
  } catch (error) {
    throw error;
  }
}

async function saveUser(username, password) {
    try {      
      const dbConnection = await getDbConnection();
  
      const safeUsername = dbConnection.escape(username).toLocaleLowerCase();
      const safePassword = dbConnection.escape(password);
      
      await dbConnection.execute(`
        INSERT INTO users
        (username, password)
        VALUES
        (${safeUsername}, ${safePassword})
      `);
  
      dbConnection.end()
      
      return true;
    } catch (error) {
      throw error;
    }
  }

export {
    getUserByUsername,saveUser
}