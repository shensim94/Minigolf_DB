function deleteScore(hole_score_id) {
    let link = 'hole_scores/deleteholescore';
    let data = {
        id: hole_score_id
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