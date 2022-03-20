import express from "express";
import cors from "cors"
import getDbConnection from "./database/getDbConnection.js";
import * as userController from "./controllers/userController.js";
import * as movesController from "./controllers/movesController.js";

const app = express()
app.use(express.json())
app.use(cors())

app.post("/sign-up", userController.signUp)
app.post("/sign-in", userController.signIn)

app.post("/moves/:move", movesController.doMove)
app.get("/moves", movesController.getNextMove)



export default app