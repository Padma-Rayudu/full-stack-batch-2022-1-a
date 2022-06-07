const express =require('express');
const {Userdetail,Friend,Expense,ExpenseMember} = require('../models');
const db=require("../models/index")
const router =express.Router();
const verifytoken=require('../verifyToken/verifytoken')
router.post("/addexpense",verifytoken,async(req,res)=>{
    try{
        const data={
            createdby:req.body.createdby,
            amount:req.body.amount,
            description:req.body.tittle
        }
      const expense=await Expense.create(data)
        console.log(expense)
        if(!expense)
        {
              return res.json({message:"unsuccess"})
            
        }
        else
        {
               var divamountt=Math.floor(req.body.amount/req.body.members.length+1)
               console.log(divamountt)
            for(var i=0;i<req.body.members.length;i++)
            {
                var expensememdata={
                    expenseid:expense.id,
                    memberid:req.body.members[i],
                    divamount:divamountt
                }
              var exmem=ExpenseMember.create(expensememdata)
            }
            return res.json({message:"success"})
        }     
    }
      
    catch(err)
    {
        return res.status(500).json(err)
    }
})
router.get('/expensedata/:id',async(req,res)=>{
    try{
        const data=[];
       db.sequelize.query(`select * from expenses where (expenses.createdby=${req.params.id}) `)
       .then((result)=>res.send(result))
       .catch((err)=>res.send(err))
    }
    catch(err)
    {
        res.json({message:err})
    }
})



router.get('/paymentdata/:id',async(req,res)=>{
    try{
    
     db.sequelize.query(` select u.fullname,e.description,em.divamount from userdetails u inner join expenses e on u.id=e.createdby inner join expensemembers em on e.id=em.expenseid and em.memberid=${req.params.id}`)
     .then((re)=>{res.send(re)})
     .catch((err)=>res.send(err))
    }
    catch(err)
    {
        res.json({message:err})
    }
})


module.exports=router;