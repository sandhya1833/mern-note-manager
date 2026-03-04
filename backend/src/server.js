import express from "express"
import dotenv from "dotenv"
import noteRoute from "./routes/noteRoute.js"
import { connectDB } from "../config/db.js"
import cors from "cors"


dotenv.config()

const app = express()
const port = process.env.PORT || 3001;

app.use(cors())
app.use(express.json());
app.use("/notes", noteRoute);

connectDB().then(()=>{
    app.listen(port , ()=>{
    console.log(`http://localhost:${port}/notes`);
})
})

 
