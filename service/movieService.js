const MovieModel = require("../model/MovieModel");

async function getMovies() {
  return await MovieModel.getAllMovies();
}

async function getMovieById(id) {
  return await MovieModel.getMovieById(id);
}

async function createMovie(movie) {
  return await MovieModel.insertMovie(movie);
}

async function updateMovie(movie_id, movie) {
  return await MovieModel.updateMovie(movie_id, movie);
}

async function removeMovie(movie_id) {
  return await MovieModel.deleteMovie(movie_id);
}

module.exports = {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  removeMovie,
};
