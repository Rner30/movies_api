const { response, request } = require("express");
const Movie = require("../models/Movie");
const User = require("../models/User");

const createMovie = async (req = request, res = response) => {
  const { title, description, gender, image } = req.body;

  const findMovie = await Movie.findOne({ title });

  if (findMovie) {
    return res.json({
      msg: "This movie is already listed",
    });
  }

  const data = {
    title,
    description,
    gender: gender.toLowerCase(),
    image,
  };

  const newMovie = new Movie(data);

  await newMovie.save();

  res.json({ msg: `${title} has been listed now` });
};

const getAllMovies = async (req = request, res = response) => {
  const findAllMovies = await Movie.find();
  res.json(findAllMovies);
};

const putMovie = async (req = request, res = response) => {
  const { movie_id } = req.params;
  const { title, description, image, gender } = req.body;

  try {
    const verifyMovie = await Movie.findByIdAndUpdate(
      { _id: movie_id },
      { title, description, image, gender }
    );

    if (!verifyMovie) {
      return res.json({
        msg: "Error, the movie does not exist",
      });
    }
    res.json({
      msg: "The movie was updated",
    });
  } catch (error) {
    console.log(error);
    res.json({
      msg: "Error changing movie data",
    });
  }
};

const getMoviesByGender = async (req = request, res = response) => {
  const { gender } = req.params;

  const movies = await Movie.find({ gender });

  return res.json(movies);
};

const getMoviesByName = async (req = request, res = response) => {
  const { title } = req.params;

  const findMovies = await Movie.find({
    title: { $regex: title, $options: "i" },
  });

  if (!findMovies) {
    return res.json({
      msg: "Any movie has that name",
    });
  }

  return res.json(findMovies);
};

const saveUserMovie = async (req = request, res = response) => {
  const { email } = req.user;
  const { movies } = req.body;

  const verifyUser = await User.findOne({ email });

  if (!verifyUser) {
    return res.json({
      msg: "User no exists",
    });
  }

  const updateUser = await User.findOneAndUpdate(
    { email },
    { movies }
  ).populate("movies.movie_id");

  res.json(updateUser);
};

module.exports = {
  createMovie,
  getAllMovies,
  putMovie,
  getMoviesByName,
  saveUserMovie,
  getMoviesByGender
};
