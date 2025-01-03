const User = require("../models/user.model");
const { ErrorHandler } = require("../utils/error");

module.exports = {
  addNew: async (req, res, next) => {
    try {
      let newUser = new User(req.body);
      let result = await newUser.save();
      if (!result) {
        return res.status(400).json({ message: "Error from data" });
      }
      return res.status(201).json({ message: "success" });
    } catch (error) {
      return next(new ErrorHandler(400, error.toString()));
    }
  },

  getAll: async (req, res, next) => {
    try {
      const { limit, page } = req.query;
      let data = {};
      let options = { limit: limit, page: page };
      let docs;
      if (limit && page) {
        docs = await User.paginate(data, options);
      } else {
        docs = await User.find(data);
      }

      return res.status(200).json(docs || []);
    } catch (error) {
      return next(new ErrorHandler(400, error.toString()));
    }
  },

  getOne: async (req, res, next) => {
    try {
      const doc = await User.findById(req.params?.id);
      if (!doc) {
        return res
          .status(404)
          .json({ message: `${req.params.id} user is not defined` });
      }
      return res.status(200).json(doc);
    } catch (error) {
      return next(new ErrorHandler(400, error.toString()));
    }
  },

  updateOne: async (req, res, next) => {
    try {
      const doc = await User.findById(req.params?.id);
      if (!doc) {
        return res
          .status(404)
          .json({ message: `${req.params.id} user is not defined` });
      }
      const updateDoc = await User.findByIdAndUpdate(req.params?.id, req?.body);
      if (!updateDoc) {
        return res
          .status(404)
          .json({ message: `${req.params.id} user not updated` });
      }

      return res.status(200).json({ message: "success" });
    } catch (error) {
      return next(new ErrorHandler(400, error.toString()));
    }
  },

  deleteOne: async (req, res, next) => {
    try {
      const doc = await User.findByIdAndDelete(req.params?.id);
      if (!doc) {
        return res
          .status(404)
          .json({ message: `${req.params.id} user is not defined` });
      }
      return res.status(200).json({ message: "success" });
    } catch (error) {
      return next(new ErrorHandler(400, error.toString()));
    }
  },
};
