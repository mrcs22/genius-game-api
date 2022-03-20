CREATE TABLE users (
    id_user int AUTO_INCREMENT,
    username varchar(30) not null,
    password varchar(8) not null,
    PRIMARY KEY (id_user)
);
CREATE TABLE scores (
    id_score int AUTO_INCREMENT,
    id_user int,
    points int,
    PRIMARY KEY (id_score),
    FOREIGN KEY (id_user) REFERENCES users(id_user)
);
CREATE TABLE moves (
    id_move int AUTO_INCREMENT,
    id_user int,
    value int,
    points int,
    PRIMARY KEY (id_move),
    FOREIGN KEY (id_user) REFERENCES users(id_user)
)