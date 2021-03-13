const express = require('express');
const router = new express.Router();
const EmpData = require('../src/models/emp');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

const createToken = (user) => {
    return jwt.sign({user}, process.env.TOKEN_KEY);
}


router.get('/', (req,res) => {
    res.render('index');
});

router.get('/about', auth, (req,res) => {
    // console.log('Cookies: ', req.cookies.JWT_TOKEN);
    res.render('about');
});

router.get('/register', (req,res) => {
    res.render('register');
});

router.post('/register', async(req,res) => {
    try{
        const {firstName, lastName, email, phone, age, password, confirmPassword} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 10);
        if(password === confirmPassword){
            const registerEmployee = new EmpData({
                firstName,
                lastName,
                email,
                phone,
                age,
                password: hashedPassword,
                confirmPassword: hashedConfirmPassword
            });
            const user = await registerEmployee.save();
            const token = createToken(user);
            res.cookie("JWT_TOKEN", token, {
                maxAge: 1000 * 60 * 60,
                httpOnly: true
            });
            res.status(201).render('index');
        }else{
            res.send('password are not matching...');
        }
    }catch(e){
        res.status(500).send(e);
    }
});


router.get('/login', (req,res) => {
    res.render('login');
});

router.post('/login', async(req,res) => {
    try{
        const {email, password} = req.body;
        const userData = await EmpData.findOne({email: email});
        const isMatch = await bcrypt.compare(password, userData.password);
        // console.log(userData);
        const token = createToken(userData);
        // console.log(token);
        res.cookie("JWT_TOKEN", token, {
                maxAge: 1000 * 60 * 60,
                httpOnly: true
        });
        if(isMatch){
            res.status(201).render('index');
        }else{
            res.send('Invalid password');
        }
    }catch(e){
        res.status(500).send(e);
    }
});

module.exports=router;