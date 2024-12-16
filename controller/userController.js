const User = require("../model/userModel");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const customError = require("../utils/customError");

exports.signUp = asyncErrorHandler(async (req, res, next) => {
  const newUser = await User.create(req.body);

  res.status(200).json({
    status: "success",
    message: "user created successfully",
    newUser,
  });
});

exports.login = asyncErrorHandler(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    const error = new customError(
      "साले बिना ID & PASSWORD के कहाँ जायेगा|",
      400
    );
    return next(error);
  }
  const user = await User.findOne({ username }).select("+password");

  const comparePassword = await user.comparePasswordInDB(
    password,
    user.password
  );

  if (!user || !comparePassword) {
    const error = new customError(
      "रुक admin को बोलता करता हु | तू तो admin से बिना पूछे आया है |",
      400
    );
    return next(error);
  }

  res.status(200).json({
    status: "success",
    msg: "permission लेकर आया है ना admin से ?",
    user,
  });
});
