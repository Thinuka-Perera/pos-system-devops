const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    description:{type:String, required:true},
    unitPrice:{type:String, required:true},
    qtyOnHand:{type:Number, required:true}

});

module.exports = mongoose.model('Product',ProductSchema);