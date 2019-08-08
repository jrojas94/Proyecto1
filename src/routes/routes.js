const express = require('express');
const router = express.Router();

const Comment = require('../models/comment');

router.get('/', async (req, res) => {
  const comments = await Comment.find();
  console.log(comments);
  res.json(comments);
});

router.post('/', async (req, res) => {
  const { subject, comment } = req.body;
  const Comentario = new Comment({ subject, comment });
  console.log(Comentario);
  await Comentario.save();
  res.json({status: 'comentario guardado'});
});

router.get('/signup', (req, res, next) => {
  res.render('signup');
});

router.post('/signup', (req, res, next) => {

});

router.get('/signin', (req, res, next) => {

});

router.post('/signin', (req, res, next) => {

});

router.get('/:id', async (req, res) => {
  const findComment = await Comment.findById(req.params.id);
  res.json(findComment);
});

router.put('/:id', async (req, res) => {
  const { subject, comment } = req.body;
  const newComment = { subject, comment };
  await Comment.findByIdAndUpdate(req.params.id, newComment);
  res.json({status: 'comentario actualizado'});
});

router.delete('/:id', async (req, res) => {
  await Comment.findByIdAndRemove(req.params.id);
  res.json({status: 'comentario eliminado'});
});

module.exports = router;
