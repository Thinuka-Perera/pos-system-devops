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
        resp.status(500).json({'message': 'Customer updated error', error: e.message});
    }
};

const deleteCustomer = async (req, resp) => {
    try {
        const deletedData = await Customer.findByIdAndDelete(req.params.id);

        if (!deletedData) return resp.status(404).json({'message': 'Customer not found'});

        resp.status(200).json({message: 'Customer Deleted.'});

    } catch (e) {
        resp.status(500).json({'message': 'Customer Delete error', error: e.message});
    }
};

const findCustomerById = async (req, resp) => {
    try {
        const selectedCustomer = await Customer.findById(req.params.id);

        if (!selectedCustomer) return resp.status(404).json({'message': 'Not Found'});

        resp.status(200).json({message: 'Customer Data.', data: selectedCustomer});

    } catch (e) {
        resp.status(500).json({'message': 'Customer find error', error: e.message});
    }
};

const loadAllCustomer = async (req, resp) => {
    try {
        const customers = await Customer.find();
        console.log('Loaded customers:', customers); // <-- log the data to check
        resp.status(200).json({ message: 'Customer Data.', dataList: customers });
    } catch (e) {
        console.error('Error in loadAllCustomer:', e); // <-- log full error
        resp.status(500).json({
            message: 'Customer find error',
            error: e.toString() // <-- ensure error is not empty
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