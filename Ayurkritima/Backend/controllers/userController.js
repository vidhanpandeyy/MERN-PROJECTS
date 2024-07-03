const User = require('../models/userModel');
const Job = require('../models/jobModel');
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/confirmationmail");
const ErrorResponse = require('../utils/errorResponse');
const bcrypt = require("bcryptjs");
const Medical = require('../models/Medical');
//load all users
exports.allUsers = async (req, res, next) => {
    //enable pagination
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const count = await User.find({ role: "0" }).estimatedDocumentCount();

    try {
        const users = await User.find({ role: "0" }).sort({ createdAt: -1 }).select('-password')
            .skip(pageSize * (page - 1))
            .limit(pageSize)

        res.status(200).json({
            success: true,
            users,
            page,
            pages: Math.ceil(count / pageSize),
            count

        })
        next();
    } catch (error) {
        return next(error);
    }
}

//show single user
exports.singleUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({
            success: true,
            user
        })
        next();

    } catch (error) {
        return next(error);
    }
}


//edit user
exports.editUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({
            success: true,
            user
        })
        next();

    } catch (error) {
        return next(error);
    }
}

//delete user
exports.deleteUser = async (req, res, next) => {
    try {
        const id = req.body.id;
        const user = await User.findByIdAndRemove(id);
        res.status(200).json({
            success: true,
            message: "user deleted"
        })
        next();

    } catch (error) {
        return next(error);
    }
}
exports.oneuser = async (req, res, next) => {

    try {
        const id = req.params.id;
        const user = await User.findById(id);
        return res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        return next(error);
    }
}
exports.changepassword = async (req, res, next) => {
    try {
        const data = req.body;
        const id = data.id;
        const user = await User.findById(id);
        const pass = await bcrypt.compare(data.values.currentPassword, user.password);

        if (!pass) {
            return res.status(400).json({
                success: false,
                message: 'Current Password doesnot match'
            })
        }
        const newPassword = await bcrypt.hash(data.values.newPassword, 10);

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { password: newPassword },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Password Changed Successfully'
        });

    } catch (error) {
        return next(error);
    }
}
//jobs history
exports.createUserJobsHistory = async (req, res, next) => {
    const { title, description, salary, location } = req.body;

    try {
        if (req.user.role === 1) {
            return next(new ErrorResponse("Login As User", 404));
        }
        const currentUser = await User.findOne({ _id: req.user._id });
        const job = await Job.findOne({ title: title, description: description, salary: salary, location: location });
        if (!job) {
            return next(new ErrorResponse("Job not found", 404));
        }
        id = job._id;
        if (!currentUser) {
            return next(new ErrorResponse("You must log In", 401));
        }
        const jobExistsInHistory = currentUser.jobsHistory.some(historyJob => historyJob._id.toString() === job._id.toString());

        if (jobExistsInHistory) {
            return next(new ErrorResponse("You already applied for this job", 401));
        }

        const addJobHistory = {
            _id: id,
            title,
            description,
            salary,
            location,
            user: req.user._id
        }
        currentUser.jobsHistory.push(addJobHistory);
        await currentUser.save();
        const users = {
            _id: currentUser.id,
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            email: currentUser.email
        }
        job.applied.push(users);
        await job.save();

        await sendVerificationEmail(req.user.email, job.title, job.description, job.salary, job.location);

        res.status(200).json({
            success: true,
            currentUser
        })
        next();

    } catch (error) {
        return next(error);
    }
}
async function sendVerificationEmail(email, title, description, salary, location) {
    const mailResponse = await mailSender(
        email,
        "Confirmation Email",
        emailTemplate(title, description, salary, location)
    );

}
exports.createmedical = async (req, res) => {
    try {
        const { id, description, disease, prescription } = req.body;
        const user = await User.findByIdAndUpdate({ _id: id }, {
            $push: {
                medical: {
                    description: description,
                    disease: disease['predicted_diseases'][0],
                    prescription:prescription['remedies'][disease['predicted_diseases'][0]]['Ayurvedic Remedies']
                }
            }
        }, { new: true });
        const medical = await Medical.create({
            user: id,
            description: description,
            disease:disease['predicted_diseases'][0],
            prescription: prescription['remedies'][disease['predicted_diseases'][0]]['Ayurvedic Remedies']
        })
        return res.status(200).json({
            succes: true,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
exports.allmedical = async (req, res) => {
    try {
        const all = await Medical.find();
        return res.status(200).json({
            succes: true,
            data: all
        })
    } catch (e) {
        return res.status(200).json({
            succes: false,
            message: e.message
        })
    }
}