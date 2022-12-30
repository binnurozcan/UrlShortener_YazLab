const express = require('express');
const app = express();
const expressEJs = require('express-ejs-layouts');
const connectDB = require('./configuration/Dbconnect');
const URLS = require('./models/ShortURL');


//veritabani baglantisi
connectDB();

//ejs layout
app.use(expressEJs);

//view render
app.set('view engine', 'ejs');

//setup static
app.use(express.static(__dirname + '/assests'));

// post datasını yakalama
app.use(express.urlencoded({ extended: true }));

//global variables
app.use((req, res, next) => {
  res.locals.current_url =
    req.protocol + '://' + req.get('host') + req.originalUrl;
  next();
});

//sayfa
app.get('/', (req, res) => {
  res.render('index');
  
});

//post request
app.post('/', async (req, res) => {
  let errors = [];
  const { original_url, current_url, custom_url, short_url } = req.body;

  if (!original_url ) { //URL alani bos ise 
    errors.push({ msg: 'URL giriniz' });
  }
  else { // custom_url
    const URL = new URLS({
      original_url,
      current_url,
      custom_url,  
    },
    res.render('index', {
      original_url,
      current_url,
      custom_url,
    }));
    
    URL.save();
  }
});
//website
app.get('/:custom_url', async (req, res) => {
  const redirectUrl = await URLS.findOne({ custom_url: req.params.custom_url });
  const redirectUrlCount = await URLS.findOne({custom_url: req.params.custom_url,}).countDocuments();
  
  if (redirectUrlCount) {
    res.redirect(redirectUrl.original_url);
  } else {
    res.send('404 LINK NOT FOUND ');
  }
});
//port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server is running on port ${port}`));
