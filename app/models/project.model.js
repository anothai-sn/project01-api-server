module.exports = (sequelize, Datatype) => {
    const Project = sequelize.define("project", {
        id: {
            type: Datatype.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        project_name: {
            type: Datatype.STRING,
            allowNull: false
        },
    });

    return Project;
};