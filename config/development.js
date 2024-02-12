module.exports = {
  port: 9000,
  log: {
    level: 'silly',
    disabled: false,
  },
  cors: {
    origins: ['http://localhost:5173', 'http://localhost:4173'],
    maxAge: 3 * 60 * 60,
  },
};