import getDbConnection from "./getDbConnection.js";
import fs from "fs"

try {
const queries = fs.readFileSync("./src/database/db.sql").toString().split(";")

const dbConnection = await getDbConnection()

for(const query of queries){
   await dbConnection.execute(query)
}

dbConnection.end()

} catch (error) {
    console.error("Could not create database tables")
    console.error(error.message)
}

