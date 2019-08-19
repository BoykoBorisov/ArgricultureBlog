const express = require("express");

const app = express();
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const edge = require("edge.js");
const expressEdge = require("express-edge");
const fileUpload = require("express-fileupload");
const path = require("path");
const PORT = process.env.PORT || 8000;
require("./utils/connectToDb");

app.use(expressEdge);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set("views", __dirname + "/views");

app.use(expressSession({
  secret : "secret",
  saveUninitialized : false,
  resave : false
}));

app.use(fileUpload());
app.use('*',(req,res,next) =>
{
  edge.global('auth', req.session.status)
  next();
});

const addItemConnroller = require("./control/addItemController");
const buyItemController = require("./control/buyItemController");
const checkIfAdminController = require("./control/checkIfAdminController");
const createUserController = require("./control/createUserController");
const finalisePurchaseController = require("./control/finalisePurchaseController");
const getAllItemsController = require("./control/getAllItemsController")
const getAllPostsController = require("./control/getAllPostsController");
const getSinglePostController = require("./control/getSinglePostController");
const signupController = require("./control/signupController");
const storePostController = require("./control/storePostController");
const uploadItemConroller = require("./control/uploadItemController");
const uploadPostController = require("./control/uploadPostController");



app.get('/',(req, res) => res.render("index")); 
app.get('/about', (req, res) => res.render("about"));
app.get('/upload', uploadPostController);
app.get('/articles', getAllPostsController);
app.get('/articles/:_id', getSinglePostController);
app.get('/login', (req, res) => res.render('login'));
app.get('/admin', (req, res) => res.render('admin'));
app.get('/signup', signupController);
app.get('/items/add' , addItemConnroller);
app.get('/items', getAllItemsController);
app.get('/items/:_id', buyItemController);
app.post('/login/isAdmin', checkIfAdminController);
app.post('/signup/user', createUserController);
app.post('/posts/store', storePostController);
app.post('/items/store', uploadItemConroller);
app.post('/items/buy/:_id', finalisePurchaseController);


app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, console.log(`Server is running on port ${PORT}`));
  