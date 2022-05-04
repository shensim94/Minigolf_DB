SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;
DROP TABLE IF EXISTS players, clubs, holes, club_members, hole_scores; 
CREATE TABLE players(
    id int NOT NULL AUTO_INCREMENT,
    name VARCHAR(45),
    address VARCHAR(145),
    zip_code VARCHAR(50),
    city VARCHAR(50),
    state VARCHAR(50),
    PRIMARY KEY(id)
);

CREATE TABLE clubs(
    id int NOT NULL AUTO_INCREMENT,
    name VARCHAR(45),
    description TEXT,
    address VARCHAR(145),
    zip_code VARCHAR(50),
    city VARCHAR(50),
    state VARCHAR(50),
    PRIMARY KEY(id)
);

CREATE TABLE holes(
    course_id int NOT NULL,
    hole_number int NOT NULL CHECK(hole_number BETWEEN 1 AND 18),
    par_score int NOT NULL,
    description TEXT,
    CONSTRAINT hole_id PRIMARY KEY (course_id, hole_number),
    FOREIGN KEY(course_id) REFERENCES clubs(id) ON DELETE CASCADE
);

CREATE TABLE club_members(
    id int NOT NULL AUTO_INCREMENT,
    player_id int NOT NULL,
    course_id int NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(course_id) REFERENCES clubs(id) ON DELETE CASCADE, 
    FOREIGN KEY(player_id) REFERENCES players(id) ON DELETE CASCADE
);

CREATE TABLE hole_scores(
    date DATE,
    player_id int NOT NULL,
    course_id int NOT NULL,
    hole_number int NOT NULL,
    score int NOT NULL,
    PRIMARY KEY(date, player_id, course_id, hole_number),
    FOREIGN KEY(player_id) REFERENCES players(id) ON DELETE CASCADE,
    constraint fk_hole_id FOREIGN KEY(course_id, hole_number) REFERENCES holes(course_id, hole_number) ON DELETE CASCADE
);

INSERT INTO players(name, address, zip_code, city, state)
VALUES
("Shooter", "Lala land", "36532", "Springfield", "GA"),
("Happy", "236 fake st.", "37456", "Greenville", "GA"),
("Chubbs", "235 fake st.", "37456", "Greenville", "GA");

INSERT INTO clubs(name, description, address, zip_code, city, state)
VALUES
("Happy Land", "A Course filled with all your child hood dreams", "1436 Subway Ave.", "37456", "Greenville", "GA"),
("Gator Land", "Where Chubbs lost his right hand", "245 4th st.", "37456", "Greenville", "GA"),
("Ole Country Club", "A popular gathering place for the pompous and self absorbed", "421 Magnolia Ave.", "36532", "Springfield", "GA");

INSERT INTO holes(course_id, hole_number, par_score, description)
VALUES
((SELECT id FROM clubs WHERE name = "Gator Land"), 1, 4, "placeholder description"),
((SELECT id FROM clubs WHERE name = "Gator Land"), 2, 4, "placeholder description"),
((SELECT id FROM clubs WHERE name = "Gator Land"), 3, 3, "placeholder description"),
((SELECT id FROM clubs WHERE name = "Gator Land"), 4, 5, "placeholder description"),
((SELECT id FROM clubs WHERE name = "Gator Land"), 5, 4, "placeholder description"),
((SELECT id FROM clubs WHERE name = "Gator Land"), 6, 2, "placeholder description"),
((SELECT id FROM clubs WHERE name = "Gator Land"), 7, 3, "placeholder description"),
((SELECT id FROM clubs WHERE name = "Gator Land"), 8, 4, "placeholder description"),
((SELECT id FROM clubs WHERE name = "Gator Land"), 9, 5, "placeholder description"),
((SELECT id FROM clubs WHERE name = "Happy Land"), 1, 3, "placeholder description"),
((SELECT id FROM clubs WHERE name = "Happy Land"), 2, 4, "placeholder description"),
((SELECT id FROM clubs WHERE name = "Happy Land"), 3, 3, "placeholder description"),
((SELECT id FROM clubs WHERE name = "Happy Land"), 4, 5, "placeholder description"),
((SELECT id FROM clubs WHERE name = "Happy Land"), 5, 4, "placeholder description"),
((SELECT id FROM clubs WHERE name = "Happy Land"), 6, 4, "placeholder description"),
((SELECT id FROM clubs WHERE name = "Happy Land"), 7, 5, "placeholder description"),
((SELECT id FROM clubs WHERE name = "Happy Land"), 8, 4, "placeholder description"),
((SELECT id FROM clubs WHERE name = "Happy Land"), 9, 4, "placeholder description");

INSERT INTO club_members(player_id, course_id)
VALUES
((SELECT id FROM players WHERE name = "Happy"), (SELECT id FROM clubs WHERE name = "Happy Land")),
((SELECT id FROM players WHERE name = "Chubbs"), (SELECT id FROM clubs WHERE name = "Gator Land")),
((SELECT id FROM players WHERE name = "Shooter"), (SELECT id FROM clubs WHERE name = "Ole Country Club"));

INSERT INTO hole_scores(date, player_id, course_id, hole_number, score)
VALUES
("2022-04-28", (SELECT id FROM players WHERE name = "Happy"), (SELECT id FROM clubs WHERE name = "Gator Land"), 1, 2),
("2022-04-28", (SELECT id FROM players WHERE name = "Happy"), (SELECT id FROM clubs WHERE name = "Gator Land"), 2, 4),
("2022-04-28", (SELECT id FROM players WHERE name = "Happy"), (SELECT id FROM clubs WHERE name = "Gator Land"), 3, 3),
("2022-04-28", (SELECT id FROM players WHERE name = "Happy"), (SELECT id FROM clubs WHERE name = "Gator Land"), 4, 5),
("2022-04-28", (SELECT id FROM players WHERE name = "Shooter"), (SELECT id FROM clubs WHERE name = "Gator Land"), 1, 3),
("2022-04-28", (SELECT id FROM players WHERE name = "Shooter"), (SELECT id FROM clubs WHERE name = "Gator Land"), 2, 3),
("2022-04-28", (SELECT id FROM players WHERE name = "Shooter"), (SELECT id FROM clubs WHERE name = "Gator Land"), 3, 2),
("2022-04-28", (SELECT id FROM players WHERE name = "Shooter"), (SELECT id FROM clubs WHERE name = "Gator Land"), 4, 5);

SET FOREIGN_KEY_CHECKS=1;
COMMIT;