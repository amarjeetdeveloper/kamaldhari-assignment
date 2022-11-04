const express = require("express")
const mongoose = require("mongoose")
const app = express()
const route = require("./routes/route")

app.use(express.json())


mongoose.connect("mongodb+srv://amarjeet:Wu8hL1aMTYj6yhW5@cluster0.s0q4xiw.mongodb.net/test",{
    useNewUrlParser:true
})
.then( ()=> console.log("mongoDb is Connected"))
.catch(err => console.log(err))


app.use("/", route)


const PORT = process.env.PORT || 3000

app.listen( PORT, console.log(`amarjeet app running on ${PORT}`))