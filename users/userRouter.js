const express = require('express');
const db = require('./userDb');

const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
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
      res.status(500).json({ errorMessage: "There has been an error retrieving users from the database." })
    })
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.getById(id)
    .then(result => {
      if (!result || result.length <= 0) {
        // If we cannot find a user with that ID, exit from the request.
        return res.status(404).json({ errorMessage: 'Could not find specified user' })
      }
      res.status(200).json(result);
    })
    .catch(() => {
      res.status(500).json({ errorMessage: 'There has been an error retrieving users from the database.' })
    });
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
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
