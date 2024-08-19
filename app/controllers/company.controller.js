const db = require('../models');
const Company = db.company;

exports.findAll = (req, res) => {
    try {
        Company.findAll({
            attributes: ["id", "company_name"]
        })
        .then((data) => {
            res.status(200).json(data);
        }).catch((err) => {
            res.status(400).json({message: err.meassage})});
    } catch(err) {
        console.log(err);
    };
};

exports.findOne = (req, res) => {
    try {

        Company.findByPk(req.params.id, {
            attributes: ["id", "company_name"]
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

        if(!req.body.company_name) {
            return res.status(400).json({Message: "Data can't empty!"});
        }

        const companyObj = {
            company_name: req.body.company_name,
        }

        Company.create(companyObj).then(data => {
            res.status(200).json({message: "Company created"})
        }).catch(err => {
            res.status(500).json({message: err.meassage});
        }) 
    } catch(err) {
        res.status(400).json({message: err.meassage});
    }
};

exports.update = (req, res) => {
    try {

        if(!req.body.company_name) {
            return res.status(400).json({Message: "Data can't empty!"});
        }   

        const companyObj = {
            company_name: req.body.company_name
        }

        Company.update(companyObj, {
            where: { id: req.params.id }
        }).then(data => {
            res.status(200).json({message: "Company updated"});
        }).catch(err => {
            res.status(500).json({message: err.meassage});
        })
    } catch(err) {
        res.status(400).json({message: err.meassage});
    }
};

exports.delete = (req, res) => {
    try {

        Company.destroy({
            where: { id:req.params.id }
        }).then(data => {
            if(data == 1) {
                res.status(200).json({message: "Company deleted"});
            } else {
                res.status(500).json({message: "Company failed"});
            }
        }).catch(err => {
            res.status(500).json({message: err.meassage});
        })
    } catch(err) {
        res.status(400).json({message: err.meassage});
    }
};