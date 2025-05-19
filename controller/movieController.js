const {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  removeMovie,
} = require("../service/movieService");

async function getMoviesController(req, res) {
  try {
    const movies = await getMovies();
    return res.json(movies);
  } catch (err) {
    console.error("Error getMoviesController:", err); // tambahkan ini
    return res.status(500).json({ error: "Gagal mengambil data movie" });
  }
}

async function getMovieController(req, res) {
  const { id } = req.params;
  const movie = await getMovieById(id);
  if (!movie) {
    return res.status(404).json({ error: "Movie tidak ditemukan" });
  }
  return res.json(movie);
}

async function createMovieController(req, res) {
  try {
    const movie = req.body;
    const id = await createMovie(movie);
    return res.status(201).json({ message: "Movie berhasil ditambahkan", id });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

async function updateMovieController(req, res) {
  try {
    const { id } = req.params;
    const updated = await updateMovie(id, req.body);
    if (!updated) {
      return res
        .status(404)
        .json({ error: "Movie tidak ditemukan atau tidak diubah" });
    }
    return res.json({ message: "Movie berhasil diperbarui" });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

async function deleteMovieController(req, res) {
  try {
    const { id } = req.params;
    const deleted = await removeMovie(id);
    if (!deleted) {
      return res.status(404).json({ error: "Movie tidak ditemukan" });
    }
    return res.json({ message: "Movie berhasil dihapus" });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

module.exports = {
  getMoviesController,
  getMovieController,
  createMovieController,
  updateMovieController,
  deleteMovieController,
};
