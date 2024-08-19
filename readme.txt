const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use('/', (req ,res) => {
	res.json({message: "Hello, World"});
}

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
}

