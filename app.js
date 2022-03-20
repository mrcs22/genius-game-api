import express from "express";
import cors from "cors"
import getDbConnection from "./database/getDbConnection.js";

const app = express()
app.use(express.json())
app.use(cors())


export default app