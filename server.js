const express = require('express');
const testimonials = require('./routes/testimonials.routes');
const cors = require('cors')
const concerts = require('./routes/concerts.routes');
const seats = require('./routes/seats.routes');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', testimonials);
app.use('/api', concerts);
app.use('/api', seats);

app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).json({message: '404 not found...'});
})

app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
}); 