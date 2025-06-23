const express = require("express")

const router = express.Router()

const settingController = require('../controllers/SettingController')

router.post("/postsetting", settingController.setting);
router.get("/getsetting", settingController.getSetting);


module.exports = router