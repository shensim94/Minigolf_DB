//Authors: Allan Hillyer and Simon Shen
// Citation for the following file:
// Date: 05/19/2022
//Adapted From: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data

// Get the objects we need to modify
let updatePersonForm = document.getElementById('updatescore');

// Modify the objects we need
updatePersonForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let hsID = document.getElementById("upd-hsi");
    let inputDate = document.getElementById("upd-date");
    let inputPlayer = document.getElementById("upd-player");
    let inputClub = document.getElementById("upd-club");
    let inputHole = document.getElementById("upd-hole");
    let inputScore = document.getElementById("upd-score");

    // Put our data we want to send in a javascript object
    let data = {
        id : hsID.innerHTML,
        date: inputDate.value,
        player: inputPlayer.value,
        club: inputClub.value,
        hole: inputHole.value,
        score: inputScore.value
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/hole_scores/updateholescore", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // // Add the new data to the table
            // updateRow(xhttp.response, fullNameValue);
            //probably not the ideal way of doing things, but I just refresh the page instead of updating a row
            history.go(0);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})
