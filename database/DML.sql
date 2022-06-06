--Query for all players
SELECT * FROM players ORDER BY player_id ASC;

--Query for all club_members
SELECT club_members.player_id AS "Player ID", players.name AS "Name", club_members.club_id AS "Course ID", clubs.name AS "Club Name" FROM club_members 
INNER JOIN players on players.player_id = club_members.player_id
INNER JOIN clubs on clubs.club_id = club_members.club_id;

--Query for unique members in club_members table
SELECT club_members.player_id AS 'Player_ID',
players.name AS 'Name',
club_members.club_id 
FROM club_members 
INNER JOIN players on players.player_id = club_members.player_id GROUP BY Name;

--Query for all clubs
SELECT * FROM clubs ORDER BY club_id ASC;

--Query for all holes
SELECT * FROM holes ORDER BY club_id ASC, hole_number ASC;

SELECT hole_scores.hole_scores_id,
hole_scores.date,
hole_scores.player_id,
players.name AS 'player_name',
hole_scores.club_id,
clubs.name AS 'club_name',
hole_scores.hole_number,
hole_scores.score FROM hole_scores
INNER JOIN players on players.player_id = hole_scores.player_id
INNER JOIN clubs on clubs.club_id = hole_scores.club_id;

--Query for all holes at a certain course
SELECT * FROM holes WHERE club_id = :club_id_input ORDER BY hole_number ASC;

--Query for all hole_scores
SELECT hole_scores.hole_scores_id,
hole_scores.date,
hole_scores.player_id,
players.name,
hole_scores.club_id,
clubs.name,
hole_scores.hole_number,
hole_scores.score FROM hole_scores
INNER JOIN players on players.player_id = hole_scores.player_id
INNER JOIN clubs on clubs.club_id = hole_scores.club_id;

--Query for all hole scores
--for a player on a certain day
SELECT hole_scores.date, hole_scores.club_id, clubs.name AS "club_name", hole_scores.player_id, players.name AS "player_name", hole_scores.hole_number,
hole_scores.score FROM hole_scores
INNER JOIN clubs on clubs.club_id = hole_scores.club_id
INNER JOIN players on players.player_id = hole_scores.player_id
WHERE hole_scores.date = :date_input AND hole_scores.player_id = :player_input;

--Insert player
INSERT INTO players
(
    name,
    address,
    zip_code,
    city,
    state
) 
VALUES
(
    :name_input,
    :address_input,
    :zip_input,
    :city_input,
    :state_input
);

--Delete player
 DELETE from players WHERE player_id = :player_id_from_select;

--Update player
--updating all fields, as they will be passed in
--even if they have not changed.
UPDATE players
SET
name=:name_input,
address=:address_input,
zip_code=:zip_input,
city=:city_input,
state=:state_input 
WHERE player_id = :player_id_from_select;

--Insert club_members
INSERT INTO club_members
(
    player_id,
    club_id
)
VALUES
(
    :player_id_from_select,
    :club_id_from_select
);

--Delete club_members
--should only delete a single membership.
DELETE from club_members WHERE player_id = :player_id_from_select AND club_id= :club_id_from_select;

--Insert hole_scores
INSERT INTO hole_scores
(
    date,
    player_id,
    club_id,
    hole_number,
    score
)
VALUES
(
    :current_date,
    :player_id_from_current_selected,
    :club_id_from_current_selected,
    :hole_number_from_current_increment,
    :score_input
);

--I use 'hole_number_from_current_increment' because I imagine the user hitting a
--'next_hole' button that might increment some variable.

--Delete hole_scores
DELETE FROM hole_scores WHERE hole_scores_id = :hole_score_id_input;

--Update hole_scores
--user will select a hole_score from a menu.
UPDATE hole_scores
SET
date = :new_date,
player_id = :new_id,
club_id = :new_club_id,
hole_number = :new_hole_number,
score = :new_score
WHERE hole_scores_id = :hole_score_id_from_select;

--Insert holes
INSERT INTO holes
(
    club_id,
    hole_number,
    par_score,
    description
)
VALUES
(
    :club_id_from_select,
    :hole_number_from_validated,
    :par_score_input,
    :description_input
);

--'hole_number_from_validated' is named as such because some JavaScript will need to be
--written to verify that the user is not inserting duplicate holes, skipping holes, etc.

--Delete holes
DELETE FROM holes WHERE hole_number = :hole_number_from_select AND club_id = :club_id_from_select;

--Update holes
UPDATE holes
SET
hole_number= :new_hole_number,
club_id = :new_club_id,
par_score = :new_par_score,
description = :new_description
WHERE club_id = :club_id_from_select AND hole_number = :hole_number_from_select;

--Insert clubs
INSERT INTO clubs
(
    name,
    description,
    address,
    zip_code,
    city,
    state
)
VALUES
(
    :name_input,
    :description_input,
    :address_input,
    :zip_input,
    :city_input,
    :state_input
);

--Delete clubs
DELETE FROM clubs WHERE club_id = :club_id_from_select;

--Update clubs
UPDATE clubs
SET
name = :new_name,
description = :new_description,
address = :new_address,
zip_code = :new_zip,
city = :new_city,
state = :new_state
WHERE club_id = :club_id_from_select;