
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const users = new mongoose.Schema({

    firstName: {
        type: String,
        trim: true,
        maxlength: 70,
    },

    lastName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,
    },



}, { timestamps: true })
const jobSchema = new mongoose.Schema({

    title: {
        type: String,
        trim: true,
        required: [true, 'Title is required'],
        maxlength: 70,
    },

    description: {
        type: String,
        trim: true,
        required: [true, 'Description is required'],
    },
    salary: {
        type: String,
        trim: true,
        required: [true, 'Salary is required'],
    },
    location: {
        type: String,
    },
    available: {
        type: Boolean,
        default: true
    },
    jobType: {
        type: ObjectId,
        ref: "JobType",
        required: true
    },
    user: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    applied:[users]


}, { timestamps: true })

module.exports = mongoose.model("Job", jobSchema);