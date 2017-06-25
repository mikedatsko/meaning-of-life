const express = require('express');
const router = express.Router();
const tokens = require('../tokens');
const Meaning = require('../models/meaning');

router.get('/:filter', (req, res, next) => {
  const filter = req.params.filter;
  let sort;
  const addedMeanings = req.session.addedMeanings;

  switch(filter) {
    case 'dislikes':
      sort = {
        dislikes: -1,
        contr: -1,
        created: -1
      };
      break;

    case 'contr':
      sort = {
        contr: -1,
        likes: -1,
        dislikes: -1,
        created: -1
      };
      break;

    case 'likes':
    default:
      sort = {
        likes: -1,
        contr: -1,
        created: -1
      };
      break;
  }

  Meaning.find()
    .sort(sort)
    .limit(500)
    .exec((err, meanings) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          title: 'An error occured',
          error: err,
          addedMeanings: addedMeanings
        });
      }

      res.status(200).json({
        message: 'Success',
        obj: meanings,
        addedMeanings: addedMeanings
      });
    });
});

router.post('/', (req, res, next) => {
  const addedMeanings = req.session.addedMeanings;

  if (!addedMeanings) {
    return res.status(403).json({
      status: 403,
      title: 'Your meanings are ended',
      error: 'meanings-ended',
      addedMeanings: addedMeanings
    });
  }

  req.session.addedMeanings--;

  const meaning = new Meaning({
    name: req.body.name,
    likes: 0,
    dislikes: 0,
    contr: 0,
    created: new Date()
  });

  meaning.save((err, result) => {
    if (err) {
      return res.status(500).json({
        status: 500,
        title: 'An error occured',
        error: err,
        addedMeanings: addedMeanings
      });
    }

    res.status(201).json({
      message: 'Meaning created',
      obj: result,
      addedMeanings: addedMeanings
    });
  });
});

router.put('/:id', (req, res, next) => {
  const addedMeanings = req.session.addedMeanings;

  Meaning.findById(req.params.id, (err, meaning) => {
    if (err) {
      return res.status(500).json({
        status: 500,
        title: 'An error occured',
        error: err,
        addedMeanings: addedMeanings
      });
    }

    if (!meaning) {
      return res.status(500).json({
        status: 500,
        title: 'No meaning found',
        error: {
          message: 'Meaning not found'
        },
        addedMeanings: addedMeanings
      });
    }

    if (req.body.like) {
      meaning.likes ++;
    } else {
      meaning.dislikes ++;
    }

    meaning.contr ++;

    meaning.save((err, result) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          title: 'An error occured',
          error: err,
          addedMeanings: addedMeanings
        });
      }

      res.status(200).json({
        message: 'Updated meaning',
        obj: result,
        addedMeanings: addedMeanings
      });
    });
  });
});

router.delete('/:id', (req, res, next) => {
  const addedMeanings = req.session.addedMeanings;

  Meaning.findById(req.params.id, (err, meaning) => {
    if (err) {
      return res.status(500).json({
        status: 500,
        title: 'An error occured',
        error: err,
        addedMeanings: addedMeanings
      });
    }

    if (!meaning) {
      return res.status(500).json({
        status: 500,
        title: 'No meaning found',
        error: {
          message: 'Meaning not found'
        },
        addedMeanings: addedMeanings
      });
    }

    meaning.name = req.body.name;
    meaning.remove((err, result) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          title: 'An error occured',
          error: err,
          addedMeanings: addedMeanings
        });
      }

      res.status(200).json({
        message: 'Removed meaning',
        obj: result,
        addedMeanings: addedMeanings
      });
    });
  });
});

module.exports = router;
