const db = require('../models');
const Project = db.project;

exports.findAll = (req, res) => {
    try {
        Project.findAll({
            attributes: ["id", "project_name"]
        }).then((data) => {
            res.status(200).json(data);
        }).catch((err) => {
            res.status(400).json({message: err.meassage})});
    } catch(err) {
        console.log(err);
    };
};

exports.findOne = (req, res) => {
    try {

        Project.findByPk(req.params.id, {
            attributes: ["id", "project_name"]
        })
        .then((data) => {
            res.status(200).json(data);
        }).catch((err) => {
            res.status(400).json({message: err.meassage});
        });
    } catch(err) {
        res.status(400).json({message: err.meassage});
    };
};

exports.create = (req, res) => {
    try {

        if(!req.body.project_name) {
            return res.status(400).json({Message: "Data can't empty!"});
        }

        const projectObj = {
            project_name: req.body.project_name
        }

        Project.create(projectObj).then(data => {
            res.status(200).json({message: "Project created"})
        }).catch(err => {
            res.status(500).json({message: err.meassage});
        }) 
    } catch(err) {
        res.status(400).json({message: err.meassage});
    }
};

exports.update = (req, res) => {
    try {

        if(!req.body.project_name) {
            return res.status(400).json({Message: "Data can't empty!"});
        }   

        const projectObj = {
            project_name: req.body.project_name
        }

        Project.update(projectObj, {
            where: { id: req.params.id }
        }).then(data => {
            res.status(200).json({message: "Project updated"});
        }).catch(err => {
            res.status(500).json({message: err.meassage});
        })
    } catch(err) {
        res.status(400).json({message: err.meassage});
    }
};

exports.delete = (req, res) => {
    try {
        Project.destroy({
            where: { id:req.params.id }
        }).then(data => {
            if(data == 1) {
                res.status(200).json({message: "Project deleted"});
            } else {
                res.status(500).json({message: "Project failed"});
            }
        }).catch(err => {
            res.status(500).json({message: err.meassage});
        })
    } catch(err) {
        res.status(400).json({message: err.meassage});
    }
};