import express from 'express';
import bodyParser from 'body-parser';
import chalk from 'chalk';
import connectDB from './config/db.js';
import colors from 'colors';
import userRoutes from './routes/userRoutes.js';
import dotenv from 'dotenv';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import accessLogStream from './utils/logger.js';
import morgan from 'morgan';

const port = process.env.PORT || 8000;
const app = express();

//Connect to MongoDB on Localhost
connectDB();

app.use(express.json());

app.listen(port, () => {
	try {
		console.log(`server is on port:${port}`.yellow.inverse.bold);
	} catch (err) {
		console.log(err);
	}
});
app.use(morgan('combined', { stream: accessLogStream }));
app.use('/api/users', userRoutes);
app.use(errorHandler);
