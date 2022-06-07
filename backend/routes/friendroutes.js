const express =require('express');
const {Userdetail,Friend} = require('../models');
const db=require("../models/index")
const router =express.Router();
const verifytoken=require('../verifyToken/verifytoken')
router.post("/addfrienddata",verifytoken,async(req,res)=>{
    const {useremail,friendid}=req.body;
    try{
         const user=await Userdetail.findOne({where:{email:useremail}})
        const friend=await Friend.create({userid:user.id,friendid})
        return res.json({message:"success",friend:friend})
    }
    catch(err)
    {
        return res.status(500).json(err)
    }
})

router.get("/frienddata/:id",verifytoken,async(req,res)=>{
try{        
              console.log("paramss",req.params.id);
              db.sequelize.query(`select userdetails.id,userdetails.fullname,userdetails.email from userdetails,friends where (friends.friendid=userdetails.id and friends.userid=${req.params.id}) `)
              .then((data)=>res.send(data))
              .catch((err)=>res.send(err))

                     
}
catch(err)
{
    return res.status(500).json(err)
}
})
module.exports=router;