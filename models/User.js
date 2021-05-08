import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

//Age generator function
const ageGenerator = () => {
	return Math.floor(Math.random() * 100);
};

const UserSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		isAdmin: { type: Boolean, required: true, default: false },
		age: { type: Number, required: true, default: ageGenerator() },
	},
	{
		timestamps: { createdAt: 'created_on', updatedAt: 'updated_on' },
	},
);

UserSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next();
	}

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', UserSchema);

export default User;
