const express = require ('express');
const customerModel= require ('../models/Customer.js');

const router = express.Router();

//create a new customer

router.post('/', async (req,res)=>{
    try{
        const newCustomer = await customerModel.create(req.body);
        res.status(201).json(newCustomer);

    }catch(error){
    res.status(500).json({message:'Error creating customer',error});

    }
});


//get all customer
router.get('/', async (req, res) => {
    try {
      const Customers = await customerModel.find({});
      res.json(Customers);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching customers', error });
    }
  });
  

//get single customer 

router.get ('/:id', async(req,res)=>{
    const id = req.params.id;
    try{
        const customer = await customerModel.findById(id);
        if(!customer){
            return res.status(404).json({message:'customer not found'});

        }
        res.json(customer);

    }catch(error){
    res.status(500).json({message:'Error fetching customer'});
    }
}); 

//update customer by id
router.put('/:id', async(req,res)=>{
const id = req.params.id;
try{
    const updateCustomer = await customerModel.findByIdAndUpdate(id,req.body,{
        new:true,
    });
    if(!updateCustomer){
        return res.status(404).json({message:'Error updating customer',error});
    }res.json(updateCustomer);


}catch(error){
    res.status(500).json({message:'Error updating customer '});

}

});


//delete customer by id
router.delete('/:id',async(req,res)=>{
    const id = req.params.id;
    try{
        const deleteCustomer = await customerModel.findByIdAndRemove(id);
        if(!deleteCustomer){
            return res.status(404).json({message:'customer not found'});

        } res.status(deleteCustomer);

    }catch(error){
        res.status(500).json({message:'Error deleting customer', error});
    }
});

module.exports = router;


















