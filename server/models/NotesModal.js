import mongoose from "mongoose";


const noteSchema = mongoose.Schema({
    title:{ type : String},
    note: {type : String},
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    }
    
    },
    {
        timestamp: true
    }
)

const Notes = mongoose.model('Notes', noteSchema);

export default Notes;