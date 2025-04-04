const express = require('express');

// const connectDB = require('./config/db');

const fileRoutes = require('./routes/fileRoutes');
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const { cleanupFiles } = require('./utils/cleanup');

dotenv.config();
const app = express();

// connectDB();
app.use(express.json());
app.use(express.static('public')); 

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 15, // Max 15 requests per IP
    message: 'Too many request, please try again later',
  });

app.get('/', (req, res) => {
    res.redirect('/api-docs');
});

app.use('/api',limiter, fileRoutes);

const swaggerDocument = yaml.load('./swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Cleanup old files every 24 hours
setInterval(cleanupFiles, 24 * 60 * 60 * 1000); // 24 hours in milliseconds
cleanupFiles(); // Run once on startup

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));