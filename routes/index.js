const express = require('express');
const router = express.Router();
// import user controller
const formController = require("../controllers/formControllers");

// root route
router.get('/', function(req, res) {
    res.render("landing")
});

// handle contact form
router.post('/', formController.submit);

module.exports = router;

