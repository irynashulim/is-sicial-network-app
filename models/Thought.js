const { Schema, model, Types } = require('mongoose');
const dateFormat = require("../utils/dateFormat");


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

 const ReactionSchema = new Schema(
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },
      reactionBody: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 350
      },
      username: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
      }
    },
    {
      toJSON: {
        getters: true
      }
    }
  );

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});
// create the Thought model using the ThoughtSchema
const Thought = model('Thought', ThoughtSchema);
// export the Thought model
module.exports = Thought;