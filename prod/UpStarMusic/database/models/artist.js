// Todo: Create Artist Model

const mongoose = require('mongoose');
const AlbumSchema = require('./album');
const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 0,
      message: 'Name is Mandatory.'
    },
    required: [true, 'Name is required.'],
  },
  age: {
    type: Number,
    validate: {
      validator: (age) => age > 0,
      message: 'Age is Mandatory and must be > 0'
    },
    required: [true, 'Age is Mandatory and must be > 0'],
  },
  yearsActive: {
    type: Number,
    validate: {
      validator: (yearsActive) => yearsActive >= 0,
      message: 'Years Active is Mandatory'
    },
    required: [true, 'Years Active is Mandatory'],
  },
  image: {
    type: String,
    validate: {
      validator: (image) => image.length > 0,
      message: 'Image is Mandatory'
    },
  },
  genre: {
    type: String,
    validate: {
      validator: (genre) => genre.length > 0,
      message: 'Genre is Mandatory'
    },
    required: [true, 'Genre is Mandatory'],
  },
  website: {
    type: String,
    validate: {
      validator: (website) => website.length > 0,
      message: 'Web Site is Mandatory'
    },
  },
  netWorth: {
    type: Number,
    validate: {
      validator: (netWorth) => yearsActive >= 0,
      message: 'Net Worth is Mandatory'
    },
  },
  labelName: {
    type: String,
    validate: {
      validator: (labelName) => labelName.length > 0,
      message: 'Label Name is Mandatory'
    },
  },
  retired: {
    type: Boolean,
  },
  albums: [AlbumSchema]	//Sub Document
});

const Artist = mongoose.model('artist', ArtistSchema);

module.exports = Artist;
