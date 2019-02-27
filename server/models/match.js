var validator = require('validator')
var uniqueValidator = require('mongoose-unique-validator');
const mongoose = require('mongoose')
module.exports = function () {
    
    const GameEventSchema = new mongoose.Schema({
        p1_points_scored: {
            type: Number,
            default: 0
        },
        p2_points_scored: {
            type: Number,
            default: 0
        },
        type: {
            type: String,
        },
    
    }, { timestamps: true });

    const GameSchema = new mongoose.Schema({
        game_complete: {
            type: Boolean,
            default: false,
        },
        winner: {
            type: String,
            default: null,
        },
        game_events: [GameEventSchema]
    }, { timestamps: true });
    

    const MatchSchema = new mongoose.Schema({
        player1: {
            type: String,
            required: [true, 'Name is required.'],
            minlength: [3, "player 1 name needs to be at least 3 characters."],
            
        },
        player2: {
            type: String,
            required: [true, 'Name is required.'],
            minlength: [3, "player 2 name needs to be at least 3 characters."]
        },
        winner: {
            type: String,
            default: null,
    
        },
        match_complete: {
            type: Boolean,
            default: false,
        },
        games: [GameSchema]
    }, { timestamps: true });
    
    
    
    mongoose.model('Match', MatchSchema);
    mongoose.model('Game', GameSchema);
    mongoose.model('GameEvent', GameEventSchema);


    
}