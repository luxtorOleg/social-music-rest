module.exports = {
    "up": function(connection, callback) {
        connection.query("CREATE TABLE `social_music`.`users` ( " +
            "`ID` INT NOT NULL AUTO_INCREMENT," +
            "`EMAIL` VARCHAR(50) NOT NULL," +
            "`PASSWORD` VARCHAR(50) NOT NULL," +
            "`NAME` VARCHAR(45) NULL," +
            "PRIMARY KEY (`ID`)," +
            "UNIQUE INDEX `EMAIL_UNIQUE` (`EMAIL` ASC));",
            function (err, res) {
                console.log("ERROR: " + err);
                console.log("RESULT: " + JSON.stringify(res));

                callback();
            }
        )
    },
    "down": ""
};