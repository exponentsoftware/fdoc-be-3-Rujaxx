const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse');


// Grant access to specific roles
exports.authorize = (...roles) => {
    return (req, res, next) => {
      let _id = req.body.user
      const user =  User.findById({_id});
      console.log(user.role)
      if (!roles.includes(user.role)) {
        return next(
          new ErrorResponse(
            `User role ${user.role} is not authorized to access this route`,
            403
          )
        );
      }
      next();
    };
  };