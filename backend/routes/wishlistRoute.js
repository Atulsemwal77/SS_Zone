const express = require("express");
const router = express.Router();

const wishlistController = require('../controllers/wishlistController');
const protect = require("../middleware/auth")

router.post('/addToWishlist',  protect, wishlistController.add_to_wishlist);
router.get('/wishlistItems' , protect, wishlistController.get_wishlist_items)
router.delete("/removeWishlistItems/:id" , protect, wishlistController.delete_wishlist_item)

module.exports = router;
