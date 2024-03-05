const express = require('express');
const router = express.Router();
const userRouter = require('./user');
const postRouter = require("./post");

// Define your routes
router.use("/user", userRouter);
router.use("/post", postRouter);

router.get('/', (req, res) => {
  res.send('Hello from the main route!');
});

router.get('/about', (req, res) => {
  res.send('About page');
});

module.exports = router;