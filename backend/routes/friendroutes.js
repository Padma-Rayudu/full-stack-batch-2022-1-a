const express =require('express');
const {Userdetail,Friend,Activity} = require('../models');
const db=require("../models/index")
const router =express.Router();
const { body, validationResult } = require('express-validator');
const verifytoken=require('../verifyToken/verifytoken')
router.post("/addfrienddata", body('useremail').isEmail(), body('friendemail').isEmail(),verifytoken,async(req,res)=>{
    const {useremail,friendemail}=req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    else
    {

        try{
            const user=await Userdetail.findOne({where:{email:useremail}})
            const frienduser=await Userdetail.findOne({where:{email:friendemail}})
            if(frienduser)
            {
               const friend=await Friend.create({userid:user.id,friendid:frienduser.id})
               const actdata={
                   userid:user.id,
                   activityname:frienduser.fullname+" Added to Friends List ",
                   time:''+friend.createdAt,
   
               }
               console.log("actdata",actdata)
               const act= await Activity.create(actdata)
               console.log("hiiii im act",act)
               if(act)
               {
                   
               return res.json({message:"success",friend:friend})
               }
               else
               {
                   return res.json({message:"unsuccess"}) 
               }
            }
            else
            {
                return res.json({message:"unsuccess"})
            }
          
       }
       catch(err)
       {
           return res.status(500).json(err)
       }
    }
    
})

router.get("/frienddata/:id",verifytoken,async(req,res)=>{
try{        
             var totaldata=[];
              console.log("paramss",req.params.id);
            await  db.sequelize.query(`select userdetails.id,userdetails.fullname,userdetails.email from userdetails,friends where (friends.friendid=userdetails.id and friends.userid=${req.params.id}) `)
              .then((data)=>totaldata.push(data[0]))
              .catch((err)=>res.send(err))
             await db.sequelize.query(`select userdetails.fullname,userdetails.email,sum(expensemembers.divamount) from userdetails,expensemembers,expenses where (expenses.createdby=${req.params.id} and expenses.id= expensemembers.expenseid and expensemembers.memberid=userdetails.id and expensemembers.settlement=false) group by userdetails.email,userdetails.fullname`)
              .then((data)=>totaldata.push(data[0]))
              .catch((err)=>res.send(err))
            res.send(totaldata)
                     
}
catch(err)
{
    return res.status(500).json(err)
}
})
module.exports=router;