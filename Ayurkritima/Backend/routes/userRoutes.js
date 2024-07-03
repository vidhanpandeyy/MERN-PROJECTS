const express = require('express');
const router = express.Router();
const { allUsers, singleUser, editUser, deleteUser, createUserJobsHistory,oneuser ,changepassword,createmedical,allmedical } = require('../controllers/userController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');


//user routes

// /api/allusers
router.get('/allusers', isAuthenticated, isAdmin, allUsers);
// /api/user/id
router.post('/createmedical',createmedical);
router.get('/allmedical',allmedical);
router.get('/user/:id', singleUser);
// /api/user/edit/id
router.put('/user/edit/:id', isAuthenticated, editUser);
// /api/admin/user/delete/id
router.delete('/admin/user/delete/:id', isAuthenticated, isAdmin, deleteUser);
// /api/user/jobhistory
router.delete('/admin/user/delete', isAuthenticated, isAdmin, deleteUser);
router.get('/admin/user/:id', isAuthenticated, isAdmin, oneuser);
router.post('/user/jobhistory', isAuthenticated, createUserJobsHistory);
router.put('/user/changepassword',isAuthenticated,changepassword);

module.exports = router;