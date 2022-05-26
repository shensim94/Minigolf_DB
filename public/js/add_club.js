//Authors: Allan Hillyer and Simon Shen
// Citation for the following file:
// Date: 05/19/2022
// Adapted from: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data

// Get the objects we need to modify
let addPersonForm = document.getElementById('addclub');

// Modify the objects we need
addPersonForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let name_value = document.getElementById("input_name").value;
    let description_value = document.getElementById("input_description").value;
    let address_value = document.getElementById("input_address").value;
    let zip_code_value = document.getElementById("input_zip").value;
    let city_value = document.getElementById("input_city").value;
    let state_value = document.getElementById("input_state").value;

    // Put our data we want to send in a javascript object
    let data = {
        name: name_value,
        description: description_value,
        address: address_value,
        zip_code: zip_code_value,
        city: city_value,
        state: state_value
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/clubs/addclub", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // // Add the new data to the table
            // addRowToTable(xhttp.response);

            //refresh the page to fix delete button wonkiness
            history.go(0);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})