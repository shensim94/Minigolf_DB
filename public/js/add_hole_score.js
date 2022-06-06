//Authors: Allan Hillyer and Simon Shen
// Citation for the following file:
// Date: 05/26/2022
// Adapted from: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data

// Get the objects we need to modify
let addHoleForm = document.getElementById('addscore');

let dateValue = Date();

// Modify the objects we need
addHoleForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputDate = document.getElementById("input-date");
    let inputPlayer = document.getElementById("input-player");
    let inputClub = document.getElementById("input-club");
    let inputHole = document.getElementById("input-hole");
    let inputScore = document.getElementById("input-score");

    // Get the values from the form fields
    let playerValue = inputPlayer.value;
    let clubValue = inputClub.value;
    let holeValue = inputHole.value;
    let scoreValue = inputScore.value;
    let dateValue =inputDate.value;

    // Put our data we want to send in a javascript object
    let data = {
        date: dateValue,
        player_id: playerValue,
        club_id: clubValue,
        hole_number: holeValue,
        score: scoreValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/hole_scores/addholescore", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            history.go(0);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
            alert("Hole score could not be added, please check that this hole number exists at this club.");
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})
