const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Library Management API is running');
});

const booksRouter = require('./routes/books');
app.use('/api/books', booksRouter);

const authRouter = require('./routes/auth');
app.use('/api/auth', authRouter);

const chatbotRouter = require('./routes/chatbot');
app.use('/api/chatbot', chatbotRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
