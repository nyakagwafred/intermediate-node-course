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
	User.create(
		{
			name: req.body.newData.name,
			email: req.body.newData.email,
			password: req.body.newData.password,
		},
		(err, data) => {
			if (err) {
				res.json({ success: false, message: err });
			} else if (!data) {
				res.json({ success: false, message: 'Not Found' });
			} else {
				res.json({ success: true, data: data });
			}
		},
	);
});

app
	//Find User by ID
	.route('/users/:id')
	.get((req, res) => {
		User.findById(req.params.id, (err, data) => {
			if (err) {
				res.json({ success: false, message: err });
			} else if (!data) {
				res.json({ success: false, message: 'Not Found' });
			} else {
				res.json({ success: true, data: data });
			}
		});
	})
	// Update User
	.put((req, res) => {
		User.findByIdAndUpdate(
			req.params.id,
			{
				name: req.body.newData.name,
				email: req.body.newData.email,
				password: req.body.newData.password,
			},
			{
				new: true,
			},
			(err, data) => {
				if (err) {
					res.json({
						success: false,
						message: err,
					});
				} else if (!data) {
					res.json({
						success: false,
						message: 'Not Found',
					});
				} else {
					res.json({
						success: true,
						data: data,
					});
				}
			},
		);
	})
	// DELETE
	.delete((req, res) => {
		// User.findByIdAndDelete()
	});
