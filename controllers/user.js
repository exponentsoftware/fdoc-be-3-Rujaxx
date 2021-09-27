const User = require('../models/User')
const asyncHandler = require('../middlewares/async')
const ErrorResponse = require('../utils/errorResponse');


// @desc      Get all users
// @route     GET /api/v1/users
// @access    Public
exports.getUsers = asyncHandler(async(req,res,next) => {
  let query 

  query = User.find(req.query)
  
  //Sorting
  if(req.query.sort){
    const sortBy = req.query.sort.split(",").join(" ")
    query = query.sort(sortBy);
  }else{
    query = query.sort("-createdAt")
  }

  const users = await query;
    res.status(200).json({
        success : true,
        count : users.length,
        data : users
    })
})

// @desc      Get a task
// @route     GET /api/v1/tasks/:id
// @access    Public
exports.getUser = asyncHandler(async(req,res,next) => {
    const user = await User.findById(req.params.id);

    if(!user){
        res.status(400).json({
            success : false,
            message : "user not found"
        })
    }

    res.status(200).json({
        success : true,
        data : user
    })
})

// @desc      add a task
// @route     POST /api/v1/tasks
// @access    Public
exports.addUser = asyncHandler(async(req,res,next) => {
    const { username,email,password,phone,role } = req.body;


    //Create a user
    const user = await User.create({
        username,
        email,
        password,
        phone,
        role
    })
    res.status(200).json({
        success : true,
        data : user,
        message : "User created successfully"
    })
})

// @desc      update a task
// @route     PUT /api/v1/tasks/:id
// @access    Public
exports.updateUser = asyncHandler(async(req,res,next) => {
    const user = await User.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
        validators : true
    });

    if(!user){
        res.status(400).json({
            success : false,
            message : "user not found"
        })
    }

    res.status(200).json({
        success : true,
        data : user
    })
})


// @desc      DELETE a task
// @route     DELETE /api/v1/tasks/:id
// @access    Public
exports.deleteUser = asyncHandler(async(req,res,next) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if(!user){
        res.status(400).json({
            success : false,
            message : "user not found"
        })
    }

    res.status(200).json({
        success:true,
        message: "deleted succesfully"
      })
})