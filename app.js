const express = require('express')
const path = require('path')
const app = express()


app.use(express.static('public'))



app.get('/', (req, res) => {

    res.sendFile(path.resolve(__dirname, "temp/index.html"))
})
app.get('/about', (req, res) => {

    res.status(200).send('About Sayfası')
})
app.get('/contact', (req, res) => {

    res.status(200).send('contact Sayfası')
})
app.get('/*', (req, res) => {

    res.status(404).send('Sayfa Bulunamadı')
})
const port = 3000

app.listen(port, () => {

    console.log(`Sunucu ${port} da çalışamaya başladı`)

})
