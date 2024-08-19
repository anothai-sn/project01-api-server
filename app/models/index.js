const config = require('../config/db');

const Datatype = require('sequelize');
const sequelize = new Datatype(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};

db.Datatype = Datatype;
db.sequelize = sequelize;

db.employee = require('../models/employee.model')(sequelize, Datatype);
db.company = require('../models/company.model')(sequelize, Datatype);
db.project = require('../models/project.model')(sequelize, Datatype);
db.employee_project = require('../models/employee_project.model')(sequelize, Datatype);

// One to many
db.company.hasMany(db.employee, {
    onDelete: 'CASCADE'
});
db.employee.belongsTo(db.company);

// Many to Many
db.employee.belongsToMany(db.project, {
    through: "employee_project",
    onDelete: 'CASCADE'
});
db.project.belongsToMany(db.employee, {
    through: "employee_project",
    onDelete: 'CASCADE'
});

module.exports = db;