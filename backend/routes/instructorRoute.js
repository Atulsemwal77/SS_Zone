const express = require('express')
const loginInstructorController = require('../controllers/instructorAuthController')

const instructorRouter = express.Router()

instructorRouter.post('/login',  loginInstructorController)

module.exports = instructorRouter