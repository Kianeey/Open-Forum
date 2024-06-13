import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    name: {
        type:String , default: ""
    },
    profile_picture:{
       image_source: String,
       image_alt: String,
    },
    email: {
        type:String, unique: true
    },
    created_at: {
        type:Date, default: Date.now

    },



},
{
    timestamps:true
})
const User = 
mongoose.models.User ||  mongoose.model('User', userSchema,'users')

export default User;