require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB:', mongoose.connection.name);
});
mongoose.connection.on('error', (err) => {
    console.log('MongoDB connection error:', err);
});

// Routes
const userRoutes = require('./routes/userRoutes');
const mealRoutes = require('./routes/mealRoutes');

app.use('/users', userRoutes);
app.use('/meals', mealRoutes);

app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
});

console.log("asfsdagdsag")
