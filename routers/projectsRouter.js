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
      });
    });
});

router.get("/:id", validateProjectId, (req, res) => {
  const id = req.params.id;
  Project.get(id)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({
        message: `Could not retrieve project with ID ${id}.`
      });
    });
});

router.post("/", validateProject, (req, res) => {
  const { name, description } = req.body;
  Project.insert({ name, description })
    .then(data => {
      Project.get(data.id).then(data => {
        res.status(201).json(data);
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "Could not add project to the database."
      });
    });
});

router.put("/:id", validateProjectId, validateProject, (req, res) => {
  const id = req.params.id;
  const { name, description } = req.body;

  Project.update(id, { name, description })
    .then(data => {
      Project.get(id).then(data => {
        res.status(200).json(data);
      });
    })
    .catch(err => {
      res.status(500).json({
        message: `Could not update project with ID ${id}.`
      });
    });
});

router.delete("/:id", validateProjectId, (req, res) => {
  const id = req.params.id;
  Project.remove(id)
    .then(data => {
      res.status(200).json({
        message: `Project with ID ${id} has been deleted.`
      });
    })
    .catch(err => {
      res.status(500).json({
        message: `Could not delete project with ID ${id}.`
      });
    });
});

function validateProject(req, res, next) {
  if (Object.keys(req.body) == 0) {
    res.status(400).json({ message: "Empty project data." });
  } else if (!req.body.name || !req.body.description) {
    res.status(400).json({
      message: "Name and description is a must. Make sure to include those."
    });
  } else {
    next();
  }
}

async function validateProjectId(req, res, next) {
  const id = req.params.id;
  const project = await Project.get(id);
  if (project) {
    next();
  } else {
    res.status(400).json({
      message: "Wrong project ID."
    });
  }
}

module.exports = router;
