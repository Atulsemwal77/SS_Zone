const Wishlist = require("../models/wishlistModel");
const User = require("../models/authModel");

const add_to_wishlist = async (req, res) => {
  try {
    const userId = req.user._id;

    // Check if item already exists in wishlist for this user
    const existingWishItem = await Wishlist.findOne({
      id: req.body.id,
      userId,
    });

    if (existingWishItem) {
      return res.status(409).send({
        success: false,
        message: "Item already exists in the wishlist",
      });
    }

    // Create wishlist entry
    const wishlist_obj = new Wishlist({
      userId,
      id: req.body.id,
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      rating: req.body.rating,
      duration: req.body.duration,
      lectures: req.body.lectures,
      price: req.body.price,
      image: req.body.image,
    });

    const wishlistData = await wishlist_obj.save();

    // OPTIONAL: Update User model with reference to wishlist item
    // Only if you want to maintain a list of wishlist item IDs on the user document
    await User.findByIdAndUpdate(
      userId,
      { $push: { wishlist: wishlistData._id } }, // ⬅️ Assuming `wishlist` is an array of ObjectIds
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Wishlist item added successfully",
      data: wishlistData,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

const get_wishlist_items = async (req ,res)=>{

  const userId = req.user._id
  const wishlistItems = await Wishlist.find({userId })

  res.status(201).send({
    status : true,
    message : "Wishlist items retrieved successfully" ,
    data : wishlistItems
  })

}

const delete_wishlist_item = async (req , res)=>{
  try {
    const userId = req.user._id;
    const itemId = req.params.id 

    const deleteItem = await Wishlist.findByIdAndDelete({
      _id : itemId,
      userId
    });

    if(!deleteItem){
      return res.status(404).send({
        success: false,
        message: "Item not found or unauthorized",
      })
    }res.status(200).send({
      success: true,
      message: "Item deleted",
      data: deleteItem,
    });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    res.status(500).send({
      success: false,
      message: "An error occurred while deleting the cart item",
    });
  }
}



module.exports = {
  add_to_wishlist,
  get_wishlist_items,
  delete_wishlist_item 
};

// const Wishlist = require("../models/wishlistModel");

// const add_to_wishlist = async (req, res) => {
//   try {
//     const {
//       id,
//       image,
//       duration,
//       title,
//       description,
//       lessons,
//       author,
//       rating,
//       price,
//     } = req.body;
//     // console.log("courseId:", id);

//     const wishlistItem = new Wishlist({
//       id,
//       title,
//       author,
//       rating,
//       duration,
//       lessons,
//       price,
//       image,
//       description,
//     });

//     const savedItem = await wishlistItem.save();
//     res.status(201).json({
//       message: "Item added to wishlist successfully",
//       data: savedItem,
//     });
//   } catch (error) {
//     console.error("Error adding item to wishlist:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// const get_wishlist_items = async (req, res) => {
//   try {
//     const wishlistItems = await Wishlist.find();
//     res.status(200).send({
//       success: true,
//       message: "Wishlist Items",
//       data: wishlistItems,
//     });
//   } catch (error) {
//     res.status(400).send({ success: false, message: error.message });
//   }
// };

// const delete_wishlist_item = async (req, res) => {
//   try {
//     const  id  = req.params.id;

//     const deletedItem = await Wishlist.findByIdAndDelete(id);

//     if (!deletedItem) {
//       return res.status(404).json({
//         success: false,
//         message: "Wishlist item not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Wishlist item deleted successfully",
//       data: deletedItem,
//     });
//   } catch (error) {
//     console.error("Error deleting wishlist item:", error);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };

// module.exports = {
//   add_to_wishlist,
//   get_wishlist_items,
//   delete_wishlist_item
// };

// --------------------------------------------

// const Wishlist = require("../models/wishlistModel");

// const add_to_wishlist = async (req, res) => {
//   try {
//     const { id, title, author, rating, duration, lessons, price, image, description } = req.body;

//     if (!id || !title || !author || !price) {
//       return res.status(400).json({
//         success: false,
//         message: "Missing required fields",
//       });
//     }

//     const existingItem = await Wishlist.findOne({ id });

//     if (existingItem) {
//       return res.status(409).json({
//         success: false,
//         message: "Item already exists in wishlist",
//       });
//     }

//     const wishlistItem = new Wishlist({
//       id,
//       title,
//       author,
//       rating,
//       duration,
//       lessons,
//       price,
//       image,
//       description,
//     });

//     const savedItem = await wishlistItem.save();

//     res.status(201).json({
//       success: true,
//       message: "Item added to wishlist successfully",
//       data: savedItem,
//     });
//   } catch (error) {
//     console.error("Error adding item to wishlist:", error);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };

// const get_wishlist_items = async (req, res) => {
//   try {
//     const wishlistItems = await Wishlist.find();
//     res.status(200).send({
//       success: true,
//       message: "Wishlist Items",
//       data: wishlistItems,
//     });
//   } catch (error) {
//     res.status(400).send({ success: false, message: error.message });
//   }
// };

// const delete_wishlist_item = async (req, res) => {
//   try {
//     const  id  = req.params.id;

//     const deletedItem = await Wishlist.findByIdAndDelete(id);

//     if (!deletedItem) {
//       return res.status(404).json({
//         success: false,
//         message: "Wishlist item not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Wishlist item deleted successfully",
//       data: deletedItem,
//     });
//   } catch (error) {
//     console.error("Error deleting wishlist item:", error);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };

// module.exports = {
//   add_to_wishlist,
//   get_wishlist_items,
//   delete_wishlist_item
// };

// ----------------------------------------------------------------------
