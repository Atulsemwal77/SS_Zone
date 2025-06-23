import { FaHeart, FaRegClock, FaRegStar } from "react-icons/fa";
import { MdCurrencyRupee } from "react-icons/md";
import { TiDocumentText } from "react-icons/ti";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function WishlistItems() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWishlist = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login to add items into wishlist");
      setLoading(false); // stop loading if no token
      return;
    }

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND}wishlist/wishlistItems`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setWishlistItems(res.data.data);
    } catch (error) {
      console.log("Error in fetching wishlist items:", error);
      setError("Failed to load wishlist items.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const deleteWishlistItems = async (id) => {

     const token = localStorage.getItem("token"); 
     if(!token){
      toast.error("Please login to add items to cart.");
      return;
    }

    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND}wishlist/removeWishlistItems/${id}`,
         {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setWishlistItems((prev) => prev.filter((item) => item._id !== id));
      toast.success("Item removed from wishlist");
    } catch (error) {
      console.log("Error removing wishlist item:", error);
      toast.error("Failed to remove item");
    }
  };

  if (loading) {
    return (
      <p className="text-center text-[18px] text-gray-500 py-10">
        Loading wishlist...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center text-[18px] text-red-500 py-10">{error}</p>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <p className="text-center text-[18px] text-gray-500 py-10">
        Your wishlist is empty.
      </p>
    );
  }

  return (
    <div className="pb-[30px] px-4 sm:px-10 md:px-24 font-[Manrope]">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {wishlistItems.map((course, index) => (
          <div
            key={index}
            className="max-w-[400px] max-h-[499px] border-1 rounded-[12px] p-4 border-[#E3E3E3] hover:border-[#296AD2] flex flex-col gap-4"
          >
            <div className="relative w-full">
              <img
                src={course.image || "/fallback.jpg"}
                alt={course.title}
                className="rounded-[12px] w-full h-[200px] object-cover"
              />
              <div className="absolute top-2 left-4 bg-[#296AD2] py-2 px-[21px] rounded-[40px] flex gap-2 items-center">
                <FaRegClock className="text-white" />
                <p className="text-[14px] font-normal text-white">
                  {course.duration}
                </p>
              </div>
              <button
                onClick={() => deleteWishlistItems(course._id)}
                className="cursor-pointer absolute top-2 right-4 bg-[#ffffff] rounded-full p-2"
              >
                <FaHeart className="text-red-600" />
              </button>
            </div>

            <div className="font-[Manrope] pb-2">
              <h3 className="pb-3 font-semibold text-[20px] text-[#292929]">
                {course.title}
              </h3>
              <p className="pb-3 font-normal text-[16px] text-[#6F6F6F]">
                {course.description}
              </p>
              <div className="flex justify-between">
                <div className="flex items-center gap-1">
                  <TiDocumentText />
                  <p className="font-semibold text-[16px] text-[#292929]">
                    {course.lessons} Lessons
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <FaRegStar className="text-[#F04438E5]" />
                  <p className="font-semibold text-[16px]">{course.rating}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center font-[Manrope]">
              <div className="flex items-center">
                <MdCurrencyRupee className="text-[#F04438] text-[20px]" />
                <p className="font-semibold text-[20px] text-[#F04438]">
                  {course.price}
                </p>
              </div>
              <Link to={`/courseDetailsOverview/${course._id}`} state={course}>
                <button
                  className="cursor-pointer py-3 px-6 border-1 hover:bg-[#296AD2] hover:text-white border-[#296AD2] text-[#296AD2] font-medium text-[16px] rounded-[4px]"
                >
                  Enroll Now
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WishlistItems;
