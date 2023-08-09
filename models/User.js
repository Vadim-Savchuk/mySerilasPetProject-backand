import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        useremail: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            unique: true,
        },
        avatar: {
            type: String,
            default: ''
        },
        serials: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Serial',
            }
        ]

    }, { timestamps: true }
)

export default mongoose.model('User', UserSchema);