const Concert = require('../models/concert.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Concert.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getId = async (req, res) => {
  try {
    const dep = await Concert.findById(req.params.id);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};





exports.getPerformer = async (req, res) => {
  try {
    const dep = await Concert.find({ performer: req.params.performer });
    if(!dep.length) {
      res.status(404).json({ message: 'Not found' });
    }
    else {
      res.json(dep);
    }
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getGenre = async (req, res) => {
  try {
    const dep = await Concert.find({ genre: req.params.genre });
    if(!dep.length) {
      res.status(404).json({ message: 'Not found' });
    }
    else {
      res.json(dep);
    }
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getDay = async (req, res) => {
  try {
    const dep = await Concert.find({ day: req.params.day });
    if(!dep.length) {
      res.status(404).json({ message: 'Not found' });
    }
    else {
      res.json(dep);
    }
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getPrice = async (req, res) => {
  try {
    const dep = await Concert.find({ price: {$gte: req.params.price_min, $lte: req.params.price_max} });
    if(!dep.length) {
      res.status(404).json({ message: 'Not found' });
    }
    else {
      res.json(dep);
    }
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};







exports.postAll = async (req, res) => {
  try {
    const { name } = req.body;
    const newConcert = new Concert({ name: name });
    await newConcert.save();
    res.json( newConcert );
  } 
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.putId = async (req, res) => {
  const { name } = req.body;
  try {
    const dep = await(Concert.findById(req.params.id));
    if(dep) {
      await Concert.updateOne({ _id: req.params.id }, { $set: { name: name }});
      res.json( dep );
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteId = async (req, res) => {
  try {
    const dep = await(Concert.findById(req.params.id));
    if(dep) {
      await Concert.deleteOne({ _id: req.params.id });
      res.json( dep );
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};