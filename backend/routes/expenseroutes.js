const express =require('express');
const {Expense,ExpenseMember,Activity} = require('../models');
const db=require("../models/index")
const router =express.Router();
const { body, validationResult } = require('express-validator');
const verifytoken=require('../verifyToken/verifytoken')
router.post("/addexpense",body('createdby').isNumeric(), body('amount').isNumeric(),verifytoken,async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    else
    {

        try{
            const data={
                createdby:req.body.createdby,
                amount:req.body.amount,
                description:req.body.tittle,
                groupid:req.body.gid
            }
          const expense=await Expense.create(data)
            console.log(expense)
            if(!expense)
            {
                  return res.json({message:"unsuccess"})
                
            }
            else
            {
                const actdata={
                    userid:req.body.createdby,
                    activityname:req.body.tittle+" Expense Created",
                    time:''+expense.createdAt,
    
                }
                
                const act= await Activity.create(actdata)
    
                   var divamountt=Math.floor(req.body.amount/(req.body.members.length+1))
                   console.log(divamountt)
                for(var i=0;i<req.body.members.length;i++)
                {
                    var expensememdata={
                        expenseid:expense.id,
                        memberid:req.body.members[i],
                        divamount:divamountt,
                        groupid:req.body.gid
                    }
                  var exmem= await ExpenseMember.create(expensememdata)
                }
               
                if(act)
                {   console.log("activity createdddddd")
                    return res.json({message:"success"})
                }
                else
                {
                    return res.json({message:"unsuccess"})
                }
    
               
            }     
        }
          
        catch(err)
        {
            return res.status(500).json(err)
        }

    }
    
})
router.get('/expensedata/:id',verifytoken,async(req,res)=>{
    try{
      
       db.sequelize.query(`select * from expenses where expenses.createdby=${req.params.id}`)
       .then((result)=>res.send(result))
       .catch((err)=>res.send(err))
    }
    catch(err)
    {
        return res.status(500).json(err)   
    }
})

router.get('/singleexpense/:id',verifytoken,async(req,res)=>{
    console.log("im called..")
    try{
           db.sequelize.query(`select u.fullname as memname,k.fullname as investedbyname,k.created,k.divamount,k.amount,k.description from userdetails u inner join (select u.fullname,e.description,em.divamount,e.amount,em.memberid as name,e."createdAt" as created from userdetails u inner join expenses e on u.id=e.createdby inner join expensemembers em on e.id=em.expenseid and e.id=${req.params.id}) k on u.id=k.name`)
           .then((data)=>res.send(data))
           .catch((err)=>res.send(err))
        }

    catch(err){
        return res.status(500).json(err)           
    }
})
router.post('/settleexpense',verifytoken,async(req,res)=>{
    try{
         
          const settlementupdate=await ExpenseMember.update({settlement:true},
           {
               where:{memberid:req.body.userid ,
                 expenseid:req.body.exid}
                })
                   
                console.log("settlementupdate",settlementupdate)
               if(settlementupdate)
               {
                const actdata={
                    userid:req.body.userid,
                    activityname:"one Debt settled",
                    time:''+ new Date(),
    
                }
                console.log("settlementupdate",actdata)
                const act= await Activity.create(actdata)
                if(act)
                {
                    res.json({message:"success"})
                }
                else
                {
                   res.json({message:"unsuccess"})
                }
               }
               else
               {
                   res.json({message:"unsuccess"})
               }
        
        
    }
    catch(err)
    {
         res.status(500).json(err)
    }
})

router.get('/paymentdata/:id',verifytoken,async(req,res)=>{
    try{
    
     db.sequelize.query(` select u.fullname,e.description,em.divamount,em.settlement,e.id as id from userdetails u inner join expenses e on u.id=e.createdby inner join expensemembers em on e.id=em.expenseid and em.memberid=${req.params.id}`)
     .then((re)=>{res.send(re)})
     .catch((err)=>res.send(err))
    }
    catch(err)
    {
        res.json({message:err})
    }
})


module.exports=router;