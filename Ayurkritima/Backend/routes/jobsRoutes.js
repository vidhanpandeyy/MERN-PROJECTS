const express = require('express');
const router = express.Router();
const { createJob, singleJob, updateJob, showJobs, deletejob,users} = require('../controllers/jobsController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');



//jobs routes

// /api/job/create
router.post('/job/create', isAuthenticated, isAdmin, createJob);
// /api/job/id
router.get('/job/:id', singleJob);
// /api/job/update/job_id
router.put('/job/update/:job_id', isAuthenticated, isAdmin, updateJob);
// /api/jobs/show
router.get('/jobs/show', showJobs);

router.delete('/admin/job/delete', isAuthenticated, isAdmin, deletejob);
router.get('/admin/job/:id', isAuthenticated, isAdmin, users);


module.exports = router;