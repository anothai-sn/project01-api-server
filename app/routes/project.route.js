
module.exports = (app) => {
    const project = require('../controllers/project.controller');
    const router = require('express').Router();

    router.get('/', project.findAll);
    router.get('/edit-project/:id', project.findOne);
    router.post('/create-project', project.create);
    router.put('/update-project/:id', project.update);
    router.delete('/delete-project/:id', project.delete);

    app.use('/projects', router);
};
