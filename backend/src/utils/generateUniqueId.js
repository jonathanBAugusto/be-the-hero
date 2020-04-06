const crypto = require('crypto');

module.exports = __ => crypto.randomBytes(4).toString('HEX');
