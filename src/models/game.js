const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
    settings: {

    },
    players: {

    },
    logic: {

    }
}, {
    timestamps: true
})



const Game = new mongoose.model('Game', gameSchema)


module.exports = Game