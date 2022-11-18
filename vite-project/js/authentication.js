import DataService from "./dataService";

const authenticationService = new DataService("users")


function formDataToJSON(formElement) {    
    let formData = new FormData(formElement);
    // Object.fromEntries creates a new object made from an iterable list like an Array or Map
    // Object.entries takes an object and converts it into an Array that is iterable.
    const converted = Object.fromEntries(formData.entries());
    return converted;
}

async function handleRegister(e) {
    e.preventDefault(); // Stop the page from reloading
    var myForm = e.target; // get the elements of the form
    const users = await authenticationService.getData()
    const data = formDataToJSON(myForm);
    console.log(data); // convert the form elements into a JSON object
    var canRegister = true; 
    users.forEach((user) => {
        if (data.email === user.email) {
            console.log("This email already has an account with us.")
            canRegister = false; // If the user's email exists in the database, then do not allow them to register.
        }
    })
    if (canRegister) {
        await authenticationService.postData(data); // Post the JSON to the server
    }
    myForm.reset(); // Reset the form 
    
}

document.querySelector('#registerForm').addEventListener('submit', handleRegister);