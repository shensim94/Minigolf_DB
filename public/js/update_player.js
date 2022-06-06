//Authors: Allan Hillyer and Simon Shen
// Citation for the following file:
// Date: 05/26/2022
//Adapted From: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data

// Get the objects we need to modify
let updatePersonForm = document.getElementById('update_player');

// Modify the objects we need
updatePersonForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputId = document.getElementById("upd_pid");
    let inputName = document.getElementById("upd_name");
    let inputClub = document.getElementById("upd_club_id");
    let inputAddress = document.getElementById("upd_address");
    let inputZip = document.getElementById("upd_zip");
    let inputCity = document.getElementById("upd_city");
    let inputState = document.getElementById("upd_state");

    // Get the values from the form fields
    let idValue = inputId.innerHTML;
    let nameValue = inputName.value;
    let clubValue = inputClub.value;
    let addressValue = inputAddress.value;
    let zipValue = inputZip.value;
    let cityValue = inputCity.value;
    let stateValue = inputState.value;
    
    // currently the database table for bsg_people does not allow updating values to NULL
    // so we must abort if being bassed NULL for homeworld


    // Put our data we want to send in a javascript object
    let data = {
        id: idValue,
        name: nameValue,
        fclub: clubValue,
        address: addressValue,
        zip: zipValue,
        city: cityValue,
        state: stateValue
    }
    console.log(data);
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/players/update_player", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            //refresh page
            history.go(0);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
            alert("There was a problem with the input, please ensure that this player has a name.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})
