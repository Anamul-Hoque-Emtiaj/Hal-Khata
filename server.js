const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const PORT = process.env.PORT? process.env.PORT : 4000
app.listen(PORT,()=>{
    console.log('Server is running at ${PORT}')
    mongoose.connect('mongodb://localhost/hal-khata', {useNewUrlParser: true, useUnifiedTopology: true},()=>{
        console.log("Database Connected")
    });
})


app.get('/',(req,res)=>{
    res.json({"message": "Welcome!"})
})