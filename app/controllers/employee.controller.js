const db = require('../models');
const Employee = db.employee;
const Company = db.company;
const Project = db.project;
const Employee_Project = db.employee_project;

exports.findAll = (req, res) => {
    try {
        Employee.findAll({
            attributes: ["id", "name", "position"],
            include: [{
                model: Company,
                attributes: ["company_name"]
            },{
                model: Project,
                attributes: ["project_name"]
            }]
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

        Employee.findByPk(req.params.id, {
            attributes: ["id", "name", "position"],
            include: [{
                model: Company,
                attributes: ["company_name"]
            },{
                model: Project,
                attributes: ["project_name"]
            }]
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

        if(!req.body.name || !req.body.position) {
            return res.status(400).json({Message: "Data can't empty!"});
        }

        const employeeObj = {
            name: req.body.name,
            position: req.body.position,
            companyId: req.body.companyId,
        }

        Employee.create(employeeObj).then(
            res.status(200).json({message: "Employee created"})
        ).catch(err => {
            res.status(500).json({message: err.meassage});
        }) 
    } catch(err) {
        res.status(400).json({message: err.meassage});
    }
};

exports.addEmployeeToProject = (req, res) => {
    try {

        if(!req.body.employeeId || !req.body.projectId) {
            return res.status(400).json({Message: "Data can't empty!"});
        }

        const junctionAttributes = {
            employeeId: req.body.employeeId,
            projectId: req.body.projectId
        }

        Employee_Project.create(junctionAttributes)
        .then(data => {
            res.status(200).json({message: "Employee_Projcet created"})
        }).catch(err => {
            res.status(500).json({message: err.meassage});
        }) 
    } catch(err) {
        res.status(400).json({message: err.meassage});
    }
}

exports.update = (req, res) => {
    try {

        if(!req.body.name || !req.body.position) {
            return res.status(400).json({Message: "Data can't empty!"});
        }   

        const employeeObj = {
            name: req.body.name,
            position: req.body.position,
            companyId: req.body.companyId
        }

        Employee.update(employeeObj, {
            where: { id: req.params.id }
        }).then(data => {

            res.status(200).json({message: "Employee updated"});
        }).catch(err => {
            res.status(500).json({message: err.meassage});
        })
    } catch(err) {
        res.status(400).json({message: err.meassage});
    }
};

exports.delete = (req, res) => {
    try {
        Employee.destroy({
            where: { id:req.params.id }
        }).then(data => {
            if(data == 1) {
                res.status(200).json({message: "Employee deleted"});
            } else {
                res.status(500).json({message: "Employee failed"});
            }
        }).catch(err => {
            res.status(500).json({message: err.meassage});
        })
    } catch(err) {
        res.status(400).json({message: err.meassage});
    }
};