//Authors: Allan Hillyer and Simon Shen
// Citation for the following file:
// Date: 05/19/2022
//Adapted From: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data


function deleteClub(club_id) {
    let link = 'clubs/deleteclub';
    let data = {
        id: club_id
    };

    $.ajax({
        url: link,
        type: 'DELETE',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            history.go(0);
        }
    });
}