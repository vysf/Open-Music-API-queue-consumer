/* eslint-disable linebreak-style */
const {Pool} = require('pg');

/**
 * servis lagu
 */
class SongsService {
  /**
   * inisialisasi pooling
   */
  constructor() {
    this.__pool = new Pool();
  }

  /**
   * mendapatkan semua lagu dalam sebuah playlis
   * @param {string} playlistId id playlis
   * @return {array} daftar lagu
   */
  async getSongsByPlaylistId(playlistId) {
    const query = {
      text: `SELECT songs.id, songs.title, songs.performer FROM songs
      LEFT JOIN playlists_songs ON playlists_songs.song_id = songs.id
      WHERE playlists_songs.playlist_id = $1`,
      values: [playlistId],
    };

    const result = await this.__pool.query(query);

    return result.rows;
  }
}

module.exports = SongsService;
