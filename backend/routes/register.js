const express =require('express');
const  {Userdetail,Friend} = require('../models');
const router =express.Router();
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
router.post('/', body('email').isEmail(), body('password').isLength({ min: 2 }), async(req,res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  else
  {
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
  }
    
})

module.exports=router;
