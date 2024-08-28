const express=require('express')
const path=require('path')
const mongoose = require('mongoose');
const app=express()
const port=3000
mongoose.connect('mongodb://localhost:27017/myregistration');
const User=require('./models/register.js')


app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'templates')));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, 'templates', 'index.html'))
})
app.get('/register',(req,res)=>{
    res.sendFile(path.join(__dirname, 'templates', 'register.html'))
})
app.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname, 'templates', 'login.html'))
})
app.post("/registration",async(req,res)=>{
    try {
        
        const firstname=req.body.firstname;
        const lastname=req.body.lastname;
        const email=req.body.email;
        const password=req.body.password;
        const confirmPassword=req.body.confirmPassword;
        const phonenumber=req.body.phonenumber;
        if(password===confirmPassword){
            const registerUser=new User({
                firstname:firstname,
                lastname:lastname,
                phonenumber:phonenumber,
                email:email,
                password:password,
                confirmPassword:confirmPassword
            })
            const registeredUser=await registerUser.save();

            res.status(201).sendFile(path.join(__dirname, 'templates', 'output.html'));
        }
        else{
            res.status(400).json({ error: "Password and confirm password didn't match" });

        }
    } catch (error) {
        res.status(404).send(error)
    }
})
app.listen(port,()=>{
    console.log(port)
})