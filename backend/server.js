const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
// var  authController = require("./routes/auth")

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/api/items', require('./routes/items'));
app.use('/api/auth/', require('./routes/auth'));
app.use(express.static(path.join(__dirname, '../frontend-files')));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Sample route
app.get('/api', (req, res) => {
    res.json({ message: 'Welcome to the API!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});