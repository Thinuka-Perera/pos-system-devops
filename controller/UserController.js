const User =  require('../model/UserSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECERET;

const signup = async (req, resp) => {

    try{

        const{fullName, email, passwordHash} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser) return resp.status(409).json({'message':'User Already exists'});

        const hashedPassword = await bcrypt.hash(passwordHash,10);
        const savedUser =  await User.create({fullName,email,passwordHash});
        resp.status(201).json({'message':'User Created Successfully',data:savedUser});

    }catch (e) {
        resp.status(500).json({'message': 'Signup Error',error:e});
    }

}


const login = async (req,resp) => {

    try{

        const {email,passwordHash} = req.body;
        const existingUser = await User.findOne({email});
        if(!existingUser) return resp.status(401).json({'message':'User Not Found'});

        const isPasswordValid =  await bcrypt.compare(passwordHash, existingUser.passwordHash);
        if(!isPasswordValid) return resp.status(401).json({'message':'Invalid Credentials'});

        const token = jwt.sign({email:existingUser.email},JWT_SECRET,{expiresIn:'10h'});
        resp.status(200).json({'message':'Success',token:token});

    }catch (e) {
        resp.status(500).json({'message': 'Login Error',error:e});
    }

}


module.exports={signup,login};