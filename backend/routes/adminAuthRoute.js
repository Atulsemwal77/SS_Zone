const express = require('express')
const loginAdminController = require('../controllers/adminAuthController')
const adminProtect = require('../middleware/admin')

const adminRouter = express.Router()

adminRouter.post('/login',  loginAdminController)

module.exports = adminRouter