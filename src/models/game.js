    const mongoose = require('mongoose')
    const Schema  = mongoose.Schema;


    const User = require('./user')
    const Settings = require('./settings')
    const Logic = require('./logic')


    const gameSchema = new mongoose.Schema({
        settings: [{
            type: Schema.Types.ObjectId,
            ref: 'Settings'
        }],
        players: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        logic: [{
            type: Schema.Types.ObjectId,
            ref: 'Logic'
        }],
    }, {
        timestamps: true
    })



    const Game = new mongoose.model('Game', gameSchema)


    module.exports = Game