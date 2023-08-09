import mongoose from 'mongoose';

const SerialSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            requider: true,
        },
        season: {
            type: Number,
            requider: true,
        },
        series: {
            type: Number,
            requider: true,
        },
        watching: {
            type: Boolean,
            requider: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }

    }, { timestamps: true }
)

export default mongoose.model('Serial', SerialSchema);