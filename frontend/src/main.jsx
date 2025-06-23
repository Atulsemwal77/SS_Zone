// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
// import './index.css'
// import App from './App.jsx'
// import { CartProvider } from './context/CartContext.jsx';



// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <CartProvider>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//     </CartProvider>
//   </React.StrictMode>
// );
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { CartProvider } from './context/CartContext.jsx';
import Home from './pages/Home.jsx';
import Contact from './pages/Contact.jsx';
import AboutUs from './pages/AboutUs.jsx';
import Courses from './pages/Courses.jsx';
import Wishlist from './pages/Wishlist.jsx';
import Cart from './pages/Cart.jsx';
import Blog from './pages/Blog.jsx';
import BlogDetails from './pages/BlogDetails.jsx';
import CourseDetails from './pages/courseDetails.jsx';
import Dashboard from './componant/Dashboard.jsx';
import Overview from './studentDashboard/StudentesPages/Overview.jsx';
import Profile from './studentDashboard/StudentesPages/MyProfile.jsx';
import EnrollCourse from './studentDashboard/StudentesPages/EnrollCourse.jsx';
import StuWishlist from './studentDashboard/StudentesPages/stuWishlist.jsx';
import Reviews from './studentDashboard/StudentesPages/Reviews.jsx';
import Quiz from "./studentDashboard/StudentesPages/MyQuiz.jsx"
import Message from './studentDashboard/StudentesPages/Message.jsx';
import Assignment from './studentDashboard/StudentesPages/Assignments.jsx';
import Settings from './studentDashboard/StudentesPages/Setting.jsx';
import Logout from './studentDashboard/StudentesPages/LogOut.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'contact', element: <Contact /> },
      { path: 'about', element: <AboutUs /> },
      { path: 'courses', element: <Courses /> },
      { path: 'wishlist', element: <Wishlist /> },
      { path: 'cart', element: <Cart /> },
      { path: 'blogs', element: <Blog /> },
      { path: 'blogs/:id', element: <BlogDetails /> },
      { path: 'courseDetailsOverview/:courseId', element: <CourseDetails /> }
    ]
  },
  {path : '/dashboard' , element : <Dashboard/>,
    children:[
     { index : true, element : <Overview/>,},
     { path: "profile", element : <Profile/>},
     { path: "enrollCourse", element : <EnrollCourse/>},
     { path: "wishlist", element : <StuWishlist/>},
     { path: "review" , element :  <Reviews/>},
     { path: "myQuiz" , element :  <Quiz/>},
     { path: "message" , element :  <Message/>},
     { path: "assignments" , element :  <Assignment/>},
     { path: "setting" , element :  <Settings/>},
     { path: "logout" , element :  <Logout/>},
    ],
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </React.StrictMode>
);





