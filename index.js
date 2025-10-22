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

const UserRoute = require('./routes/UserRoute');
const CustomerRoute = require('./routes/CustomerRoute');
const ProductRoute = require('./routes/ProductRoute');
const OrderRoute = require('./routes/OrderRoute');

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

app.use('/api/v1/users',UserRoute); //http://localhost:3000/api/v1/users/signup
app.use('/api/v1/customers',CustomerRoute);
app.use('/api/v1/products',ProductRoute);
app.use('/api/v1/orders',OrderRoute);
