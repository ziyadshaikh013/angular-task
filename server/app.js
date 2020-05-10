const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoute = require('./routes/user');
const requestRoute = require('./routes/request')
const multer = require('multer');

let GridFsStorage = require('multer-gridfs-storage');
let Grid = require('gridfs-stream');

const app = express();

//middleware
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//connection string
const url = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/ite-task'

//establishing connection
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB')
}).catch(() => {
    console.log('Cannot connect to database')
});

//allowing CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//express routes
app.use('/api/user', userRoute);
app.use('/api/request', requestRoute);

//file handling
let gfs;

//init gfs
mongoose.connection.once('open', () => {
    gfs = Grid(mongoose.connection.db, mongoose.mongo);
    gfs.collection('uploads')
});

//setting up storage engine
const storage = new GridFsStorage({
    url: url,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            const filename = file.originalname;
            const fileInfo = {
                filename: filename,
                bucketName: 'uploads'
            };
            resolve(fileInfo);
        });
    }
});

const upload = multer({
    storage
});

//upload file to database
app.post('/upload', upload.single('file'), (req, res) => {
});

//getting files from the database
app.get('/files', (req, res) => {
    gfs.files.find().toArray((err, files) => {
        // Check if files
        if (!files || files.length === 0) {
            res.status(400).json({
                files: false
            });
        } else {
            res.json(files)
        }
    });
});

//get one file from database
app.get('/files/:filename', (req, res) => {
    gfs.files.findOne({
        filename: req.params.filename
    }, (err, file) => {
        // Check if file
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exists'
            });
        }
        // If File exists this will get executed
        const readstream = gfs.createReadStream(file.filename);
        return readstream.pipe(res);
    });
});

//delete file
app.delete('/files/:id', (req, res) => {
    gfs.remove({
        _id: req.params.id,
        root: 'uploads'
    }, (err, gridStore) => {
        if (err) {
            return res.status(404).json({
                err: err
            });
        }
    });
});



module.exports = app;