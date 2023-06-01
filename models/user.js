const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password") || this.isNew) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  } else {
    return next();
  }
});

userSchema.methods.comparePassword = (password, cb) => {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

module.exports = mongoose.model("User", userSchema);
