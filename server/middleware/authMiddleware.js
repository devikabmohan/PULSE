// const jwt = require('jsonwebtoken');

// module.exports = function(req,res,next) {
// const token = res.header('Authorization');
// if(!token) return res.status(401).json({error:'Access denied!'})
//     try {
//         const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRETKEY);
//         req.user = decoded;
//         next();
//     } catch (error) {
//         res.status(400).json({error:'Invalid token'});
        
//     }


// }




const jwt = require('jsonwebtoken');
const User = require('../models/user'); // adjust path as needed

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authorization header missing or malformed' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY); // Make sure your .env has JWT_SECRET

    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('Token error:', err.message);
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = auth;
