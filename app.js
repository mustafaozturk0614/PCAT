const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const Photo = require('./models/Photo');
const ejs = require('ejs');
const path = require('path');
const fs = require('fs')
const app = express();

mongoose.connect('mongodb://localhost/pcat-test-db');

//Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());

//Template Engine
app.set('view engine', 'ejs');

//Routes
app.get('/', async (req, res) => {
    const photos = await Photo.find({}).sort('-dateCreated');
    res.render('index', {
        photos,
    });
});
app.get('/photos/:id', async (req, res) => {
    const photo = await Photo.findById(req.params.id);
    res.render('photo', {
        photo,
    });
});
app.get('/about', (req, res) => {
    res.render('about');
});
app.get('/add', (req, res) => {
    res.render('add');
});
app.post('/photos', (req, res) => {
    const uploadDir = 'public/uploads'

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir)
    }


    let uploadedImage = req.files.image
    let uploadPath = __dirname + '/public/uploads/' + uploadedImage.name


    uploadedImage.mv(uploadPath, async () => {
        await Photo.create({
            ...req.body,
            image: '/uploads/' + uploadedImage.name
        })
        res.redirect('/');
    })
    console.log(req.files.test)




});
app.get('/video', (req, res) => {
    res.render('video-page');
});
app.get('/*', (req, res) => {
    res.status(404).send('Sayfa Bulunamadı');
});
const port = 3000;

app.listen(port, () => {
    console.log(`Sunucu ${port} da çalışamaya başladı`);
});
