const mongoose = require('mongoose');
require('dotenv').config({ path: './backend/.env' })

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDB;