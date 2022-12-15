/* eslint-disable linebreak-style */
/**
 * listener
 */
class Listener {
  /**
   * inisialisasi
   * @param {class} playlistsService servis playlis
   * @param {class} songsService servis lagu
   * @param {class} mailSender pengirim email
   */
  constructor(playlistsService, songsService, mailSender) {
    this.__playlistsService = playlistsService;
    this.__songsService = songsService;
    this.__mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  /**
   * listen
   * @param {object} message pesan ke message broker
   */
  async listen(message) {
    try {
      const {playlistId, targetEmail} = JSON.parse(message.content.toString());

      const playlist = await this.__playlistsService
          .getPlaylistById(playlistId);
      const songs = await this.__songsService.getSongsByPlaylistId(playlistId);

      playlist.songs = songs;

      const result = await this.__mailSender
          .sendEmail(targetEmail, playlist.name, JSON.stringify({playlist}));
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Listener;
