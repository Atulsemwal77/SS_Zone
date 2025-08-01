const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")
const { connect } = require("./config/database");
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true, // enable if using cookies/auth headers
  })
);
console.log("frontend url" , process.env.FRONTEND_URL)

const cart_route = require('./routes/cartRoute');
const wishlist_route = require('./routes/wishlistRoute')
const contact_route = require('./routes/contactRoute')
const comment_route = require("./routes/commentRouter")
const setting_route = require('./routes/settingRoute')
const announcement_route = require('./routes/announcementRoute')
const auth_Routes = require("./routes/auth.Route")
const course_route = require("./routes/CourseRoute")
const module_route = require("./routes/ModuleRoute")
const additionalInfo_route = require ('./routes/additionalInfoRoute');
const adminRouter = require("./routes/adminAuthRoute");
const instructorRouter = require("./routes/instructorRoute");
const blog_route = require("./routes/blogRoute")


app.use('/api/auth', auth_Routes);  //student
app.use('/api/cart' , cart_route);
app.use('/api/wishlist', wishlist_route)
app.use('/api/contact', contact_route)
app.use('/api/comment', comment_route)
app.use('/api/setting' , setting_route)
app.use('/api/ancument' , announcement_route)

app.use("/uploads", express.static("uploads"));  //multer 
app.use("/api/courses", course_route);
app.use('/api', module_route);
app.use("/api/additional-info", additionalInfo_route);

app.use("/api/blogs" , blog_route)



app.use("/api/admin", adminRouter)
app.use("/api/instructor", instructorRouter)

app.use("/" , (req , res)=>{
    return res.status(200).send({message : "Welcome to backend"})
})

connect();

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
