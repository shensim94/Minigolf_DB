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
    let inputId = document.getElementById("select-id");
    let inputName = document.getElementById("update-name");
    let inputAddress = document.getElementById("update-address");
    let inputZip = document.getElementById("update-zip");
    let inputCity = document.getElementById("update-city");
    let inputState = document.getElementById("update-state");

    // Get the values from the form fields
    let idValue = inputId.value;
    let nameValue = inputName.value;
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
        address: addressValue,
        zip: zipValue,
        city: cityValue,
        state: stateValue
    }
    console.log(data);
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update_player", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            history.go(0);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, personID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("players_table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == player_id) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of homeworld value
            let td = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign homeworld to our value we updated to
            td.innerHTML = parsedData[0].name; 
       }
    }
}