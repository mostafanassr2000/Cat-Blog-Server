//Requirements
const express = require('express') //Node Express
const bodyParser = require('body-parser')  //Middleware parser
const mongoose = require('mongoose')   //Database
const mongoosePagination = require('mongoose-paginate-v2')
const multer = require('multer')    //For files and images
const bcrypt = require('bcryptjs')
const jws = require('jsonwebtoken')
const session = require('express-session')



const methodOverride = require('method-override')   //Overriding methods -> GET/POST to either GET/POST/PUT/DELETE
const { body, validationResult } = require('express-validator')

const User = require('./models/User')
const loggedIn = require('./Middlewares/loggedIn')

const pagesRouter = require('./routes/catsRoute')
const { redirect } = require('express/lib/response')
/*End of requirements*/


//Node Express Application
const app = express()
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/apps'));
app.use(express.static(__dirname + '/uploads'));
app.use(express.static(__dirname + '/views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'Secret Key',
    resave: false,
    saveUninitialized: false
}))

app.set('view engine', 'ejs')
app.use('/cats', pagesRouter)

//Start server
const port = 3000
const server = app.listen(port, () => {
    console.log('Server is running on port: ' + port)
})

/*Connecting to database (MongoDB)*/
const mongoUrl = 'mongodb://localhost:27017/Cats-Blog'
mongoose.connect(mongoUrl, { useNewUrlParser: true })    //Mandatory

const db = mongoose.connection
db.once("open", function () {
    console.log("Database Connected!")
})

/*File Storage Engine*/
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '--' + file.originalname)
    }
})

const upload = multer({ storage: fileStorageEngine })

async function encryptPassword(password) {
    return bcrypt.hash(password, 5)  //Encrypt 10 times
}


/*HTTP Requests and Responds*/

app.get('/', (req, res) => {
    console.log('home')

    res.render('pages/index', {
        user: req.session.user,
        isAuth: req.session.isAuth
    })
})

app.get('/login', loggedIn, (req, res) => {
    res.render('pages/login.ejs')
})

app.post('/login', loggedIn,
body('email').isEmail().withMessage("Email doesn't exist"),
body('password').exists().withMessage("Password doesn't exist"),
async (req, res) => {

    console.log('login')
     //Handling validation errors
     const errors = validationResult(req);
     if(!errors.isEmpty()) {
         return res.status(400).json({
             errors: errors.array()
         });
     }

    let user = await User.findOne({email: req.body.email})

    if(user && bcrypt.compare(user.password, req.body.password)) {
        
        req.session.isAuth = true
        req.session.user = {name: user.name, age: user.age}
        res.redirect('/')
    }else {
        res.redirect('/login')
    }
})

app.get('/register', loggedIn, (req, res) => {
    res.render('pages/register.ejs')
})

app.post('/register', loggedIn,

body('email').isEmail().withMessage("Email doesn't exist or Invalid email input"),
body('name').exists().withMessage("Username doesn't exists"),
body('password').exists().withMessage("Password is missing"),
async (req, res) => {
    
    console.log('register')
    //Handling validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    let userData = {...req.body, password: await encryptPassword(req.body.password)}

    let newUser = new User(userData)

    await newUser.save()
    
    //res.send(newUser)

    res.redirect('/login');
})

app.delete('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err
        res.redirect('/login')
    })
})

app.post('/upload-image', upload.single('image'), (req, res) => {
    res.send(req.file);
})

/*
app.post('/', async (req, res) => {
    res.render('views/pages/index')
    let cat = new Cat(req.body)
    await cat.save()
})

app.get('/', (req, res) => {
    res.render('views/pages/index')
})
*/

/*
app.get('/index', function(req, res) {
    res.render('pages/index.html')
})

app.get('/get-all-posts', async function(req, res){
    const allPosts = await Post.find()
    res.send(allPosts)
})

//Post
app.post('/post', async function(req, res) {
    
    let post = new Post(req.body)
    await post.save()
    console.log(post)
    res.send(post)
})
*/