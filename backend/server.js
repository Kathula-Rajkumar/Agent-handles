const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

// Import routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/agent', require('./routes/agent'));
app.use('/api/list', require('./routes/list'));

// Connect to MongoDB and Start Server
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected');
        app.listen(process.env.PORT, () => {
            console.log(`Server started on port ${process.env.PORT}`);
        });
    })
    .catch(err => console.log(err));
