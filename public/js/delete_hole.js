//Authors: Allan Hillyer and Simon Shen
// Citation for the following file:
// Date: 05/26/2022
// https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data

function deleteHole(club_id, hole_number) {
    if(!confirm(`Are you sure you want to delete hole (${club_id}, ${hole_number})?`))
        return;

    // Put our data we want to send in a javascript object
    let data = {
        id: club_id,
        hole_number: hole_number
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/holes/delete_hole", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // Add the new data to the table
            deleteRow(club_id, hole_number);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}


function deleteRow(club_id, hole_number){

    let table = document.getElementById("holes_table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data_cid") == club_id && table.rows[i].getAttribute("data_hn") == hole_number) {
            table.deleteRow(i);
            break;
       }
    }
}