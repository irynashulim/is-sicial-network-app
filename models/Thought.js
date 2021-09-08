const { Schema, model } = require('mongoose');
const ReactionSchema = require('./Reaction');

const ThoughtSchema = new Schema (
    {
        thoughtText:{
            type:String,
            required: true,
            minLength:1,
            maxLength:280
        },
        createdAt:{
            type:Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username:{
            type: String,
            required:true
        },
        reaction: [ReactionSchema]
    },
    {
        toJSON:{
            virtuals:true,
            getters:true
        },
        id:false
    }
 );


ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});
// create the Thought model using the ThoughtSchema
const Thought = model('Thought', ThoughtSchema);
// export the Thought model
module.exports = Thought;