const express = require('express');
const router = express.Router();

const CustomerController = require('../controller/CustomerController');
const middleware = require('../middleware/Middelware');

router.post('/create',middleware,CustomerController.createCustomer);
router.put('/update/:id',CustomerController.updateCustomer);
router.delete('/delete/:id',CustomerController.deleteCustomer);
router.get('/find-by-id/:id',CustomerController.findCustomerById);
router.get('/load-All',CustomerController.loadAllCustomer);

module.exports = router;