var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ObjectId = mongoose.Schema.Types.ObjectId;




var noteSchema = new Schema({

  textNote: {
    type: String
  },
  color: {
    type: String
  },
  isActive: {
    type: Boolean
  },
  date: {
    type: Date,
    default: Date.now
  },
  lastupdatedate:{
    type:Date,
    default:Date.now
  }
});

mongoose.model('notes', noteSchema);
