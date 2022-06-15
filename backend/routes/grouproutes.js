const express =require('express');
const { body, validationResult  } = require('express-validator');
const {Group,GroupMember,Activity} = require('../models');
const db=require("../models/index")

const router =express.Router();
const verifytoken=require('../verifyToken/verifytoken')
router.post("/addgroupdata",body('createdby').isNumeric(),body('gmembers').isArray({min:1}),verifytoken,async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    else
    {
        try{
            console.log("im calleddd",req.body)
            const data={
             createdby:req.body.createdby,
             name:req.body.groupname
           
         }
       const group=await Group.create(data)
         console.log(group)
         if(!group)
         {
               return res.json({message:"unsuccess"})
             
         }
         else
         {
             const actdata={
                 userid:req.body.createdby,
                 activityname:req.body.groupname+" Created ",
                 time:''+group.createdAt,
 
             }

             const act= await Activity.create(actdata)
             for(var i=0;i<req.body.gmembers.length;i++)
             {
                 var memdata={
                     groupid:group.id,
                     memberid:req.body.gmembers[i],
                  
                 }
               var exmem=GroupMember.create(memdata)
             }
           
             if(act)
             {
                 
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
router.get('/getgroups/:id',verifytoken,async(req,res)=>{
    try{
        var refinedata=[];
        db.sequelize.query(`select userdetails.id,userdetails.fullname,userdetails.email,userdetails.phone,l.name,l.groupid from userdetails inner join (select groupmembers.memberid,k.name,k.groupid from groupmembers  left outer join (select groups.name,groups.id as groupid from groups,groupmembers where groups.id=groupmembers.groupid and groupmembers.memberid=${req.params.id} or groups.createdby=${req.params.id} group by groups.id)k on groupmembers.groupid=k.groupid) l on userdetails.id=l.memberid`)
        .then((result)=>{
        var groupids=[]
        var groupnames=[]
          result[0].map((r)=>{
            if(!groupids.includes(r.groupid )&&!groupnames.includes(r.name))
            {  
                groupids.push(r.groupid)
                groupnames.push(r.name)
            }
          })
         refinedata.push(result[0])
         refinedata.push(groupids)
         refinedata.push(groupnames)
         res.send(refinedata)
       
        })
        .catch((err)=>res.send(err))
    }
    catch(err)
    {
        return res.status(500).json(err)    
    }
})


module.exports=router;