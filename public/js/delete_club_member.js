///CODE PROVIDED BY AND ADAPTED FOR THIS PROGRAM FROM COMPANION GUIDE:
//https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data

function deletePerson(player_id, club_id) {
    let link = '/delete-club-member';
    let data = {
        id: player_id,
        cid: club_id
    };

    $.ajax({
        url: link,
        type: 'DELETE',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            deleteRow(player_id, club_id);
        }
    });
}

function deleteRow(player_id, club_id) {
    let table = document.getElementById("club_members_table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        let isPlayer = table.rows[i].getAttribute("data-p") == player_id
        let isClub = table.rows[i].getAttribute("data-c") == club_id
        if (isPlayer && isClub) {
            table.deleteRow(i);
            break;
        }
    }
}