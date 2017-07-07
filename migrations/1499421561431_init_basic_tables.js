module.exports = {
    "up": function(connection, callback) {
        connection.query("CREATE TABLE `social_music`.`users` ( " +
            "`id` INT NOT NULL AUTO_INCREMENT," +
            "`email` VARCHAR(50) NOT NULL," +
            "`password` VARCHAR(50) NOT NULL," +
            "`name` VARCHAR(45) NULL," +
            "PRIMARY KEY (`id`)," +
            "UNIQUE INDEX `EMAIL_UNIQUE` (`email` ASC));",
            function (err) {
                if (err) {
                    console.error('migration fail: ' + JSON.stringify(error));
                } else {
                    console.log('migration success');
                }

                callback();
            }
        )
    },
    "down": ""
};