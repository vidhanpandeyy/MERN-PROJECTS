const express = require("express")
const { LoginController, RegisterController } = require("../controllers/userController")
//router objact
const router = express.Router()

//routers
//POST || LOGIN user
router.post('/login',LoginController)

//POST || REGISTER user
router.post('/register',RegisterController)

//export
module.exports = router
