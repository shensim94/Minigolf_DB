--Query for all players
SELECT * FROM players ORDER BY player_id ASC;

--Query for all clubs
SELECT * FROM club_members ORDER BY player_id ASC;

--Query for all holes
SELECT * FROM holes ORDER BY course_id ASC;

--Query for all hole_scores
SELECT * FROM hole_scores ORDER BY player_ID ASC, score ASC;

--Insert player
INSERT INTO players
(
    name,
    address,
    zip_code,
    city,
    state
) VALUES
(
    :name_input,
    :address_input,
    :zip_input,
    :city_input,
    :state_input
);

--Delete player
 
--Update player

--Insert club_member

--Delete club_member

--Insert hole_scores

--Delete hole_scores

--Update hole_scores

--Insert holes

--Delete holes

--Update holes

--Insert clubs

--Delete clubs

--Update clubs