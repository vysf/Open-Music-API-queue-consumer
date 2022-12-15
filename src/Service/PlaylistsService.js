/* eslint-disable linebreak-style */
const {Pool} = require('pg');

/**
 * servis playlis
 */
class PlaylistsService {
  /**
   * inisialisasi pooling
   */
  constructor() {
    this.__pool = new Pool();
  }

  /**
   * mendapatkan sebuah playlis
   * @param {string} playlistId id playlis
   * @return {object} objek playlis
   */
  async getPlaylistById(playlistId) {
    const query = {
      text: 'SELECT id, name FROM playlists WHERE id = $1',
      values: [playlistId],
    };

    const result = await this.__pool.query(query);

    return result.rows[0];
  }
}

module.exports = PlaylistsService;
