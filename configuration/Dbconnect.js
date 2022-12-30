const mongoose = require('mongoose');

const url = 'mongodb://127.0.0.1:27017/urlShortener';

const connectDB = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('database is connected Successfully');
  } 
  catch (err) 
  {console.log(err);}
};

module.exports = connectDB;
