const express = require('express');
const connectDB = require('./config/db');
const fileRoutes = require('./routes/fileRoutes');
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api', fileRoutes);

// Swagger Documentation
const swaggerDocument = yaml.load('./swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));