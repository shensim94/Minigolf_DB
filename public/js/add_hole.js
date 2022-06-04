//Authors: Allan Hillyer and Simon Shen
// Citation for the following file:
// Date: 05/19/2022
// Adapted from: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data

// Get the objects we need to modify
let addClubForm = document.getElementById('add_hole');

// Modify the objects we need
addClubForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let club_id = document.getElementById("new_cid").value;
    let hole_number = document.getElementById("new_hn").value;
    let par_score = document.getElementById("new_ps").value;
    let description = document.getElementById("new_desc").value;


    // Put our data we want to send in a javascript object
    let data = {
        club_id: club_id,
        hole_number: hole_number,
        par_score: par_score,
        description: description
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/holes/add_hole", true);
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