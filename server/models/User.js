import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    googleID:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    avatar: String,
    createdAt: { type: Date, default: Date.now }
},{timestamps:true})

export const User = mongoose.model('User',userSchema);