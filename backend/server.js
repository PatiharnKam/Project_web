require("dotenv").config();
var cors = require('cors')
var mongoose = require('mongoose')
var express = require('express')
var app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

port = process.env.PORT || 3000

User = require('./models/Model')
Meal = require('./models/Model')

// mongoose.connect('mongodb://127.0.0.1:27017/Userdb', function(err) {
//     if (err) {
//         console.log('Error in Mongoose connection')
//         throw err
//     }
//     console.log('Mongoose connected')
// }
// )

// async function connectDB() {
//     try {
//       await mongoose.connect('mongodb://127.0.0.1:27017/Userdb', {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       });
//       console.log('Database connected successfully');
//     } catch (error) {
//       console.error('Database connection error:', error);
//     }
//   }
  
// connectDB();
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));


mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB!',mongoose.connection.name);
});
mongoose.connection.on('error', (err) => {
    console.log('MongoDB connection error:', err);
});


var routes = require('./routes/Routes')
routes(app)
app.listen(port)
console.log('User list server started on: ' + port)
console.log()