const express = require('express');
const router = express.Router();

const CustomerController = require('../controller/CustomerController');
const middleware = require('../middleware/Middelware');

router.post('/create', middleware, CustomerController.createCustomer);
router.put('/update/:id', middleware, CustomerController.updateCustomer);
router.delete('/delete/:id', middleware, CustomerController.deleteCustomer);
router.get('/find-by-id/:id', middleware, CustomerController.findCustomerById);
router.get('/load-all', middleware, CustomerController.loadAllCustomer); // ✅ Add middleware

module.exports = router;