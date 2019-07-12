const express = require("express");
const router = express.Router();
const Action = require("../data/helpers/actionModel");

router.get("/", (req, res) => {
  Action.get()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({
        message: "Could not retrieve actions."
      });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Action.get(id)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({
        message: `Could not retrieve action with ID ${id}.`
      });
    });
});

router.put("/:id", validateActionId, validateAction, (req, res) => {
  const id = req.params.id;
  const { description, notes } = req.body;

  Action.update(id, { description, notes })
    .then(data => {
      Action.get(id).then(data => {
        res.status(200).json(data);
      });
    })
    .catch(err => {
      res.status(500).json({
        message: `Could not update action with ID ${id}.`
      });
    });
});

router.delete("/:id", validateActionId, (req, res) => {
  const id = req.params.id;
  Action.remove(id)
    .then(data => {
      res.status(200).json({
        message: `Action with ID ${id} has been deleted.`
      });
    })
    .catch(err => {
      res.status(500).json({
        message: `Could not delete action with ID ${id}.`
      });
    });
});

async function validateActionId(req, res, next) {
  const id = req.params.id;
  const action = await Action.get(id);
  if (action) {
    next();
  } else {
    res.status(400).json({
      message: "Wrong action ID."
    });
  }
}

function validateAction(req, res, next) {
  if (Object.keys(req.body) == 0) {
    res.status(400).json({ message: "Empty project data." });
  } else if (!req.body.description || !req.body.notes) {
    res.status(400).json({
      message: "Description and notes is a must. Make sure to include those."
    });
  } else {
    next();
  }
}

module.exports = router;
