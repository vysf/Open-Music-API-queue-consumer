/* eslint-disable linebreak-style */
require('dotenv').config();
const amqp = require('amqplib');
const config = require('./utils/config');

const PlaylistsService = require('./Service/PlaylistsService');
const SongsService = require('./Service/SongsService');
const Listener = require('./Listener');
const MailSender = require('./MailSender');

const init = async () => {
  const playlistsService = new PlaylistsService();
  const songsService = new SongsService();
  const mailSender = new MailSender();
  const listener = new Listener(playlistsService, songsService, mailSender);

  const connection = await amqp.connect(config.rabbitMq.server);
  const channel = await connection.createChannel();

  await channel.assertQueue('export:songsOnPlaylist', {
    durable: true,
  });

  channel.consume('export:songsOnPlaylist', listener.listen, {noAck: true});
};

init();
