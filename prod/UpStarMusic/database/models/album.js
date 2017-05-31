// Todo: create Album Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
	title: {
		type: String,
		validate: {
			validator: (title) => title.length > 0,
			message: 'Title is mandatory.'
		},
		required: [true, 'Title is mandatory.']
	},
  date: {
    type: Date,
    validate: {
      validator: (date) => date.length > 0,
      message: 'Date is mandatory.'
    },
  },
  copiesSold: {
    type: Number,
    validate: {
      validator: (copiesSold) => copiesSold >= 0,
      message: 'Copies Sold is mandatory.'
    },
  },
  numberTracks: {
    type: Number,
    validate: {
      validator: (numberTracks) => numberTracks > 0,
      message: 'Number Of Tracks is mandatory.'
    },
  },
  image: {
    type: String,
    validate: {
      validator: (image) => image.length > 0,
      message: 'Image is Mandatory'
    },
  },
  revenue: {
    type: Number,
    validate: {
      validator: (revenue) => revenue >= 0,
      message: 'Revenue is Mandatory'
    },
  }
});

module.exports = AlbumSchema;
