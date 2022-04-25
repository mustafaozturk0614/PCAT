const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const Photo = require('./models/Photo');
const methodOverride = require('method-override')
const ejs = require('ejs');
const path = require('path');
const fs = require('fs')
const app = express();
const photoController = require('./controllers/photoController')
const pageController = require('./controllers/pageController')
mongoose.connect('mongodb+srv://musty1406:Musty1234@cluster0.9g0pt.mongodb.net/pcat-db?retryWrites=true&w=majority')
//Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method', {
    methods: ['POST', 'GET']
}))
//
//Template Engine
app.set('view engine', 'ejs');

//Routes
app.get('/', photoController.getAllPhotos);
app.put('/photos/:id', photoController.updatePhoto);
app.delete('/photos/:id', photoController.deletePhoto);
app.post('/photos', photoController.createPhoto);
app.get('/photos/:id', photoController.getPhoto);
app.get('/photos/edit/:id', pageController.getEditPage);
app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPage);
app.get('/*', (req, res) => {
    res.status(404).send('Sayfa Bulunamadı');
});
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Sunucu ${port} da çalışamaya başladı`);
});






