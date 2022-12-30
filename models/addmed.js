const mongoose = require("mongoose")
const addMedSchema = new mongoose.Schema({// template for our database
    Medication: { 
        type: String,
        required: true
    },
    Strength: {
        type: String,
        required: true
    },
    Quantity: {
        type: String,
        required: true
    },
    Type: { 
        type: String,
        required: true
    },
    Time: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('medicationToAdd', addMedSchema, 'Medications') //'medicationToAdd' is model name, 'schema is template', 'tasks' is collection name