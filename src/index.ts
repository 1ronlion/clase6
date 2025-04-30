import express from "express";
const app = express()
const PORT = 3000

import { UserRouter } from "./routes/user-router";
import { ChartRouter } from "./routes/chart-router";


//Middleware
app.use(express.json())


//Routes
app.use("/api/users/", UserRouter)
app.use("/api/charts/", ChartRouter)

app.get("/api", (req,res)=> {

    console.log("API")
    res.json("API CONNECTED!")

})



app.listen(PORT, () => console.log("Server running on port:", PORT))

