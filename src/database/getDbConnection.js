import "../setup.js"
import mysql from "mysql2/promise"
import bluebird from "bluebird"

export default async function getDbConnection(){
    const connection = await mysql.createConnection({
        uri: process.env.db_url,
        Promise: bluebird
    })

    return connection
}


