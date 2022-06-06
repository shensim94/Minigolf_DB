//Authors: Allan Hillyer and Simon Shen
// Citation for the following file:
// Date: 05/26/2022
// Adapted from: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data

// Get the objects we need to modify
let addPersonForm = document.getElementById('add_player');

// Modify the objects we need
addPersonForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputName = document.getElementById("input-name");
    let inputFClub = document.getElementById("input_club_id")
    let inputAddress = document.getElementById("input-address");
    let inputZip = document.getElementById("input-zip");
    let inputCity = document.getElementById("input-city");
    let inputState = document.getElementById("input-state");

    // Get the values from the form fields
    let nameValue = inputName.value;
    let clubValue = inputFClub.value;
    let addressValue = inputAddress.value;
    let zipValue = inputZip.value;
    let cityValue = inputCity.value;
    let stateValue = inputState.value;

    // Put our data we want to send in a javascript object
    let data = {
        name: nameValue,
        fclub: clubValue,
        address: addressValue,
        zip: zipValue,
        city: cityValue,
        state: stateValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/players/add_player", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            history.go(0);

            // Clear the input fields for another transaction
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
            alert("There was a problem with the input, please ensure that this player has a name.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})
