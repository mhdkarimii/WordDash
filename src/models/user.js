const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function (value) {
                return validator.isStrongPassword(value, {
                    minLength: 8,
                    minLowercase: 0,
                    minUppercase: 0,
                    minNumbers: 1,
                    minSymbols: 0
                });
            },
            message: 'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one number.'
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function (value) {
                return validator.isEmail(value)
            }
        }
    }
})

userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})


const User = mongoose.model('User', userSchema)



module.exports = User