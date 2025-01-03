const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, minlength: 2, maxlength: 200, required: true },
    lastName: { type: String, minlength: 2, maxlength: 200 },
    email: { type: String, required: true, unique: true },
    dateOfBirth: { type: String },
    password: { type: String, minlength: 8, maxlength: 16, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("users", UserSchema);
