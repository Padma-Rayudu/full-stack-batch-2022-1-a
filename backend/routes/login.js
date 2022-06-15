const express = require('express');
const { Userdetail, Friend } = require('../models');
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const client = require('twilio')('ACcfb33e8c2fdd14884491f6f2e0d16311', '11aa5676fd48db859c6c96b3d2411bf4');
router.post('/otp', body('email').isEmail(), body('password').isLength({ min: 2 }),body('otp').isLength({min:6,max:6}),async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    else{
          
        try {
            const user = await Userdetail.findOne({
                where: {
                    email: req.body.email,
                }
            })
            if (!user) {
                res.json({ message: 'user not found' })
            }
            else {
    
                const payload = { email: req.body.email, password: req.body.password };
                const token = jwt.sign(payload, "secret123")
               
                client.verify
                    .services('VAf524a0c5c1a175e7124becc50e3f29e2')
                    .verificationChecks
                    .create({
                        to: "+91" + user.dataValues.phone,
                        code: req.body.otp
    
                    }).then(data => {
                        console.log("dataaaa", data)
                        if (data.valid) {
                            res.json({ token: token, msg: "success", email: req.body.email, id: user.id, username: user.fullname, optres: data })
                        }
                        else {
                            res.json({ message: "unsuccess" })
                        }
                    }
                    )
                    .catch(err => { res.send({ message: err }) })
    
            }
    
    
        }
        catch (err) {
            res.status(500).send({ message: err })
        }
    }
   
})
router.post("/login",body('email').isEmail(), body('password').isLength({ min: 2 }), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    else
    {
        try {
            const user = await Userdetail.findOne({
                where: {
                    email: req.body.email,
                }
            })
            if (!user) {
                res.json({ message: 'user not found' })
            }
            else {
                let userpassword = user.dataValues.password;
                const isUserPassword = bcrypt.compareSync(req.body.password, userpassword);
    
                if (isUserPassword) {
    
                    client.verify
                        .services('VAf524a0c5c1a175e7124becc50e3f29e2')
                        .verifications
                        .create({
                            to: "+91" + user.dataValues.phone,
                            channel: 'sms'
    
                        }).then(data => res.status(200).send({ message: "success", data }))
                }
                else {
                    res.json({ message: "Invalid Password" })
                }
    
            }
    
        }
        catch {
            res.status(404).json({ message: "user not found" })
        }

    }
   
})





module.exports = router;