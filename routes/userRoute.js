const mongoose = require ('mongoose');
const express = require ('express')
const router = express.Router() 
const User = require ('../models/userModel');
const { response } = require('express');


router.post("/register", (req, res)=>{

    User.find({email : req.body.email} , (err , docs)=>{
        if(docs.length > 0)
        {
            return res.status(400).json({ message : 'Something wrong !'})
        }
        else 
        {
            const newuser = new User({
                username: req.body.username ,
                email: req.body.email ,
                password: req.body.password
        
            })
            newuser.save(err =>{
                if (!err)
                   {
                       res.send('User Registration Success!')
                      
                   }
                   else
                   {
                           return res.status(400).json({ message : 'Something wrong !'})
                   }
            })

        }

        if (err)
    {
       return res.status(400).json({ message : 'Something wrong !'})
    }

    })

    
});


router.post("/login" , (req, res)=>{

 User.find({email : req.body.email , password : req.body.password}, (err, docs)=> {

    if (docs.length>0)
    {
        const user = {
            username : docs[0].username,
            _id: docs[0]._id,
            email: docs[0].email,
        }
        res.send(user)
    }
    
    else{
        return res.status(400).json({ message : 'Invalid user informations!'})
    }
 }) 

});


router.get("/getallusers" , (req, res) =>{

    User.find({}, (err, docs)=>{
        if(err){
            return res.status(400).json({ message : 'Something wrong !'})
        }
        else{
             res.send(docs)
        }
    })

})

router.post("/deleteuser" , (req, res) =>{

    User.findByIdAndRemove(req.body.userid , (err)=>{
        if(err){
            return res.status(400).json({ message : 'Something wrong !'})
        }
        else{
             res.send("User Deleted Successfully")
        }
    })

})

module.exports = router;