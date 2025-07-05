const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const DB_URI = process.env.DB_URI;

// const connectDB = () => {
//   const connection = mongoose.createConnection(DB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   });

//   connection.on('connected', () => {
//     console.log('✅ MongoDB connected');
//   });

//   connection.on('error', (err) => {
//     console.error('❌ MongoDB connection error:');
//   });

//   return connection;
// };

    async function connectDB() {
        try {
            await mongoose.connect(DB_URI);
            console.log('MongoDB connected successfully!');
        } catch (error) {
            console.error('MongoDB connection error:', error);
        }
    }

;

module.exports = connectDB;
