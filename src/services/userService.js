import getDbConnection from "../database/getDbConnection.js";

async function getUserByUsername(username) {
  try {      
    const dbConnection = await getDbConnection();

    const safeUsername = dbConnection.escape(username);
    
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
