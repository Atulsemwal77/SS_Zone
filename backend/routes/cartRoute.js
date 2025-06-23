const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const cart_Controller = require("../controllers/cartControllers");
const protect = require("../middleware/auth");

router.post("/add-to-cart", protect, cart_Controller.add_to_cart);
router.get("/cartItems", protect, cart_Controller.get_cart_items);
router.delete("/deleteCartItem/:id", protect, cart_Controller.delete_cart_item);

module.exports = router;
