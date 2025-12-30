const express = require('express');
const mongoose = require('mongoose');

const app = express();   // ✅ app sabse pehle initialize
const PORT = 5000;

// middleware
app.use(express.json());

// MongoDB URI
const uri = "mongodb+srv://hainychughria25_db_user:Hainy%4025052004@cluster0.kopkaqg.mongodb.net/?appName=Cluster0";

// MongoDB connection
mongoose.connect(uri)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("MongoDB Connection Error:", err));

// test db route
app.get('/test-db', async (req, res) => {
    res.send("Database is working!");
});

// default route
app.get('/', (req, res) => {
    res.send('Hello from Backend!');
});

// server start
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
