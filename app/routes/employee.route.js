
module.exports = (app) => {
    const employee = require('../controllers/employee.controller');
    const router = require('express').Router();

    router.get('/', employee.findAll);
    router.get('/edit-employee/:id', employee.findOne);
    router.post('/create-employee', employee.create);
    router.post('/create-employee-project', employee.addEmployeeToProject)
    router.put('/update-employee/:id', employee.update);
    router.delete('/delete-employee/:id', employee.delete);

    app.use('/employees', router);
};