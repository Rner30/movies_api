const { request, response } = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateJWT = require("../middleware/generateJWT");

const createUser = async (req = request, res = response) => {
  const { email, password, name, role } = req.body;

  try {
    const verifyIfUserExists = await User.findOne({ email });
    if (verifyIfUserExists) {
      return res.json({
        msg: "User already exists",
      });
    }
    const salt = bcrypt.genSaltSync(10);
    const passwordHashed = bcrypt.hashSync(password, salt);

    const data = {
      email,
      password: passwordHashed,
      name,
      role,
    };
    const newUser = new User(data);

    const jwtToken = await generateJWT(newUser.id);

    await newUser.save();

    res.json({
      user: newUser,
      token: jwtToken,
    });
  } catch (error) {
    res.json({ msg: "Error talk with an admin" });
  }
};
const loginUser = async (req = request, res = response) => {
  const { email, password } = req.body;

  const verifyIfUserExists = await User.findOne({ email }).populate(
    "movies.movie_id"
  );

  if (!verifyIfUserExists) {
    return res.json({
      msg: "Your email are not register",
    });
  }

  const comparePasswords = bcrypt.compareSync(
    password,
    verifyIfUserExists.password
  );

  const jwtToken = await generateJWT(verifyIfUserExists.id);

  if (comparePasswords) {
    return res.json({
      user: verifyIfUserExists,
      token: jwtToken,
    });
  }

  return res.json({
    msg: "Error, talk with an admin",
  });
};

const deleteUser = async (req = request, res = response) => {
  const { user_id } = req.params;

  try {
    await User.findByIdAndRemove(user_id);
    res.json({
      msg: "Usuario eliminado",
    });
  } catch (error) {
    res.json({
      msg: "no se pudo eliminar al usuario",
    });
  }
};

const changePassowrd = async (req = request, res = response) => {
  const { id } = req.user;
  const { newPassword } = req.body;
  try {
    const salt = bcrypt.genSaltSync(10);

    const passwordHashed = bcrypt.hashSync(newPassword, salt);

    await User.findByIdAndUpdate({ _id: id }, { password: passwordHashed });

    res.json({ msg: "Password changed" });
  } catch (error) {
    console.log(error);
    res.json({
      msg: "Error, could not change password, please talk with an admin",
    });
  }
};
const changeEmail = async (req = request, res = response) => {
  const { id } = req.user;
  const { newEmail } = req.body;

  try {
    await User.findByIdAndUpdate({ _id: id }, { email: newEmail });
    res.json({ msg: `Email changed to ${newEmail}` });
  } catch (error) {
    console.log(error);
    res.json({ msg: "Error" });
  }
};

module.exports = {
    createUser,
    loginUser,
    deleteUser,
    changeEmail,
    changePassowrd
}