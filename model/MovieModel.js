const pool = require("../config/database");

async function getAllMovies({
  search,
  genre,
  sortBy = "nama_movie",
  sortOrder = "asc",
} = {}) {
  let query = "SELECT * FROM movie WHERE 1=1";
  const params = [];

  if (search) {
    query += " AND nama_movie LIKE ?";
    params.push(`%${search}%`);
  }

  if (genre) {
    query += " AND genre = ?";
    params.push(genre);
  }

  if (["nama_movie", "realese_movie"].includes(sortBy)) {
    query += ` ORDER BY ${sortBy} ${
      sortOrder.toUpperCase() === "DESC" ? "DESC" : "ASC"
    }`;
  }

  // Ganti db.execute dengan pool.query
  const [rows] = await pool.query(query, params);
  return rows;
}

const MovieModel = {
  getAllMovies,
  async getMovieById(id) {
    const [rows] = await pool.query("SELECT * FROM movie WHERE movie_id = ?", [
      id,
    ]);
    return rows[0];
  },

  async insertMovie(movie) {
    const {
      movie_id,
      genre_id,
      nama_movie,
      deskripsi_movie,
      duration_movie,
      realese_movie,
      sampul_depan,
      sampul_belakang,
      video_movie,
      video_trailler,
    } = movie;

    const query = `
      INSERT INTO movie (
        movie_id, genre_id, nama_movie, deskripsi_movie,
        duration_movie, realese_movie, sampul_depan,
        sampul_belakang, video_movie, video_trailler
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      movie_id,
      genre_id,
      nama_movie,
      deskripsi_movie,
      duration_movie,
      realese_movie,
      sampul_depan,
      sampul_belakang,
      video_movie,
      video_trailler,
    ];

    const [result] = await pool.query(query, values);
    return result.insertId;
  },

  async updateMovie(movie_id, movie) {
    const {
      genre_id,
      nama_movie,
      deskripsi_movie,
      duration_movie,
      realese_movie,
      sampul_depan,
      sampul_belakang,
      video_movie,
      video_trailler,
    } = movie;

    const query = `
      UPDATE movie SET
        genre_id = ?, nama_movie = ?, deskripsi_movie = ?,
        duration_movie = ?, realese_movie = ?, sampul_depan = ?,
        sampul_belakang = ?, video_movie = ?, video_trailler = ?
      WHERE movie_id = ?
    `;

    const values = [
      genre_id,
      nama_movie,
      deskripsi_movie,
      duration_movie,
      realese_movie,
      sampul_depan,
      sampul_belakang,
      video_movie,
      video_trailler,
      movie_id,
    ];

    const [result] = await pool.query(query, values);
    return result.affectedRows > 0;
  },

  async deleteMovie(movie_id) {
    const [result] = await pool.query("DELETE FROM movie WHERE movie_id = ?", [
      movie_id,
    ]);
    return result.affectedRows > 0;
  },
};

module.exports = MovieModel;
