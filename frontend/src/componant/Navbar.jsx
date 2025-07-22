import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import { FaBars, FaChevronDown, FaTimes } from "react-icons/fa";
import logo from "../assets/image/logo.png";
import axios from "axios";
import { toast } from "react-toastify";

function Navbaar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ name: "", email: "", password: "" });
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const getNavLinkClass = ({ isActive }) =>
    isActive ? "text-primary font-semibold" : "text-gray-700 hover:text-primary";

  const fetchCart = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND}cart/cartItems`)
      .then((res) => setCartItems(res.data.data))
      .catch((err) => console.error("Cart error:", err));
  };

  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      fetchCart();
      // fetchWishlist();
    }

    window.addEventListener("cart-updated", fetchCart);
    // window.addEventListener("wishlist-updated", fetchWishlist);

    return () => {
      window.removeEventListener("cart-updated", fetchCart);
      // window.removeEventListener("wishlist-updated", fetchWishlist);
    };
  }, []);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".user-dropdown")) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND}auth/login`, loginData , { withCredentials: true });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.result));
      localStorage.setItem("role", res.data.role);
      setUser(res.data.result);
      toast.success("Login Successful");
      setShowLogin(false);
      fetchCart();
      // fetchWishlist();
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND}auth/signup`, signupData , { withCredentials: true });
      toast.success("Signup Successful");
      setShowSignup(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out");
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About Us" },
    { path: "/courses", label: "Courses" },
    { path: "/blogs", label: "Blogs" },
    { path: "/contact", label: "Contact Us" },
  ];

  return (
    <nav className="max-w-screen-2xl mx-auto bg-white shadow-sm  px-4">
      <div className="py-4 flex items-center justify-between mx-auto">
        <NavLink to="/" className="flex items-center gap-2">
          <img src={logo} alt="Site Logo" />
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map(({ path, label }) => (
            <NavLink key={path} to={path} className={getNavLinkClass}>
              {label}
            </NavLink>
          ))}
        </div>

        {/* Icons & Auth */}
        <div className="hidden lg:flex items-center gap-5">
          <div className="flex gap-5">
            <NavLink to="/wishlist" aria-label="Wishlist" className="w-8 h-8 border rounded-full flex items-center justify-center">
              <div className="relative">
                <Heart className="w-4 h-4" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-3 -right-2 bg-red-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </div>
            </NavLink>
            <NavLink to="/cart" aria-label="Cart" className="w-8 h-8 border rounded-full flex items-center justify-center">
              <div className="relative">
                <ShoppingCart className="w-4 h-4" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-3 -right-2 bg-red-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </div>
            </NavLink>
          </div>

          {user ? (
            <div className="relative inline-block text-left user-dropdown">
              <div onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="cursor-pointer">
                <div className="flex items-center gap-1">
                  <span className="text-sm text-gray-700">Hello, <br /><i>{user.name}</i></span>
                  {/* <span className="text-sm text-gray-700">Hello, <br /><i>{user.email}</i></span>
                  <span className="text-sm text-gray-700">Hello, <br /><i>{user.user}</i></span> */}
                  <FaChevronDown className="w-2" />
                </div>
              </div>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-10">
                  <button onClick={() => { handleLogout(); setIsDropdownOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Logout
                  </button>
                  <button onClick={() => { navigate('/dashboard'); setIsDropdownOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Dashboard
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button onClick={() => setShowSignup(true)} className="px-4 py-2 border border-primary text-primary rounded-md hover:bg-blue-50">
                Sign up
              </button>
              <button onClick={() => setShowLogin(true)} className="px-5 py-2 bg-blue-500 text-white rounded-md">
                Log in
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="lg:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white py-2 px-4 flex flex-col gap-3">
          {navLinks.map(({ path, label }) => (
            <NavLink key={path} to={path} onClick={() => setIsMenuOpen(false)} className={getNavLinkClass}>
              {label}
            </NavLink>
          ))}
          <div className="flex gap-5 mt-2">
            <NavLink to="/wishlist" aria-label="Wishlist" className="w-8 h-8 border rounded-full flex items-center justify-center">
              <div className="relative">
                <Heart className="w-4 h-4" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-3 -right-2 bg-red-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </div>
            </NavLink>
            <NavLink to="/cart" aria-label="Cart" className="w-8 h-8 border rounded-full flex items-center justify-center">
              <div className="relative">
                <ShoppingCart className="w-4 h-4" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-3 -right-2 bg-red-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </div>
            </NavLink>
          </div>

          {user ? (
            <div className="mt-4">
              <div onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="cursor-pointer text-sm text-gray-700">
                Hello, {user.name}
              </div>
              {isDropdownOpen && (
                <div className="mt-2 w-40 bg-white border rounded-lg shadow-lg z-10">
                  <p onClick={() => { handleLogout(); setIsDropdownOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                    Logout
                  </p>
                  <p onClick={() => { navigate('/dashboard'); setIsDropdownOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                    Dashboard
                  </p>
                </div>
              )}
            </div>
          ) : (
            <>
              <button onClick={() => setShowSignup(true)} className="px-4 py-2 border border-primary text-primary rounded-md hover:bg-blue-50">
                Sign up
              </button>
              <button onClick={() => setShowLogin(true)} className="px-5 py-2 bg-blue-500 text-white rounded-md">
                Log in
              </button>
            </>
          )}
        </div>
      )}

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            <h2 className="text-xl font-semibold mb-4">Log In</h2>
            <form onSubmit={handleLoginSubmit} className="flex flex-col gap-3">
              <input type="email" required placeholder="Email" value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} className="border p-2 rounded" />
              <input type="password" required placeholder="Password" value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} className="border p-2 rounded" />
              <div className="flex justify-between mt-4">
                <button type="button" onClick={() => setShowLogin(false)} className="text-sm text-gray-500">Cancel</button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Log In</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
            <form onSubmit={handleSignupSubmit} className="flex flex-col gap-3">
              <input type="text" required placeholder="Name" value={signupData.name} onChange={(e) => setSignupData({ ...signupData, name: e.target.value })} className="border p-2 rounded" />
              <input type="email" required placeholder="Email" value={signupData.email} onChange={(e) => setSignupData({ ...signupData, email: e.target.value })} className="border p-2 rounded" />
              <input type="password" required placeholder="Password" value={signupData.password} onChange={(e) => setSignupData({ ...signupData, password: e.target.value })} className="border p-2 rounded" />
              <div className="flex justify-between mt-4">
                <button type="button" onClick={() => setShowSignup(false)} className="text-sm text-gray-500">Cancel</button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Sign Up</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbaar;
