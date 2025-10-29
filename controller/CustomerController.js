const Customer = require('../model/CustomerSchema');

const createCustomer = async (req, resp) => {
    try {
        const {name, address, salary, contact} = req.body;
        const createdCustomer = new Customer({
            name, address, salary, contact
        });
        await createdCustomer.save();
        resp.status(201).json({message: 'Customer Saved.'});

    } catch (e) {
        console.error('❌ createCustomer error:', e);
        resp.status(500).json({'message': 'Customer error', error: e.message});
    }
};

const updateCustomer = async (req, resp) => {
    try {
        const {name, address, salary, contact} = req.body;

        const updatedData = await Customer.findByIdAndUpdate(
            req.params.id,
            {name, address, salary, contact},
            {new: true}
        );

        if (!updatedData) return resp.status(404).json({'message': 'Customer not found'});

        resp.status(200).json({message: 'Customer Updated.', data: updatedData});

    } catch (e) {
        console.error('❌ updateCustomer error:', e);
        resp.status(500).json({'message': 'Customer updated error', error: e.message});
    }
};

const deleteCustomer = async (req, resp) => {
    try {
        const deletedData = await Customer.findByIdAndDelete(req.params.id);

        if (!deletedData) return resp.status(404).json({'message': 'Customer not found'});

        resp.status(200).json({message: 'Customer Deleted.'});

    } catch (e) {
        console.error('❌ deleteCustomer error:', e);
        resp.status(500).json({'message': 'Customer Delete error', error: e.message});
    }
};

const findCustomerById = async (req, resp) => {
    try {
        const selectedCustomer = await Customer.findById(req.params.id);

        if (!selectedCustomer) return resp.status(404).json({'message': 'Not Found'});

        resp.status(200).json({message: 'Customer Data.', data: selectedCustomer});

    } catch (e) {
        console.error('❌ findCustomerById error:', e);
        resp.status(500).json({'message': 'Customer find error', error: e.message});
    }
};

const loadAllCustomer = async (req, resp) => {
    try {
        console.log('🔍 loadAllCustomer called');
        console.log('🔍 Request headers:', req.headers);
        console.log('🔍 User email from token:', req.userEmail);

        const customers = await Customer.find();
        console.log('✅ Loaded customers count:', customers.length);
        console.log('✅ Customers:', JSON.stringify(customers, null, 2));

        resp.status(200).json({
            message: 'Customer Data.',
            dataList: customers
        });
    } catch (e) {
        console.error('❌ loadAllCustomer error:', e);
        console.error('❌ Error stack:', e.stack);
        resp.status(500).json({
            message: 'Customer find error',
            error: e.message
        });
    }
};

module.exports = {
    createCustomer,
    updateCustomer,
    deleteCustomer,
    findCustomerById,
    loadAllCustomer
};