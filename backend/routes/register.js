const express =require('express');
const  {Userdetail,Friend} = require('../models');
const router =express.Router();
const bcrypt = require('bcrypt');
router.post('/', async(req,res)=>{
    const hashPassword=bcrypt.hashSync(req.body.password,5);
    const data=
     {
      fullname:req.body.fullname,
      email:req.body.email,
      phone:req.body.phone,
      password:hashPassword
    }
    console.log("data",data)
    try{ 
        const user=await Userdetail.create(data)
        return res.json({user:user,message:"success"})
      }
    catch(err)
    {
        return  res.status(500).json(err)
    }
})

module.exports=router;
