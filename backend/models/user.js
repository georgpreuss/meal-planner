const mongoose = require('mongoose')
const uniqueValidator = require('../../node_modules/mongoose-unique-validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
	username: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true, minLength: 6 },
	resetPasswordToken: { type: String },
	resetPasswordExpires: { type: Date }, // correct format?
	image: { type: String, required: true },
	// utensils: [{ type: String }],
	units: { type: String, required: true }, // e.g. metric or imperial - don't forget validation
	recipesCreated: [{ type: mongoose.Types.ObjectId, ref: 'Recipe' }], // rename recipesCreated?
	recipeCollection: [{ type: mongoose.Types.ObjectId, ref: 'Recipe' }] //
})

// create virtual passwordConfirmation field
userSchema
	.virtual('passwordConfirmation')
	.set(function setPasswordConfirmation(passwordConfirmation) {
		this._passwordConfirmation = passwordConfirmation
	})

// compare password with passwordConfirmation
userSchema.pre('validate', function checkPassword(next) {
	if (
		this.isModified('password') &&
		this.password !== this._passwordConfirmation
	) {
		this.invalidate('passwordConfirmation', 'Passwords do not match')
	}
	next()
})

// encrypt password before saving to database
userSchema.pre('save', function hasPassword(next) {
	if (this.isModified('password')) {
		this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
	}
	next()
})

// compare hashed passwords e.g. during login
userSchema.methods.validatePassword = function validatePassword(password) {
	return bcrypt.compareSync(password, this.password)
}

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)
