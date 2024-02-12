module.exports = {
  log: {
    level: 'info',
    disabled: false,
  },
  cors: {
    origins: ['http://localhost:5173', 'http://localhost:4173'],
    maxAge: 3 * 60 * 60,
  },
};