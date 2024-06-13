import mongoose, {Schema} from "mongoose";

const forumSchema = new Schema({
    author:{
        type:mongoose.Schema.Types.ObjectId,ref:'User'
    },
    title:String,
    screen_name:String,
    content:{
        type:String,
        required:true,
        minLength:1,
        maxLength:3000,
    },
    upvote:[ String,
    ],
    downvote: [String
    ],
    
    
},  
{
    timestamps:true
})
const Forum = mongoose.models.forumSchema || mongoose.model('Forum',forumSchema)

export default Forum;
