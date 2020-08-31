const express = require('express');
const testimonials = require('./routes/testimonials.routes');
const cors = require('cors')
const concerts = require('./routes/concerts.routes');
const seats = require('./routes/seats.routes');
const path = require('path');
const socket = require('socket.io');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', testimonials);
app.use('/api', concerts);
app.use('/api', seats);

//mongoose.connect('mongodb+srv://martab2525:<polki890>@cluster0.waktd.mongodb.net/<NewWaveDB>?retryWrites=true&w=majority', { useNewUrlParser: true });

const dbURI = process.env.NODE_ENV === 'production' ? `mongodb+srv://martab2525:<polki890>@cluster0.waktd.mongodb.net/${process.env.TEST_NAME}?retryWrites=true&w=majority` : 'mongodb://localhost:27017/NewWaveDB';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

app.use(express.static(path.join(__dirname, '/client/build')));

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).json({message: '404 not found...'});
})

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', () => {
  console.log('New socket!');
});