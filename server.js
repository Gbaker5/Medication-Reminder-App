//declare variables
const express = require('express')
const bodyParser= require('body-parser')
const app = express()
const PORT = 1500
const mongoose = require("mongoose");
require('dotenv').config()
const MedicationToAdd = require('./models/addmed');


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
            Time: req.body.Time,
            completed: false
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

//Edit and UPDATE Method
app
    .route('/edit/:id')
    .get((req,res) => { 
        
         
        const id = req.params.id;
        
        
        MedicationToAdd.find({}, (err, Medications) => { //retreive collection from db again "medicatioToAdd" is db and "Medications" is the collection
        res.render('edit.ejs', {Meds: Medications, idMed: id }) //"Meds" = list of all meds and "idMed" = specific med to edit by id (render as ejs with these two as key value pairs)
            //console.log(Medications)
            //console.log(id)
            //console.log(res)
            console.log(req.body)
        })
        })
    .post((req,res) => {
        //console.log(req.body)
        const id = req.params.id
        
        
            MedicationToAdd.findByIdAndUpdate( //requires id and structure to update (similar to original get post)
           
        id, 
           {
               Medication: req.body.Medication,
               Strength: req.body.Strength,
               Quantity: req.body.Quantity,
               Type: req.body.Type,
               Time: req.body.Time
            },
           
           console.log(`${req.body.Medication} edited`),
           err => {
            if (err) return res.status(500).send(err)
            res.redirect('/')
           })
            
    })
   
    //DELETE
    app
    .route("/remove/:id")
    .get((req, res) => {
        const id = req.params.id;
        console.log(id)
        MedicationToAdd.findByIdAndRemove(id, err => {
            console.log('Medication deleted')
            if (err) return res.send(500, err);
            res.redirect("/");
        });
    });

    //UPDATE COMPLETE OR NOT COMPLETE
    app.put('/markComplete', (request, response) => {
        console.log(req.body)
        MedicationToAdd.updateOne({Medication: request.body.itemFromJS},{ //go to collection then update this specific item whos property matches the "req.body.itemFromJS" (Ex: "Get Pizza" is itenFromJS)
            $set: {
                completed: true  //change the completed value from false to true
              }
        },{
            sort: {_id: -1}, 
            upsert: false
        })
        .then(result => {
            console.log('Marked Complete')
            response.json('Marked Complete')
        })
        .catch(error => console.error(error))
    
    })
    
    app.put('/markUnComplete', (request, response) => {
        db.collection('todos').updateOne({thing: request.body.itemFromJS},{
            $set: {
                completed: false
              }
        },{
            sort: {_id: -1},
            upsert: false
        })
        .then(result => {
            console.log('Marked UnComplete')
            response.json('Marked UnComplete')
        })
        .catch(error => console.error(error))
    
    })

app.listen(PORT, () => {
    console.log(`Im running on port ${PORT}`)
})
