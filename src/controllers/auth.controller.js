const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bluebird = require("bluebird");
const { ErrorHandler } = require("../utils/error");
bluebird.promisifyAll(jwt);

module.exports = {
  userAuth: async (req, res, next) => {
    try {
      const userDoc = await User.findOne({ email: req.body?.email });
      if (!userDoc) {
        return res.status(404).json({ message: "User is not fount" });
      }
      if (userDoc?.password == req.body?.password) {
        const token = jwt.sign(
          {
            _id: userDoc?._id,
            firstName: userDoc.firstName,
            email: userDoc?.email,
          },
          process.env.TOKEN_SECRET_KEY,
          {
            algorithm: "HS256",
            expiresIn: process.env.TOKEN_EXPIRESIN,
          }
        );

        return res.status(200).json({ token });
      } else {
        return res.status(404).json({ message: "User is not found" });
      }
    } catch (error) {
      return next(new ErrorHandler(400, error.toString()));
    }
  },

  adminAuth: async (req, res, next) => {
    console.log();

    try {
      if (
        process.env.ADMIN_EMAIL == req.body.email &&
        process.env.ADMIN_PASSWORD == req.body.password
      ) {
        const token = jwt.sign(
          {
            _id: null,
            firstName: "CodemyAdmin",
          },
          process.env.TOKEN_SECRET_KEY,
          {
            algorithm: "HS256",
            expiresIn: process.env.TOKEN_EXPIRESIN,
          }
        );

        return res.status(200).json({ token });
      } else {
        return res.status(404).json({ message: "User | Admin is not defined" });
      }
    } catch (error) {
      return next(new ErrorHandler(400, error.toString()));
    }
  },
};
