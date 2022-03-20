import dbConnection from "./dbConnection.js";
import fs from "fs"

try {
const queries = fs.readFileSync("./src/database/db.sql").toString().split(";")

for(const query of queries){
   await dbConnection.execute(query)
}



} catch (error) {
    console.error("Could not create database tables")
    console.error(error.message)
}

