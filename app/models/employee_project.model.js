module.exports = (sequelize, Datatype) => {
    const db = require('./index');
    const Employee_Project = sequelize.define("employee_project", {
        employeeId: {
            type: Datatype.INTEGER,
            references: {
                model: db.employee,
                key: 'id'
            },
            allowNull: false
        },
        projectId: {
            type: Datatype.INTEGER,
            references: {
                model: db.project,
                key: 'id'
            },
            allowNull: false
        }
    });

    return Employee_Project;
};