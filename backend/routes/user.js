const express =require('express');
const bcrypt = require('bcrypt');
const  {Userdetail} = require('../models');
const db=require("../models/index")
const verifytoken=require('../verifyToken/verifytoken')
const router =express.Router();
router.post('/checkuser',async(req,res)=>{
    try{   console.log("im check user")
         

          const user=await Userdetail.findOne({
            where: {
              email:req.body.email, 
            }
          })
          if(!user)
          {      
                 res.json({message:"user not found"})
          }
          else
          {
           
                    res.status(200).json({email:req.body.email,message:"success"})
          }
    }
    catch(err){
           res.status(404).json({message:err})
    }

})

router.post('/resetpassword',async(req,res)=>{
   const hashpassword=bcrypt.hashSync(req.body.password,5)
    try{
       const emailuser= Userdetail.update({password:hashpassword},{where:{email:req.body.email}})
       console.log(emailuser)
       res.json({message:"success",emailuser:emailuser})
    }
    catch(err)
    {
            res.json({message:err})
    }
})
router.get('/userdata',verifytoken,async(req,res)=>{
    try{
        const userdata= await Userdetail.findAll()
        res.json({userdata,message:"success"})
    }
    catch(err)
    {
        res.json({message:err})
    }
})
router.get('/useractivities/:id',verifytoken,async(req,res)=>{
    try{
        console.log("helloooo im calleddddd")
        db.sequelize.query(`select * from activities where activities.userid=${req.params.id}`)
        .then((result)=>res.send(result))
        .catch((err)=>res.send(err))
    }
    catch(err)
    {
        return res.status(500).json(err)   
    }
})


module.exports=router;