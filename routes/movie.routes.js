const { Router } = require("express");
const { check } = require("express-validator");
const { createMovie, getAllMovies, putMovie, getMoviesByGender, getMoviesByName, saveUserMovie } = require("../controllers/movie_Controller");
const validarJWT = require("../middleware/validar-jwt");
const validateFields = require("../middleware/validateFields");
const validateRoleAndjwt = require("../middleware/validateRoleAndjwt");

const router = Router();

router.post(
  "/",
  [
    validateRoleAndjwt,
    check("title", "Title is required").not().isEmpty(),
    check("gender", "gender is required").not().isEmpty(),
    validateFields,
  ],
  createMovie
);

router.get("/", validarJWT, getAllMovies);

router.put("/change-movie/:movie_id", validateRoleAndjwt, putMovie);

router.get("/:gender", validarJWT, getMoviesByGender);

router.get("/search/:title", getMoviesByName);

router.put("/usermovies", validarJWT, saveUserMovie);

module.exports = router;
