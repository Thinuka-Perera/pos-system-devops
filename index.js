const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config({
    path: '.env',
    quiet: true
});
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.SERVER_PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://pasanmeth123_db_user:Thinu1234@cluster0.8cs2qa.mongodb.net/pos_system_devops?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGO_URI).then(()=>{
    console.log('Mongo DB Connected ...');

    app.listen(PORT, () => {
        console.log(`Server Started and Running on port ${PORT}`)
    })

}).catch((error) =>console.error('DB Error',error));

app.get('/test',(req,resp) =>{
    return resp.json({'message': 'Server Started...'})
});

