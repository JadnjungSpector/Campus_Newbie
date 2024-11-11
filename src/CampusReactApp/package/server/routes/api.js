const express = require('express');
const router = express.Router();
const BlogPost = require('../models/blogPost'); // Assuming you have a BlogPost model

// GET all blog posts
router.get('/blogdata', async (req, res) => {
  try {
    const posts = await BlogPost.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single blog post
router.get('/blogdata/:id', async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (post == null) {
      return res.status(404).json({ message: 'Cannot find blog post' });
    }
    res.json(post);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// POST a new blog post
router.post('/blogdata', async (req, res) => {
  const post = new BlogPost({
    title: req.body.title,
    subtitle: req.body.subtitle,
    description: req.body.description,
    image: req.body.image
  });

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT (update) a blog post
router.put('/blogdata/:id', async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (post == null) {
      return res.status(404).json({ message: 'Cannot find blog post' });
    }

    if (req.body.title != null) {
      post.title = req.body.title;
    }
    if (req.body.subtitle != null) {
      post.subtitle = req.body.subtitle;
    }
    if (req.body.description != null) {
      post.description = req.body.description;
    }
    if (req.body.image != null) {
      post.image = req.body.image;
    }

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a blog post
router.delete('/blogdata/:id', async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (post == null) {
      return res.status(404).json({ message: 'Cannot find blog post' });
    }

    await post.remove();
    res.json({ message: 'Deleted Blog post' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;