const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.signup = async(req, res)=>{
    try{
        const{name, email, password}= req.body;
        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({name, email, password: hashed});
        res.status(201).json({message: `user created: ${user}`})
    }
    catch(err){
        res.status(400).json({error: err.message});
    }

}

exports.login = async(req,res)=>{
    
        const {email, password}= req.body;
        const user = await User.findOne({email});
        if(!user) return res.status(404).json({error: "User not found!"});
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch) return res.status(404).json({error:"Invalid credentials!"});
        
            const token = jwt.sign({id:user._id, role: user.role}, process.env.JWT_SECRETKEY);
            res.json({token, user:{id:user._id, name:user.name, role:user.role, }});
    
}