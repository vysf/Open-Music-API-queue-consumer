/* eslint-disable linebreak-style */
const nodemailer = require('nodemailer');
const config = require('./utils/config');

/**
 * mengurus pengiriman email
 */
class MailSender {
  /**
   * inisialisasi
   */
  constructor() {
    this.__transporter = nodemailer.createTransport({
      host: config.email.host,
      port: config.email.port,
      auth: {
        user: config.email.user,
        pass: config.email.pass,
      },
    });
  }

  /**
   * mengirim email
   * @param {string} targetEmail email tujuan
   * @param {string} playlistName nama playlis
   * @param {string} content konten
   * @return {void} transporter send email by nodemailer
   */
  sendEmail(targetEmail, playlistName, content) {
    const message = {
      from: 'OpenMusic App',
      to: targetEmail,
      subject: `Ekspor playlist ${playlistName}`,
      text: `Terlampir sebuah playlist lagu: ${playlistName}`,
      attachments: [
        {
          filename: `${playlistName}-${+new Date()}.json`,
          content,
        },
      ],
    };

    return this.__transporter.sendMail(message);
  }
}

module.exports = MailSender;
