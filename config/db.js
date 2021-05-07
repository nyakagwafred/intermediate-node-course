import mongoose from 'mongoose';

const connectDB = async () => {
	try {
		const conn = await mongoose.connect('mongodb://localhost/userData', {
			useNewUrlParser: true,
			useFindAndModify: false,
			useCreateIndex: true,
			useUnifiedTopology: true,
		});

		console.log(
			`Mongo DB Connected on ${conn.connection.host}`.cyan.underline.bold,
		);
	} catch (err) {
		console.error(`Error: ${err.message}`.red.underline.bold);
		process.exit(1);
	}
};

export default connectDB;
