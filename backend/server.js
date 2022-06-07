const express = require('express')
const PORT=5000;
const app=express();
const bodyParser=require('body-parser')
const Cors=require('cors')
app.use(Cors())
app.use(express.json())
const registerRouter=require('./routes/register')
const loginRouter=require('./routes/login')
const friendrouter=require('./routes/friendroutes')
const userRouter=require('./routes/user')
const expenseRouter=require('./routes/expenseroutes')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
const {sequelize}= require('./models')


 app.use('/signup',registerRouter)
 app.use('/login',loginRouter)
 app.use('/friend',friendrouter)
 app.use('/user',userRouter)
 app.use('/expense',expenseRouter)

app.listen(PORT,async()=>{
    console.log("Server running on 5000..");
    await sequelize.authenticate()
});