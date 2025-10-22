const Customer = require('../model/CustomerSchema');

const createCustomer = async (req,resp) =>{
  try{
      const {name,address,salary,contact} = req.body;
      const createdCustomer = new Customer({
          name , address , salary , contact
      });
      await createdCustomer.save();
      resp.status(201).json({message:'Customer Saved .'});

  }catch (e) {
      resp.status(500).json({'message': 'Customer error',error:e});
  }



};

const updateCustomer = async (req,resp) =>{

    try{
        const {name,address,salary,contact} = req.body;

        const updatedData =  Customer.findByIdAndUpdate({_id:req.params.id},
            {name:name,address:address,salary:salary,contact:contact},{new:true});

        if(!updatedData) return resp.status(500).json({'message':'try Again'});

        resp.status(201).json({message:'Customer Updated .'});

    }catch (e) {
        resp.status(500).json({'message': 'Customer updated error',error:e});
    }

};

const deleteCustomer = async (req,resp) =>{

    try{
        const {name,address,salary,contact} = req.body;

        const deletedData =  Customer.findByIdAndDelete({_id:req.params.id});


        if(!deletedData) return resp.status(500).json({'message':'try Again'});

        resp.status(204).json({message:'Customer Deleted.'});

    }catch (e) {
        resp.status(500).json({'message': 'Customer Deleted error',error:e});
    }

};

const findCustomerById = async (req,resp) =>{

    try{
        const selectedCustomer = await Customer.findOne({_id:req.params.id});


        if(!selectedCustomer) return resp.status(404).json({'message':'Not Found'});

        resp.status(200).json({message:'Customer Data.',data:selectedCustomer});

    }catch (e) {
        resp.status(500).json({'message': 'Customer find error',error:e});
    }

};

const loadAllCustomer = async (req,resp) =>{

    try{
        const customers =  Customer.find();
        resp.status(200).json({message:'Customer Data.',dataList:customers});

    }catch (e) {
        resp.status(500).json({'message': 'Customer find error',error:e});
    }

};

module.exports={createCustomer,updateCustomer,deleteCustomer,findCustomerById,loadAllCustomer};

