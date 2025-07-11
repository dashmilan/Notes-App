import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
    topic:{
        type:String,
        max:100
    }
    ,
    desc: {
        type: String,
        max: 500
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

}, {
    timestamps: true
});

export const Notes = mongoose.model("Notes", notesSchema);
