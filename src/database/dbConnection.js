import "../setup.js"
import mysql from "mysql2"

const pool =  mysql.createPool({
    uri: process.env.DB_URI,
})

const dbConnection = pool.promise()

export default dbConnection



