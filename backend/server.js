const express = require('express')
var cron = require('node-cron');
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
const groupRouter=require('./routes/grouproutes')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
const {sequelize}= require('./models')
require('dotenv').config()
const client = require('twilio')(process.env.accountSID,process.env.authToken);
const  {Userdetail} = require('./models');

async function userdata(){
    const userdetailsdata=await Userdetail.findAll()
     userdetailsdata.map((user)=>{
        client.messages 
      .create({ 
         body: 'Greatings of the from splitwise application ',  
         messagingServiceSid:process.env.messagingServiceSid,      
         to: '+91'+user.dataValues.phone 
       }) 
      .then(message => console.log(message.sid)) 
      .done();

      })
    
}
      
cron.schedule('15 10 * */1 1', () => {
    
    userdata(); 
});




 app.use('/signup',registerRouter)
 app.use('/login',loginRouter)
 app.use('/friend',friendrouter)
 app.use('/user',userRouter)
 app.use('/expense',expenseRouter)
 app.use('/group',groupRouter)

app.listen(PORT,async()=>{
    console.log("Server running on 5000..");
    await sequelize.authenticate()
});