const mongoose = require('mongoose')

const anonymousSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: Buffer,
        required: true
    },  
}, {
    timestamps: true
})





const Anonymouse = mongoose.model('Anonymous', anonymousSchema)


module.exports = Anonymouse