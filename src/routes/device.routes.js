const express = require('express')

const router = express.Router()

const deviceController = require('../controllers/device.controller.js');

// Create a new device
router.post("/", deviceController.create);

// Retrieve all devices
router.get("/", deviceController.findAll);

// Retrieve a single devices with id
router.get("/:id", deviceController.findById);

// Update a device with id 
router.put("/:id", deviceController.update);

// Delete a device with id
router.delete("/:id", deviceController.delete);

module.exports = router
