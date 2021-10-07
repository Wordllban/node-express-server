const sql = require('./db.js');

var Device = function(device) {
    this.model = device.model;
    this.price = device.price;
};

Device.create = (newDevice, result) => {
    sql.query("INSERT INTO devices SET ?", newDevice, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created device: ", { id: res.insertId, ...newDevice });
        result(null, { id: res.insertId, ...newDevice});
    });
};

Device.findById = (id, result) => {
    sql.query(`SELECT * FROM devices WHERE id = ${id}`, (err, res) =>{
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        } 

        if (res.length) {
            console.log("found items: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Device with the id
        result({ kind: "not_found" }, null);
    });
};

Device.findAll = result => {
    sql.query("SELECT * FROM devices", (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(null, res);
            return;
        }

        console.log("devices: ", res);
        result(null, res);
    });
};

Device.update = (id, device, result) => {
    sql.query("UPDATE devices SET model = ?, price = ? WHERE id = ?",
    [device.model, device.price, id],
    (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if(res.affectedRows == 0) {
            // not found device with the id
            result({kind: "not_found" }, null);
            return;
        }

        console.log("update device: ", { id: id, ...device });
        result(null, { id: id, ...device });
        }
    );
};

Device.remove = (id, result) => {
    sql.query("DELETE FROM devices WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Device with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted device with id: ", id);
        result(null, res);
    });
};

module.exports = Device;