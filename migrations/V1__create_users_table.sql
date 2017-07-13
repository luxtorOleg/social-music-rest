CREATE TABLE `social_music`.`users` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `email` VARCHAR(50) NOT NULL,
    `password` VARCHAR(50) NOT NULL,
    `name` VARCHAR(45) NULL,
    UNIQUE INDEX `EMAIL_UNIQUE` (`email` ASC)
);