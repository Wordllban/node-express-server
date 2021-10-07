const Device = require('../models/device.model.js');

// Create & Save a new device
exports.create = (req, res) => {
    // Validate request
    if(!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a device
    const device = new Device({
        model: req.body.model,
        price: req.body.price
    });

    // Save device in the database
    Device.create(device, (err, data) => {
        if(err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the device."
            });
        else res.send(data);
    });
};

// Retrieve all devices from the database
exports.findAll = (req, res) => {
    Device.findAll((err, data) => {
        if(err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving devices."
            });
        else res.send(data);
    })
};

// Find a single device with a id
exports.findById = (req, res) => {
    Device.findById(req.params.id, (err, data) => {
        if(err) {
            if(err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found device with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving device with id " + req.params.id 
                });
            } 
        } else res.send(data);
    });
};

// Update a device identified by the id in the request
exports.update = (req, res) => {
    //Validate request
    if(!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Device.update(
        req.params.id,
        new Device(req.body),
        (err, data) => {
            if(err) {
                if(err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found device with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating device with id " + req.params.id
                    });
                } 
            } else res.send(data);
        }
    );
};


// Delete a device with the specified id in the request
exports.delete = (req, res) => {
    Device.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Device with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Device with id " + req.params.id
                });
            }
        } else res.send({ message: `Device was deleted successfully!` });
    });
};