//Authors: Allan Hillyer and Simon Shen
// Citation for the following file:
// Date: 05/19/2022
// Adapted from: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data

// Get the objects we need to modify
let addPersonForm = document.getElementById('addmembership');

// Modify the objects we need
addPersonForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let player_id = document.getElementById("input_player_id");
    //let player_name = document.getElementById("input_player_name");
    let club_id = document.getElementById("input_club_id");
    //let club_name = document.getElementById("input_club_name");

    // Get the values from the form fields
    let player_id_value = player_id.value;
    //let player_name_value = player_name.value;
    let club_id_value = club_id.value;
    //let club_name_value = club_name.value;

    // Put our data we want to send in a javascript object
    let data = {
        Player_ID: player_id_value,
        //Name: player_name_value,
        Club_ID: club_id_value,
        //Club_Name: club_name_value
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/addmembership", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

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


// Creates a single row from an Object representing a single record from 
// bsg_people
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("club_members_table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let nameCell = document.createElement("TD");
    let clubIdCell = document.createElement("TD");
    let clubNameCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");
  
    // Fill the cells with correct data
    idCell.innerText = newRow.Player_ID;
    nameCell.innerText = newRow.Name;
    clubIdCell.innerText = newRow.Club_ID;
    clubNameCell.innerText = newRow.Club_Name;
    
    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deletePerson(newRow.Player_ID, newRow.Club_ID);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(clubIdCell);
    row.appendChild(clubNameCell);
    row.appendChild(deleteCell);

    // Add the row to the table
    currentTable.appendChild(row);
}