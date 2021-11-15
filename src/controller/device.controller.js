const Sequelize = require("sequelize");
const Device = require("../models/device.model")
const Op = Sequelize.Op;

// Create and Save a new Device
exports.create = (req, res) => {
    // Validate request
    if (!req.body.model || !req.body.price) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const device = {
        model: req.body.model,
        price: req.body.price
    };

    Device.create(device)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: 
                    err.message || "Some error occurred while creating the Device."
            });
        });
};

// Retrieve all Device from the database.
exports.findAll = (req, res) => {
    const model = req.query.model;
    var condition = model ? { model: { [Op.like] : `%${model}` } } : null;

    Device.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: 
                    "Some error occurred while retrieving devices."
            });
        });
};

// Find a single Device with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Device.findByPk(id)
        .then(data => {
            if(data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Device with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Device with id=" + id
            });
        });
};

// Update a Device by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Device.update(req.body, {
        where: { id: id}
    })
    .then(num => {
        if(num == 1) {
            res.send({
                message: "Device was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Device with id=${id}. Maybe Device was not found or req.body is empty!`
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message:  "Error updating Device with id=" + id
        })
    })
    
};

// Delete a Device with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Device.destroy({
        where: { id: id }
    })
    .then(num => {
        if(num == 1) {
            res.send({
                message: "Device was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Device with id=${id}. Maybe Device was not found!`
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Device with id=" + id
        })
    })

};

exports.filterByName = (req, res) => {
    Device.findAll({
        where: {
            model: {
                [Op.substring]: req.query.model
            }
        },
        attributes: ['id', 'model', 'price']
    })
    .then(data => {
        if(data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: `Cannot find Devices with model ${model}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving Devices with model " + model
        });
    });
};

exports.filterByPrice = (req, res) => {
    Device.findAll({
        where: {
            price: {
                [Op.gt]: req.query.price
            }
        },
        attributes: ['id', 'model' ,'price']
    })  
    .then(data => {
        if(data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: `Cannot find Device with price ${price}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving Device with id " + price
        });
    });
};
