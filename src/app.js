import express from "express";
import cors from "cors"
import getDbConnection from "./database/getDbConnection.js";
import * as userController from "./controllers/userController.js";

const app = express()
app.use(express.json())
app.use(cors())

app.post("/sign-up", userController.signUp)


export default app