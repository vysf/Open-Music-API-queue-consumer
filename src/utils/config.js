/* eslint-disable linebreak-style */
const config = {
  rabbitMq: {
    server: process.env.RABBITMQ_SERVER,
  },
  email: {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    user: process.env.MAIL_ADDRESS,
    pass: process.env.MAIL_PASSWORD,
  },
};

module.exports = config;
