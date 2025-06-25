// const User = require('../models/user');

exports.getUserProfile = async (req, res) => {
    try{
        if(!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        res.json(req.user);
    }
    catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}