const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const nodemon = require('nodemon');

const bookingRoute = require('./api/routes/booking');
const roomRoute = require('./api/routes/room');
const userRoute = require('./api/routes/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', bookingRoute);
app.use('/', roomRoute);
app.use('/', userRoute);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Method', 'GET, POST, PUT, PATCH, DELETE');
        return res.status(200).json({})
    }
})

mongoose.connect('mongodb+srv://krishkilaparthi:kGLCqD2P6KohZy4Y@cluster0-btv8m.mongodb.net/<dbname>?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then(result => {
    console.log('connected')
    app.listen(process.env.PORT || 3001);
}).catch(err => { console.log(err) });


