import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userModal = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        pic: {
            type: String,
        }
    }
    ,{
        timestamp: true,
    }
);




const User = mongoose.model('User', userModal);

export default User;