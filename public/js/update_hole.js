//Authors: Allan Hillyer and Simon Shen
// Citation for the following file:
// Date: 05/26/2022
//Adapted From: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data

// Get the objects we need to modify
let updateHoleForm = document.getElementById('update_hole');

// Modify the objects we need
updateHoleForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let club_id = document.getElementById("upd_cid").innerHTML;
    let hole_number = document.getElementById("upd_hn").innerHTML;
    let par_score = document.getElementById("upd_ps").value;
    let desc = document.getElementById("upd_desc").value;

    
    // currently the database table for bsg_people does not allow updating values to NULL
    // so we must abort if being bassed NULL for homeworld


    // Put our data we want to send in a javascript object
    let data = {
        club_id: club_id,
        hole_number: hole_number,
        par_score: par_score,
        desc: desc
    }
    console.log(data);
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/holes/update_hole", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table

            let table = document.getElementById("holes_table");

            for (let i = 0, row; row = table.rows[i]; i++) {
                let isClub = table.rows[i].getAttribute("data_cid") == club_id;
                let isHole = table.rows[i].getAttribute("data_hn") == hole_number;
                if(isClub && isHole){

                    // Get the location of the row where we found the matching person ID
                    let updateRowIndex = table.getElementsByTagName("tr")[i];

                    // Get td of homeworld value
                    let td_ps = updateRowIndex.getElementsByTagName("td")[3];
                    let td_desc = updateRowIndex.getElementsByTagName("td")[4];

                    // Reassign homeworld to our value we updated to
                    td_ps.innerHTML = par_score; 
                    td_desc.innerHTML = desc; 
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

function updateRow(data, personID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("people-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == personID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of homeworld value
            let td = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign homeworld to our value we updated to
            td.innerHTML = parsedData[0].name; 
       }
    }
}
