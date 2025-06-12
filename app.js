const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json())

const PORT = 5000;
//connect mango db
mongoose.connect('mongodb+srv://mrajamadhanki9:24cLX4nAGHO3oilj@cluster0.1u2s45o.mongodb.net/contactDB')
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
       
    })

    const contactSchema = new mongoose.Schema({
        name:String,
        email:String,
        phone:String
       
    })
    const Contact = mongoose.model('Contact',contactSchema);

        //Routs

        app.get('/api/contacts',async(req,res)=>{
            try{
                const contacts = await Contact.find();
                res.json(contacts); 

            }catch(err){
                res.status(500).json({error: 'Server Error'})
            }
        })
        
        app.post('/api/contacts',async(req,res)=> {
            try{
                const newContact = new Contact(req.body);
                await newContact.save();

                res.status(201).json({message:'contact saved successfully'})

            }catch(err) {
                res.status(400).json({error:'Failed to save contact'})
            }

            

            })
                
            
       // app.delete(() => {})


    

app.get('/day3', (req,res) => {
    res.json({
        message: 'Hello from the Thur API!'
    });
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})