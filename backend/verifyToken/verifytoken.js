const jwt=require('jsonwebtoken')
const verifytoken=(req,res,next)=>
{    console.log("hello im verification")
    const authheader=req.headers['authorization'];
    if(authheader)
    {     console.log("hi im authorization")
        const token=authheader.split(' ')[1]
        if(token)
        {   console.log("im token")
            try{
                   var verifivation=jwt.verify(token,"secret123")
                   next();
            }
            catch(err){
                res.json({"error":err})
                       
            }
        }
    }
    else
    {
       res.json({message:"authorizarion Header is missing"}) 
    }

}
module.exports=verifytoken;