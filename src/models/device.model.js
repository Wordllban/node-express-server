const Sequelize = require("sequelize");
const db = require('./db');

const Device = db.define("device", {
    model: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.DOUBLE  
    }
});

Device.sync().then(() => {
    console.log("Drop and re-sync db.");
});

module.exports = Device;