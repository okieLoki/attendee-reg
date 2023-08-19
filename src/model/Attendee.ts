import mongoose from "mongoose";

const attendeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    question: {
        type: String,
        required: false
    },
    checkedIn: {
        type: Boolean,
        default: false
    }
})

const Attendee = mongoose.model("Attendee", attendeeSchema);

export default Attendee;