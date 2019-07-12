const express = require("express");
const router = express.Router();
const Project = require("../data/helpers/projectModel");

router.get("/", (req, res) => {
    Project.get()
      .then(data => {
          res.status(200).json(data);
      })
      .catch(err => {
          res.status(500).json({
              message: "Could not retrieve projects."
          })
      })
})

module.exports = router;