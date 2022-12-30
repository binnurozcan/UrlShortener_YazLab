const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const shortId = require('shortid')
const randomstring = require('randomstring');


const URLSchema = new Schema(
  {
    original_url: { // kullanicinin girdigi
      type: String,
      required: true,
    },
    current_url: { //localhost
      type: String,
      required: true,
    },
    custom_url: { //ozel url
      type: String,
      //required: true,
    },
    created_at: { // tarih
      type: Date,
      required: true,
      default: Date.now(),
    },
    short_url: { //kod
      type: String,
      required: true,
      //unique: true,
      default: randomstring.generate(7)
    },
    clicks: { //tiklanma 
      type:Number,
      required: true,
      default: 0
    }
  }
);


module.exports = mongoose.model('short_urls', URLSchema);
