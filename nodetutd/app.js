const express = require('express');
const app = express();
app.set('view engine', 'ejs');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const Product = require('./models/product');
const Ledger = require('./models/ledger');
const passport = require('passport');
const Strategy = require('passport-local').Strategy
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const bodyParser = require('body-parser');
const sessionSecret = process.env.SESSION_SECRET || 'Jesus is King of Kings';
const adminPassword = process.env.ADMIN_PASSWORD || 'iamphiliptheevangelist';
passport.use(
   new Strategy(function (username, password, cb) {
      const isAdmin = (username === 'Phil_dev') && (password === adminPassword);
      if (isAdmin) {
         return cb(null, { username: 'Phil_dev' });
      }
      return cb(null, false); 
   })
);
   passport.serializeUser((user, cb) => cb(null, user))
passport.deserializeUser((user, cb) => cb(null, user))

const dbURI = 'mongodb+srv://phil_web:test123@cluster0.wsfgf9o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(dbURI)
.then((result) => {app.listen(3000, () => {console.log('listening at port 3000')})})
.catch((err) => console.log(err));

// register view engine

app.use(express.static('public'));
 app.use(express.urlencoded({extended:true}));


app.use(bodyParser.json())

app.use(cookieParser())

app.use(expressSession({secret: sessionSecret,resave: false,
saveUninitialized: false}))

app.use(passport.initialize())

app.use(passport.session())


   function ensureAdmin (req, res, next) {
      const isAdmin = req.user && req.user.username === 'Phil_dev'
      if (isAdmin) 
         return next()
      res.redirect('/logging')
     // res.status(401).json({ error: 'Unauthorized' })
      }


app.get('/logging', (req, res)=>{
         res.render('login');
      });

 app.post('/login', passport.authenticate('local'), (req, res) =>
         res.redirect('/home')
         )

 
/*app.get('/add-blog', (req, res)=> {
   const newBlog =new Blog({
      title: 'new blog 2',
      snippet: 'About this blog',
      body: 'my new blog'
   });
   newBlog.save()
   .then((result)=>{res.send(result)})
   .catch((err)=> console.log(err));
});
app.get('/all-blogs', (req, res) => {
   Blog.find()
   .then((result)=> res.send(result))
   .catch((err) => console.log(err));
});

app.get('/single-blog', (req, res)=> {
   Blog.findById()
})*/


 app.get('/', (req, res)=>{

    res.render('index');
  //  res.send('<p><b>Home page</b></p>');
 });
 app.get('/home', (req, res) => {
   res.render('index')
});



app.get('/edu', (req, res) => {
   res.render('education');
});

app.get('/makepdt',ensureAdmin, (req, res) => {
   res.render('add-product');
});

app.get('/checkout', (req, res) => {
   res.render('checkout');
});

app.get('/add-blogs',ensureAdmin, (req, res) => {
   res.render('add-blog');
});

app.get('/about', (req, res) => {
   res.render('about');
});

app.post('/shop', ensureAdmin, (req, res)=>{
   const prod = new Product(req.body);
   prod.save()
   .then((result) => {
      res.render('shop', {products: result})
    })  
    .catch((err) => console.log(err));
    });

    app.get('/shop', (req, res) => {
      Product.find().sort({createdAt: -1})
     .then((result) =>{ 
       res.render('shop',{products: result})
     })
     .catch((err) => console.log(err));
   });
   

app.post('/blogs', ensureAdmin, (req, res)=>{
  const create = new Blog(req.body);
  create.save()
  .then((result) => {
   res.render('blogs', {blogs: result})
   })
   .catch((err) => console.log(err));
   });
   
   app.get('/post/:id', (req, res) => {
   
      const id = req.params.id;
      Blog.findById(id).then(
        (result)=>{
           res.render('landing_postpage', {post:result})
        }
           )
           .catch((err) =>{console.log(err);});
        }
);

   app.get('/blogs', (req, res) => {
      Blog.find().sort({createdAt: -1})
     .then((result) =>{ 
       res.render('blogs',{blogs: result})
     })
     .catch((err) => console.log(err));
   });

 app.get('/about-us', (req, res)=>{
res.redirect('/about');
 });


 app.post('/admin', (req, res)=>{
   const new_account = new Ledger(req.body);
   new_account.save()
   .then((result)=>{
      res.redirect('Admin', {ledgers: result});
   })
   .catch((err) => console.log(err));
 });
 app.get('/admin', ensureAdmin, (req, res) => {
   Ledger.find().sort({createdAt: -1})
     .then((result) =>{ 
       res.render('Admin',{ledgers: result})
     })
     .catch((err) => console.log(err));
});
