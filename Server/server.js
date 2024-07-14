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
const schoolRoutes = require('./routes/schools');
const labRoutes = require('./routes/labs');
const equipmentRoutes = require('./routes/equipments');
const usersRoutes = require('./routes/users');

//Use Routes
app.use('/auth', authRoutes);
app.use('/tags', tagsRoutes);
app.use('/upload', upoadRoutes);
app.use('/settings', settingsRoute);
app.use('/artifacts', artifactsRoutes);
app.use('/schools', schoolRoutes);
app.use('/labs', labRoutes);
app.use('/equipments', equipmentRoutes);
app.use('/users', usersRoutes);

// Port
const PORT = process.env.PORT;

// Server
app.listen(PORT, () => console.log(`SERVER IS RUNNING ON PORT ${PORT}`));