const express = require('express');
const db = require('./userDb');

const router = express.Router();

router.post('/', (req, res) => {
  const user = {
    name: req.body.name
  };

  db.insert(user)
    .then(createdObj => {
      res.status(201).json(createdObj);
    })
    .catch(() => {
      res.status(500).json({ errorMessage: "There has been a problem with the database." })
    })
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  db.get()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "There has been a problem with the database." })
    })
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.getById(id)
    .then(result => {
      if (!result || result.length <= 0) {
        // If we cannot find a user with that ID, exit from the request.
        return res.status(404).json({ errorMessage: 'Could not find specified user.' })
      }
      res.status(200).json(result);
    })
    .catch(() => {
      res.status(500).json({ errorMessage: "There has been a problem with the database." })
    });
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(delRecords => {
      // delRecords is equal to the amount of records the database deleted
      if (delRecords >= 1) {
        return res.status(200).json({ message: "User deleted!" });
      } else {
        return res.status(404).json({ errorMessage: "No records deleted" })
      }
    })
    .catch(() => {
      res.status(500).json({ errorMessage: "There has been a problem with the database." })
    })
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const name = req.body.name;

  // Check for expected request body data
  if (!req.body.name) {
    return res.status(400).json({ errorMessage: "Missing name paramater from request body." })
  }

  // Check if user exists

  db.update(id, { name: name })
    .then(upRecords => {
      // upRecords is equal to the amount of records updated
      if (!upRecords || upRecords <= 0) {
        return res.status(400).json({ errorMessage: "No records changed" })
      } else {
        res.status(200).json({ id: id, name: name })
      }
    })
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
