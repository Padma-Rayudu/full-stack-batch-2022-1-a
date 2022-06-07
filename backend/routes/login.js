const express =require('express');
const  {Userdetail,Friend} = require('../models');
const jwt=require('jsonwebtoken');
const router =express.Router();
const bcrypt = require('bcrypt');
router.post("/" ,async(req,res)=>{
    try{
        const user=await Userdetail.findOne({
            where: {
              email:req.body.email, 
            }
          })
         // console.log("userdeatails...",user)
          if(!user)
          {
              res.json({message:'not a valid user'})
          }
          else
          {
              let userpassword=user.dataValues.password;
              const isUserPassword=bcrypt.compareSync(req.body.password,userpassword);
             // console.log("flaggg...",isUserPassword)
              if(isUserPassword)
              {
                  const payload={email:req.body.email,password:req.body.password};
                  const token=jwt.sign(payload,"secret123")
                  res.send({token:token,msg:"success",email:req.body.email,id:user.id})
              }
              else{
                  res.json({message:"Invalid Password"})
              }
   
        }

    }
    catch{
               res.status(404).json({message:"user not found"})
    }
})




module.exports=router;