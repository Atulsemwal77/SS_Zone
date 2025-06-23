const Cart = require("../models/cartModel");
const User = require("../models/authModel");

const add_to_cart = async (req, res) => {
  try {
    const userId = req.user._id; // assuming auth middleware sets req.user


    const existingItem = await Cart.findOne({ id: req.body.id, userId });

    if (existingItem) {
      return res.status(409).send({
        success: false,
        message: "Item already exists in the cart",
      });
    }

    const cart_obj = new Cart({
      userId,
      id: req.body.id,
      title: req.body.title,
      author: req.body.author,
      rating: req.body.rating,
      duration: req.body.duration,
      lectures: req.body.lectures,
      price: req.body.price,
      image: req.body.image,
    });

    const cartData = await cart_obj.save();

    await User.findByIdAndUpdate(
      userId,
      { $push: { itemPurchased: cartData } },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Cart Product Details added successfully",
      data: cartData,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

const get_cart_items = async (req, res) => {
  console.log("fetching cart items..");
  try {
    const userId = req.user._id;

    const cartItems = await Cart.find({ userId });
    console.log("cart items",cartItems)

    res.status(200).send({
      success: true,
      message: "Cart items retrieved successfully",
      data: cartItems,
    });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

const delete_cart_item = async (req, res) => {
  try {
    const userId = req.user._id;          // Authenticated user's ID
    const itemId = req.params.id;         // Cart item ID from route params

    // Delete only if the item belongs to the user
    const deletedItem = await Cart.findOneAndDelete({
      _id: itemId,
      userId,
    });

    if (!deletedItem) {
      return res.status(404).send({
        success: false,
        message: "Item not found or unauthorized",
      });
    }

    res.status(200).send({
      success: true,
      message: "Item deleted",
      data: deletedItem,
    });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    res.status(500).send({
      success: false,
      message: "An error occurred while deleting the cart item",
    });
  }
};


module.exports = {
  add_to_cart,
  get_cart_items,
  delete_cart_item
};
