//Variable
const deleteBtn = document.querySelectorAll('.fa-trash') //declares a variable for the trash button
const item = document.querySelectorAll('.item span') //declares a variable for all the selected spans
const itemCompleted = document.querySelectorAll('.item span.completed') //declares a variable for all selected completed spans 
//Event Listener
Array.from(item).forEach((element)=>{
    element.addEventListener('click', markComplete)
})

Array.from(itemCompleted).forEach((element)=>{
    element.addEventListener('click', markUnComplete) //adds an event listener to each unmark complete button
})

Array.from(deleteBtn).forEach((element)=>{
    element.addEventListener('click', deleteItem) //adds an event listener to each delete button 
})

//functions


//async functions
async function markComplete(){
    const itemText = this.parentNode.childNodes[1].innerText //select specific text item from dom and store in variable
    try{
        const response = await fetch('markComplete', { //send a fetch request sent to "app.put('mark complete')" on server-side.
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'itemFromJS': itemText //"itemFromJS" = item name from dom  (Ex: "Get Pizza" see server.js-'Mark Complete')
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function markUnComplete(){
    const itemText = this.parentNode.childNodes[1].innerText //declares a variable that holds the location where info/data will be placed client-side
    try{
        const response = await fetch('markUnComplete', { //create async function to mark an item completed
            method: 'put', //update method which coincides with server side
            headers: {'Content-Type': 'application/json'}, //formats data to allow us to use json
            body: JSON.stringify({ //turns json response into string 
                'itemFromJS': itemText //(itemjs will now equal itemtext) grabbing the text and sending to backend to update
            })
          })
        const data = await response.json() //store json data in data variable 
        console.log(data) //console log json data
        location.reload() //refresh page

    }catch(err){
        console.log(err) //catch any errors
    }
}

async function deleteItem(){
    const itemText = this.parentNode.childNodes[1].innerText //declares a variable that holds the location where info/data will be placed client-side
    try{
        const response = await fetch('deleteItem', { //sends a fetch request to delete item
            method: 'delete', //delete method comes from 
            headers: {'Content-Type': 'application/json'}, //formats data to allow us to use json 
            body: JSON.stringify({ //turns json response into string 
              'itemFromJS': itemText // (itemjs will now equal itemtext) grabbing the text and sending to backend to delete 
            })
          })
        const data = await response.json() //declares a variable to hold the response that is received from the server after the fetch request
        console.log(data) //console logs the json response
        location.reload() //refreshes page

    }catch(err){
        console.log(err) //catch error
    }
}