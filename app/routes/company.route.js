
module.exports = (app) => {
    const company = require('../controllers/company.controller');
    const router = require('express').Router();

    router.get('/', company.findAll);
    router.get('/edit-company/:id', company.findOne);
    router.post('/create-company', company.create);
    router.put('/update-company/:id', company.update);
    router.delete('/delete-company/:id', company.delete);

    app.use('/companies', router);
};