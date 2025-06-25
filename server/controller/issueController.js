const Issue = require('../models/issue');

exports.createIssue = async(req,res)=>{
    if(!req.body.title || !req.body.description || !req.body.location){
        return res.status(400).json({message: 'Please provide all required fields'});
    }
    try{
    const {title, description, location} = req.body;

    const newIssue = new Issue({
        title,
        description,
        location,
        imageURL: req.file?.filename,
        createdBy: req.user._id
    })
    await newIssue.save();
    res.status(201).json(newIssue)
}
    catch(err){
        console.error("Error creating issue", err);
        res.status(500).json({message: 'Server Error'});
    }
};

exports.getAllIssues = async(req,res)=>{
    try{
    const issues = await Issue.find().populate('createdBy', 'name');
    res.json(issues);
    }
    catch(err){
        console.error("Error fetching issues",err);
        res.status(500).json({message: 'Server Error'});
    }
}

exports.getMyIssues = async(req,res)=>{
    try{
    const user = req.user._id;
    const myIssues = await Issue.find({createdBy: user}).populate('createdBy', 'name');
    res.json(myIssues);
    }
    catch(err){
        console.error("Error fetching user's issues", err);
        res.status(500).json({message: 'Server Error'});
    }
}



exports.updateIssueStatus = async(req, res)=>{
    try{
    const {id} = req.params;
    const {status} = req.body;
    const issue = await Issue.findByIdAndUpdate(id, {status},{new:true} );
    res.json(issue);
    }
    catch(err){
        console.error("Error updating issue status", err);
        res.status(500).json({message: 'Server Error'});
    }
};