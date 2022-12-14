SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;
DROP TABLE IF EXISTS players, clubs, holes, club_members, hole_scores; 
CREATE TABLE players(
    player_id int NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) NOT NULL,
    favorite_club int,
    address VARCHAR(145),
    zip_code VARCHAR(50),
    city VARCHAR(50),
    state VARCHAR(50),
    PRIMARY KEY(player_id),
    FOREIGN KEY(favorite_club) REFERENCES clubs(club_id) ON DELETE SET NULL
);

CREATE TABLE clubs(
    club_id int NOT NULL AUTO_INCREMENT,
    name VARCHAR(45),
    description TEXT,
    address VARCHAR(145),
    zip_code VARCHAR(50),
    city VARCHAR(50),
    state VARCHAR(50),
    PRIMARY KEY(club_id)
);

CREATE TABLE holes(
    club_id int NOT NULL,
    hole_number int NOT NULL CHECK(hole_number BETWEEN 1 AND 18),
    par_score int NOT NULL,
    description TEXT,
    CONSTRAINT hole_id PRIMARY KEY (club_id, hole_number),
    FOREIGN KEY(club_id) REFERENCES clubs(club_id) ON DELETE CASCADE
);

CREATE TABLE club_members(
    player_id int NOT NULL,
    club_id int NOT NULL,
    PRIMARY KEY(player_id, club_id),
    FOREIGN KEY(club_id) REFERENCES clubs(club_id) ON DELETE CASCADE, 
    FOREIGN KEY(player_id) REFERENCES players(player_id) ON DELETE CASCADE
);

CREATE TABLE hole_scores(
    hole_scores_id int NOT NULL AUTO_INCREMENT,
    date DATE,
    player_id int NOT NULL,
    club_id int NOT NULL,
    hole_number int NOT NULL,
    score int NOT NULL,
    PRIMARY KEY(hole_scores_id),
    FOREIGN KEY(player_id) REFERENCES players(player_id) ON DELETE CASCADE,
    constraint fk_hole_id FOREIGN KEY(club_id, hole_number) REFERENCES holes(club_id, hole_number) ON DELETE CASCADE
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

INSERT INTO holes(club_id, hole_number, par_score, description)
VALUES
((SELECT club_id FROM clubs WHERE name = "Gator Land"), 1, 4, "placeholder description"),
((SELECT club_id FROM clubs WHERE name = "Gator Land"), 2, 4, "placeholder description"),
((SELECT club_id FROM clubs WHERE name = "Gator Land"), 3, 3, "placeholder description"),
((SELECT club_id FROM clubs WHERE name = "Gator Land"), 4, 5, "placeholder description"),
((SELECT club_id FROM clubs WHERE name = "Gator Land"), 5, 4, "placeholder description"),
((SELECT club_id FROM clubs WHERE name = "Gator Land"), 6, 2, "placeholder description"),
((SELECT club_id FROM clubs WHERE name = "Gator Land"), 7, 3, "placeholder description"),
((SELECT club_id FROM clubs WHERE name = "Gator Land"), 8, 4, "placeholder description"),
((SELECT club_id FROM clubs WHERE name = "Gator Land"), 9, 5, "placeholder description"),
((SELECT club_id FROM clubs WHERE name = "Happy Land"), 1, 3, "placeholder description"),
((SELECT club_id FROM clubs WHERE name = "Happy Land"), 2, 4, "placeholder description"),
((SELECT club_id FROM clubs WHERE name = "Happy Land"), 3, 3, "placeholder description"),
((SELECT club_id FROM clubs WHERE name = "Happy Land"), 4, 5, "placeholder description"),
((SELECT club_id FROM clubs WHERE name = "Happy Land"), 5, 4, "placeholder description"),
((SELECT club_id FROM clubs WHERE name = "Happy Land"), 6, 4, "placeholder description"),
((SELECT club_id FROM clubs WHERE name = "Happy Land"), 7, 5, "placeholder description"),
((SELECT club_id FROM clubs WHERE name = "Happy Land"), 8, 4, "placeholder description"),
((SELECT club_id FROM clubs WHERE name = "Happy Land"), 9, 4, "placeholder description");

INSERT INTO club_members(player_id, club_id)
VALUES
((SELECT player_id FROM players WHERE name = "Happy"), (SELECT club_id FROM clubs WHERE name = "Happy Land")),
((SELECT player_id FROM players WHERE name = "Chubbs"), (SELECT club_id FROM clubs WHERE name = "Gator Land")),
((SELECT player_id FROM players WHERE name = "Shooter"), (SELECT club_id FROM clubs WHERE name = "Ole Country Club"));

INSERT INTO hole_scores(date, player_id, club_id, hole_number, score)
VALUES
("2022-04-28", (SELECT player_id FROM players WHERE name = "Happy"), (SELECT club_id FROM clubs WHERE name = "Gator Land"), 1, 2),
("2022-04-28", (SELECT player_id FROM players WHERE name = "Happy"), (SELECT club_id FROM clubs WHERE name = "Gator Land"), 2, 4),
("2022-04-28", (SELECT player_id FROM players WHERE name = "Happy"), (SELECT club_id FROM clubs WHERE name = "Gator Land"), 3, 3),
("2022-04-28", (SELECT player_id FROM players WHERE name = "Happy"), (SELECT club_id FROM clubs WHERE name = "Gator Land"), 4, 5),
("2022-04-28", (SELECT player_id FROM players WHERE name = "Shooter"), (SELECT club_id FROM clubs WHERE name = "Gator Land"), 1, 3),
("2022-04-28", (SELECT player_id FROM players WHERE name = "Shooter"), (SELECT club_id FROM clubs WHERE name = "Gator Land"), 2, 3),
("2022-04-28", (SELECT player_id FROM players WHERE name = "Shooter"), (SELECT club_id FROM clubs WHERE name = "Gator Land"), 3, 2),
("2022-04-28", (SELECT player_id FROM players WHERE name = "Shooter"), (SELECT club_id FROM clubs WHERE name = "Gator Land"), 4, 5);

SET FOREIGN_KEY_CHECKS=1;
COMMIT;