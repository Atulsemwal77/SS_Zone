import { FaStar } from "react-icons/fa";
import { MdCurrencyRupee } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function CartItems() {
  const [cartItems, setCartItems] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [applied, setApplied] = useState(false);
  const [discount, setDiscount] = useState(0);

  const fetchData = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login to add items to cart.");
      return;
    }

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND}cart/cartItems`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCartItems(res.data.data);
    } catch (error) {
      console.log("Error in fetching purchased cart items", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price || 0), 0);
  const total = subtotal - discount;

  const applyPromo = () => {
    if (promoCode === "25BBUYVNJHV4774" && !applied) {
      setDiscount(500);
      setApplied(true);
    } else {
      toast("wrong coupon code");
    }
  };

  const removePromo = () => {
    setDiscount(0);
    setApplied(false);
    setPromoCode("");
  };

  const deleteItem = async (id) => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login to add items to cart.");
      return;
    }
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND}cart/deleteCartItem/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Item deleted!");
      setCartItems(cartItems.filter((item) => item._id !== id));
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete item");
    }
  };

  return (
    <div className="font-[Manrope] max-w-screen-2xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-10 w-full">
        <div className="flex-1 space-y-6 max-h-[500px] overflow-auto">
          {cartItems.length === 0 ? (
            <p className="font-semibold text-[18px] leading-[100%] tracking-normal text-[#1C4ED9] pb-6">
              Your cart is empty
            </p>
          ) : (
            <p className="font-semibold text-[18px] leading-[100%] tracking-normal text-[#1C4ED9] pb-6">
              {cartItems.length} {cartItems.length === 1 ? "Course" : "Courses"}{" "}
              in Cart
            </p>
          )}

          {/* Course Items */}
          {cartItems.map((course) => (
            <div
              key={course.id}
              className="w-full border border-[#E3E3E3] rounded-md p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="p-2">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-[127px] h-[80px] rounded-md object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-[#292929] pb-1">
                    {course.title}
                  </h3>
                  <p className="text-sm text-[#6F6F6F] pb-1">{course.author}</p>
                  <div className="flex items-center gap-1 text-sm pb-1 text-[#C08B00] font-bold">
                    {course.rating}
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-[#FABF23] text-sm" />
                    ))}
                  </div>
                  <p className="text-sm text-[#6F6F6F]">
                    <span className="pr-3">• {course.duration}</span>
                    <span className="pr-3">• {course.lectures} Lectures</span>
                    <span className="pr-3">• All Levels</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center text-lg text-[#232323]">
                <MdCurrencyRupee className="text-[20px]" />
                <p className="text-[18px]">{course.price}</p>
              </div>
              <button
                onClick={() => deleteItem(course._id)}
                className="text-sm text-[#296AD2] font-medium hover:underline cursor-pointer"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {cartItems.length === 0 ? (
          <></>
        ) : (
          <>
            <div className="w-full lg:w-[400px] space-y-6 my-10">
              <div className="border border-[#E3E3E3] rounded-md p-6">
                <h3 className="font-bold text-lg text-[#1A1A1A] pb-5">
                  Order Summary
                </h3>

                <div className="flex justify-between pb-4">
                  <p className="font-semibold uppercase text-sm text-[#1A1A1A]">
                    Subtotal
                  </p>
                  <div className="flex items-center">
                    <MdCurrencyRupee className="text-[#232323]" />
                    <p className="font-semibold text-sm">{subtotal}</p>
                  </div>
                </div>
                <div className="flex justify-between pb-4">
                  <p className="font-normal uppercase text-sm text-[#1A1A1A]">
                    Promo Discount
                  </p>
                  <div className="flex items-center">
                    <MdCurrencyRupee className="text-[#232323]" />
                    <p className="text-sm">{discount}</p>
                  </div>
                </div>
                <div className="flex justify-between border-b pb-4 mb-5">
                  <p className="font-bold uppercase text-base text-[#1A1A1A]">
                    Total
                  </p>
                  <div className="flex items-center">
                    <MdCurrencyRupee className="text-[#232323]" />
                    <p className="font-bold text-sm">{total}</p>
                  </div>
                </div>
                <button className="w-full py-3 bg-[#296AD2] text-white font-medium rounded-md uppercase text-sm cursor-pointer">
                  Checkout
                </button>
              </div>

              {/* Promotions */}
              <div className="border border-[#E3E3E3] rounded-md p-6 space-y-5">
                <h3 className="font-bold text-lg text-[#1A1A1A]">Promotions</h3>

                {applied && (
                  <div className="border border-dashed border-[#296AD2] p-3 rounded-md flex justify-between items-center">
                    <p className="text-sm font-semibold">
                      25BBUYVNJHV4774{" "}
                      <span className="font-normal text-[#6F6F6F]">
                        is applied
                        <br />
                        Udemy coupon
                      </span>
                    </p>
                    <button
                      onClick={removePromo}
                      className="bg-[#EBF5FF] p-1 rounded"
                    >
                      <IoMdClose className="text-[#296AD2] text-xl cursor-pointer" />
                    </button>
                  </div>
                )}

                {!applied && (
                  <div className="flex sm:flex-row flex-col gap-3">
                    <input
                      type="text"
                      placeholder="Enter Coupon"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 p-2 border border-[#DEE0E4] rounded-md text-sm"
                    />
                    <button
                      onClick={applyPromo}
                      className="py-2 px-5 bg-[#296AD2] text-white rounded-md text-sm font-medium cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartItems;
