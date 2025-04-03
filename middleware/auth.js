const dotenv = require('dotenv');
dotenv.config();

const auth = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  console.log('Received API Key:', apiKey);
  console.log('Expected API Key:', process.env.API_KEY);
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({ message: 'Invalid or missing API key' });
  }
  next();
};

module.exports = auth;