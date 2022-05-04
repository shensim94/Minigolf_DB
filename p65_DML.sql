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
 
--Update player

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

--Update hole_scores

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

--Update holes

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

--Update clubs