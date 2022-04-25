const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//conncect Db
mongoose.connect('mongodb://localhost/pcat-test-db');
//create Scheme

const PhotoSchema = new Schema({
    title: String,
    description: String,
});

const Photo = mongoose.model('Photo', PhotoSchema);

// Photo.create({
//     title: 'NewPhoto',
//     description: 'new',
// });
// Photo.find({}, (err, data) => {
//     console.log(data);
// })

const id = '626085477c786a9ae589a048'
// Photo.findByIdAndUpdate(
//     id, {
//     description: ' yeni güncelleme'
// }, { new: true },
//     (err, data) => {
//         console.log(data)
//     }


// )
Photo.findByIdAndDelete(id, (err, data) => {
    console.log('Photo is removed')
    console.log(data)
})