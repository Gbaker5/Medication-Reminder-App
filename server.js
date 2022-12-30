//declare variables
const express = require('express')
const bodyParser= require('body-parser')
const app = express()
const PORT = 8000
const mongoose = require("mongoose");
require('dotenv').config()
const MedicationToAdd = require('./models/addmed.js');


//middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set("view engine", "ejs")

mongoose.connect(process.env.DB_CONNECTION,{useNewUrlParser: true}, () => {console.log('connected to DB!!')})


//handlers

//Read
app.get('/', async (req, res) => {
    try{
       MedicationToAdd.find({}, (err, Medications) => { //"medicationToAdd" connects to database and returns array of all collection documents
        res.render("index.ejs", {Meds: Medications }) //render the page in ejs. refernces collection "Medications" and changes the keyword to "Meds"
        //console.log(Medications) // console logs Collection
       })
       
      
       
        
    } catch (err) {
        res.status(500).send({message: error.message})
    }
    
})

//Create
app.post('/', async (req,res) =>{
    //console.log('Medication Added')
    //console.log(req.body)

    const addmed = new MedicationToAdd( //"addmed" is being declared in this function ..."newaddMMMMMed" is from declared variable at the top
        {
            Medication: req.body.Medication,
            Strength: req.body.Strength,
            Quantity: req.body.Quantity,
            Type: req.body.Type,
            Time: req.body.Time
        }
        
    )
    
    try{
        const result = await addmed.save()
        console.log('Medication Added')    
        console.log(result)
            res.redirect('/')
        
    }catch (err) {
        if (err) return res.status(600).send(err)
        res.redirect('/')
    }


    //response.redirect('/')
})

//Edit or UPDATE Method
app
    .route('/edit/:id')
    .get((req,res) => { 
        
         
        const id = req.params.id;
        
        
        MedicationToAdd.find({}, (err, Medications) => { //retreive collection from db again "medicatioToAdd" is db and "Medications" is the collection
        res.render('edit.ejs', {Meds: Medications, idMed: id }) //"Meds" = list of all meds and "idMed" = specific med to edit by id
            //console.log(Medications)
            //console.log(id)
            //console.log(res)
        })
        })
    .post((req,res) => {
        
        const id = req.params.id
        console.log(`THIS IS THE ID ${id}`)
        
            MedicationToAdd.findByIdAndUpdate( //requires id and structure to update (similar to original get post)
           
        id, 

           {
            $set:{
               Medication: req.body.Medication,
               Strength: req.body.Strength,
               Quantity: req.body.Quantity,
               Type: req.body.Type,
               Time: req.body.Time
            }
           },
           { new: true},
           console.log('edited'),
           err => {
            if (err) return res.status(500).send(err)
            res.redirect('/')
           })
            
    })
   
    //edit page
    //app
    
    //.post('/edit/:id' (req,res) => { //will find existing item in db by id and then update
        
        //console.log('edited med')
        //const id = req.params.id
        
        
            //MedicationToAdd.findByIdAndUpdate( //requires id and structure to update (similar to original get post)
           
        //id, 
           //{
               //Medication: req.body.Medication,
               //Strength: req.body.Strength,
               //Quantity: req.body.Quantity,
               //Type: req.body.Type,
               //Time: req.body.Time
           //})
           //console.log('edited')
       //}catch (err) {
        //if (err) return res.status(600).send(err) 
        //res.redirect('/')
        //}
    
    //})
    

app.listen(PORT, () => {
    console.log(`Im running on port ${PORT}`)
})
