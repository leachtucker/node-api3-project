const express = require('express');
const users = require('./userDb');
const posts = require('../posts/postDb');

const router = express.Router();

router.post('/', validateUser(), (req, res) => {
  const user = {
    name: req.body.name
  };

  users.insert(user)
    .then(createdObj => {
      res.status(201).json(createdObj);
    })
    .catch(() => {
      res.status(500).json({ message: "There has been a problem with the database." });
    })
});

router.post('/:id/posts', validateUserId(), validatePost(), (req, res) => {
  posts.insert({ text: req.body.text, user_id: req.user.id })
    .then(result => {
      res.status(201).json(result);
    })
    .catch(() => {
      res.status(500).json({ message: "There has been an error with the database." })
    })
});

router.get('/', (req, res) => {
  users.get()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({ message: "There has been a problem with the database." });
    })
});

router.get('/:id', validateUserId(), (req, res) => {
  res.status(200).json(req.user);
});

router.get('/:id/posts', validateUserId(), (req, res) => {
  const { id } = req.params;
  users.getUserPosts(id)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(() => {
      res.status(500).json({ message: "There has been a problem with the database." })
    })
});

router.delete('/:id', validateUserId(), (req, res) => {
  const { id } = req.params;
  users.remove(id)
    .then(delRecords => {
      // delRecords is equal to the amount of records the database deleted
      if (delRecords >= 1) {
        return res.status(200).json({ message: "User deleted!" });
      } else {
        return res.status(404).json({ message: "No records deleted" });
      }
    })
    .catch(() => {
      res.status(500).json({ message: "There has been a problem with the database." });
    })
});

router.put('/:id', validateUser(), validateUserId(), (req, res) => {
  const { id } = req.params;

  users.update(id, { name: req.body.name })
    .then(upRecords => {
      // upRecords is equal to the amount of records updated
      if (!upRecords || upRecords <= 0) {
        return res.status(400).json({ message: "No records changed" });
      } else {
        res.status(200).json({ id: id, name: req.body.name });
      }
    })
});

//custom middleware

function validateUserId(req, res, next) {
  return function(req, res, next) {
    const { id } = req.params;

    users.getById(id)
      .then(result => {
        if (result) {
          req.user = result;
          next();
        } else {
          res.status(404).json({ message: "Invalid user ID" })
        }
      })
      .catch(err => {
        next(err);
      });
  }
};

function validateUser(req, res, next) {
  return function(req, res, next) {
    if (!req.body) {
      return res.status(400).json({ message: "Missing request body" })
    }
  
    if (!req.body.name) {
      return res.status(400).json({ message: "Missing required name field" })
    }

    next();
  }
};

function validatePost(req, res, next) {
  return function(req, res, next) {
    if (!req.body) {
      return res.status(400).json({ message: "Missing request body" })
    }

    if (!req.body.text) {
      return res.status(400).json({ message: "Missing required text field" })
    }

    next();
  }
};

module.exports = router;
