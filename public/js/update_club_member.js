//Authors: Allan Hillyer and Simon Shen
// Citation for the following file:
// Date: 05/19/2022
//Adapted From: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data

// Get the objects we need to modify
let updatePersonForm = document.getElementById('update-club-member');

// Modify the objects we need
updatePersonForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputFullName = document.getElementById("mySelect");
    let inputOriginalID = document.getElementById("input-original-membership")
    let inputNewID = document.getElementById("input-new-membership")

    // Put our data we want to send in a javascript object
    let data = {
        name: inputFullName.value,
        originID: inputOriginalID.value,
        newID: inputNewID.value
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/club_members/update-club-member", true);
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
