const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Initialize the enviornment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

//Routes
const authRoutes = require('./routes/auth');
const tagsRoutes = require('./routes/tags');
const upoadRoutes = require('./routes/upload');
const settingsRoute = require('./routes/settings');
const artifactsRoutes = require('./routes/artifacts');

//Use Routes
app.use('/auth', authRoutes);
app.use('/tags', tagsRoutes);
app.use('/upload', upoadRoutes);
app.use('/settings', settingsRoute);
app.use('/artifacts', artifactsRoutes);

// Port
const PORT = process.env.PORT;

// Server
app.listen(PORT, () => console.log(`SERVER IS RUNNING ON PORT ${PORT}`));