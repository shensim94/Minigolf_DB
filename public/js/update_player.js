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
    let inputAddress = document.getElementById("upd_address");
    let inputZip = document.getElementById("upd_zip");
    let inputCity = document.getElementById("upd_city");
    let inputState = document.getElementById("upd_state");

    // Get the values from the form fields
    let idValue = inputId.innerHTML;
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
    xhttp.open("PUT", "/players/update_player", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            let table = document.getElementById("players_table");

            for (let i = 0, row; row = table.rows[i]; i++) {
                let isPlayer = table.rows[i].getAttribute("data_pid") == idValue;
                if(isPlayer){

                    // Get the location of the row where we found the matching person ID
                    let updateRowIndex = table.getElementsByTagName("tr")[i];

                    // Get td of homeworld value
                    let td_name = updateRowIndex.getElementsByTagName("td")[1];
                    let td_address = updateRowIndex.getElementsByTagName("td")[2];
                    let td_zip = updateRowIndex.getElementsByTagName("td")[3];
                    let td_city = updateRowIndex.getElementsByTagName("td")[4];
                    let td_state = updateRowIndex.getElementsByTagName("td")[5];

                    // Reassign homeworld to our value we updated to
                    td_name.innerHTML = nameValue; 
                    td_address.innerHTML = addressValue; 
                    td_zip.innerHTML = zipValue; 
                    td_city.innerHTML = cityValue; 
                    td_state.innerHTML = stateValue; 
                 }
            }

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})
