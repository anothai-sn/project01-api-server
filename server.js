const express = require('express');
const app = express();
require('dotenv').config
const PORT = process.env.PORT || 5000;

const cors = require('cors');
var corsOption = {
    origin: 'http://localhost:3000',
};
app.use(cors(corsOption));

app.use(express.json());
app.use(express.urlencoded({extended: false}))

// const app = require('express');
// const PORT = 8080;

app.get('/', (req, res) => {
    res.send("Hello, World!");
})

// app.get('/about', (req, res) => {
//     res.send("About");
// })

const db = require('./app/models');
db.sequelize.sync({force: false}).then(() => {
    console.log(`Database is syncing...`);
});

require('./app/routes/employee.route')(app);
require('./app/routes/company.route')(app);
require('./app/routes/project.route')(app);

app.listen(PORT, () => {
    console.log(`Server is runing on port ${PORT}`);
});