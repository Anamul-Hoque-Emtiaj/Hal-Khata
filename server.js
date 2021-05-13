const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const userRouter = require('./routes/userRoute')
const transactionRoutes = require('./routes/transactionRoutes')
const path = require('path')

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/api/users',userRouter)
app.use('/api/transactions',transactionRoutes)

app.use(passport.initialize())
require('./passport')(passport)

if(process.env.NODE_ENV==='production'){
    app.use(express.static('client/build'))
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT? process.env.PORT : 4000
app.listen(PORT,()=>{
    console.log(`Server Running at ${PORT} port`)
    mongoose.connect(`mongodb+srv://${process.env.dbUser}:${process.env.dbPassword}@hal-khata.qf3mg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true},()=>{
        console.log("Database Connected")
    });
})


app.get('/',(req,res)=>{
    res.json({"message": "Welcome!"})
})