module.exports = (sequelize, Datatype) => {
    const Company = sequelize.define("company", {
        id: {
            type: Datatype.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        company_name: {
            type: Datatype.STRING,
            allowNull: false
        }
    });

    return Company;
};