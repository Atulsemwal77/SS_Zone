const express = require("express")
const router = express.Router();
const commentController = require('../controllers/commentController')

router.post('/postComment' , commentController.postComment );
router.get('/getComment' , commentController.getComment)
router.delete('/dltComment/:id', commentController.dltComment)

module.exports = router