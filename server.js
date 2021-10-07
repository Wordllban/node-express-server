const express = require("express");
const bodyParser = require("body-parser");
var multer = require("multer");
var forms = multer();

// create express app
const app = express();

var cors = require('cors');

// setup server port
const port = process.env.PORT || 3000;

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

app.use(cors());

app.use(forms.array())


// define a root route
app.get('/', (req, res) => {
  res.send("Welcome to Wordllban application.");
});

// Require device routes
const deviceRoutes =  require("./src/routes/device.routes");

// using a middleware
app.use('/api/v1/devices', deviceRoutes)

// set port, listen for requests
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

