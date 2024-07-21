const express = require("express")
const db = require("./db")
const employeePersonalDetailsRouter = require("./router/employeeRouter.js")
const { employeePersonalCollection } = require("./controller/employeePersonalDetails.js")
require("dotenv").config()

const app = express()

app.use(express.json())

db()
.then(async()=>
    {
        await employeePersonalCollection()
    })
.catch((err)=>console.log("Database connection error", err))

app.use("/employee", employeePersonalDetailsRouter);

app.listen(process.env.PORT,()=>console.log("Port running"))