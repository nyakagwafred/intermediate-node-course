import express from 'express';
import bodyParser from 'body-parser';
import chalk from 'chalk';
import User from './models/User.js';
import connectDB from './config/db.js';
import colors from 'colors';

const port = 8000;
const app = express();

connectDB();

app.use(bodyParser.json());

app.listen(port, () => {
	try {
		console.log(chalk.yellow.inverse.bold(`server is on port:${port}`));
	} catch (err) {
		console.log(err);
	}
});

// CREATE
app.post('/users', (req, res) => {
	// User.create()
});

app
	.route('/users/:id')
	// READ
	.get((req, res) => {
		// User.findById()
	})
	// UPDATE
	.put((req, res) => {
		// User.findByIdAndUpdate()
	})
	// DELETE
	.delete((req, res) => {
		// User.findByIdAndDelete()
	});
