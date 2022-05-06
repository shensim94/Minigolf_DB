--Query for all players
SELECT * FROM players ORDER BY player_id ASC;

--Query for all clubs
SELECT * FROM club_members ORDER BY player_id ASC;

--Query for all holes
SELECT * FROM holes ORDER BY course_id ASC;

--Query for all hole_scores
--best score at top
SELECT * FROM hole_scores ORDER BY player_id ASC, score ASC;

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
    course_id
)
VALUES
(
    :player_id_from_select,
    :course_id_from_select
);

--Delete club_members
--should only delete a single membership.
DELETE from club_members WHERE player_id = :player_id_from_select AND course_id= :course_id_from_select;

--(Not including update as we'd only add or remove.)

--Insert hole_scores
INSERT INTO hole_scores
(
    date,
    player_id,
    course_id,
    hole_number,
    score
)
VALUES
(
    :current_date,
    :player_id_from_current_selected,
    :course_id_from_current_selected,
    :hole_number_from_current_increment,
    :score_input
);

--I use 'hole_number_from_current_increment' because I imagine the user hitting a
--'next_hole' button that might increment some variable.

--Delete hole_scores
DELETE FROM hole_scores WHERE date = :selected_date AND player_id = :player_id_from_select
AND course_id = :course_id_from_select AND hole_number = :hole_number_from_select;

--Update hole_scores
--updating a hole score may change its identifier.
--additionally, 
UPDATE hole_scores
SET
date = :new_date,
player_id = :new_id,
course_id = :new_course_id,
hole_number = :new_hole_number,
score = :new_score
WHERE (date = :selected_date AND player_id = :player_id_from_select
AND course_id = :course_id_from_select AND hole_number = :hole_number_from_select);

--Insert holes
INSERT INTO holes
(
    course_id,
    hole_number,
    par_score,
    description
)
VALUES
(
    :course_id_from_select,
    :hole_number_from_validated,
    :par_score_input,
    :description_input
);

--'hole_number_from_validated' is named as such because some JavaScript will need to be
--written to verify that the user is not inserting duplicate holes, skipping holes, etc.

--Delete holes
DELETE FROM holes WHERE hole_number = :hole_number_from_select AND course_id = :course_id_from_select;

--Update holes
UPDATE holes
SET
hole_number= :new_hole_number,
course_id = :new_course_id,
par_score = :new_par_score,
description = :new_description
WHERE course_id = :course_id_from_select AND hole_number = :hole_number_from_select;


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
DELETE FROM clubs WHERE course_id = :course_id_from_select;

--Update clubs
UPDATE clubs
SET
name = :new_name,
description = :new_description,
address = :new_address,
zip_code = :new_zip,
city = :new_city,
state = :new_state
WHERE course_id = :course_id_from_select;