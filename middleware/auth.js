var jwt = require('jsonwebtoken');
const EmpData = require('../src/models/emp');

const auth = async (req,res,next) => {
    try{
        const token = req.cookies.JWT_TOKEN;
        const verifyUser = jwt.verify(token, process.env.TOKEN_KEY);
        // console.log(verifyUser);
        const user = await EmpData.findOne(verifyUser._id);
        console.log(user);
        next();
    }catch(error){
        res.status(401).send(error);
    }
}

module.exports = auth;