const Sequelize = require('sequelize');

module.exports = { config };

function config(client) {
    client.sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: 'database.sqlite',
        logging: (...msg) => console.log(msg),
    });
    
    client.sequelize.define('Channel', {
        id: {
            type: Sequelize.STRING,
            primaryKey: true,
        },
        highscore: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        mistakes: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
    });
    
    client.sequelize.define('Word', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        word: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        channel: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        author: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    });    
}
