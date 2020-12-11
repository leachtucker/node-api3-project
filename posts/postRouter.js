const express = require('express');
const posts = require('./postDb');

const router = express.Router();

router.get('/', (req, res) => {
  posts.get()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(() => {
      res.status(500).json({ message: "There has been a problem with the database." })
    })
});

router.get('/:id', validatePostId(), (req, res) => {
  res.status(200).json(req.post);
});

router.delete('/:id', validatePostId(), (req, res) => {
  const { id } = req.post;
  posts.remove(id)
    .then(delRecords => {
      if (delRecords <= 0) {
        return res.status(202).json({ message: "No records deleted." });
      }
      res.status(200).json({ message: "Post deleted." });
    })
    .catch(err => {
      res.status(500).json({ message: "There has been a problem with the database." })
    })
});

router.put('/:id', validatePostId(), (req, res) => {
  const { id } = req.post;

  // Validate changes (req.body.text)
  if (!req.body.text) {
    return res.status(400).json({ message: "Missing required text field." })
  }

  posts.update(id, { text: req.body.text })
    .then(() => {
      res.status(200).json({ message: "Post updated!" })
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "There has been a problem with the database." })
    })

});

// custom middleware
function validatePostId(req, res, next) {
  // Validates that post exists with the specified ID. If so, it set's the specified post to the _req.post_. If not, it returns a response with status 404.
  return function(req, res, next) {
    const { id } = req.params;
    posts.getById(id)
      .then(post => {
        if (!post) {
          return res.status(400).json({ message: "Invalid post ID" });
        }

        req.post = post;
        next();
      })
      .catch(err => {
        next(err);
      })
  }
};

module.exports = router;
