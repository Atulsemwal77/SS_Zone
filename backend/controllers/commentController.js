const Comment = require("../models/commentModel");

const postComment = async (req, res) => {
  try {
    const { firstName, lastName, phone, email, comment } = req.body;
    const commentdata = new Comment({
      firstName,
      lastName,
      phone,
      email,
      comment,
    });
    const saveComment = await commentdata.save();
    res.status(201).send({
      success: true,
      message: "Comment Save",
      data: saveComment,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Comment Section",
    });
  }
};

const getComment = async (req , res)=>{
    try {
        const newComment = await Comment.find()
        res.status(200).send({
            success : true,
            message : "Get Comment",
            data : newComment
        })
    } catch (error) {
        res.status(500).send({
            success : false,
            message : "Faild to get Comments"

        })
    }
} 

const dltComment = async (req, res)=>{
    try {
    const  id = req.params.id ;
    const dltComment = await Comment.findByIdAndDelete(id)

    if(!dltComment){
        return res.status(400).send({
            success : false,
            message : "Items not found"
        }) 
    }
    res.status(200).send({
        success : true ,
        message : "Items Deleted" ,
        data : dltComment
    })
    } catch (error) {
        res.status(400).send({
            success : false,
            message : "Error to delete comment"
        })
    }
}

module.exports = {
  postComment,
  getComment,
  dltComment
};
