  
const router = require('express').Router();
let Item = require('../models/item.model');

router.route('/').get((req, res) => {
    Item.find()
    .then(items => res.json(items))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const title = req.body.title;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const status = Boolean(req.body.status);
  const date = Date.parse(req.body.date);

  const newItem = new Item({
    username,
    title,
    description,
    duration,
    status,
    date,
  });

  newItem.save()
  .then(() => res.json('Item added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

// async await ve promise

router.route('/:id').get((req, res) => {
    Item.findById(req.params.id)
      .then(item => res.json(item))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/:id').delete((req, res) => {
    Item.findByIdAndDelete(req.params.id)
      .then(() => res.json('Item deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  /*   const username = req.body.username;
  const title = req.body.title;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const status = Boolean(req.body.status);
  const date = Date.parse(req.body.date);
  */
  
  // put all info, patch partial change
  // "update" should not be in the url
  router.route('/update/:id').post((req, res) => {
    Item.findById(req.params.id)
      .then(item => {
        item.username = req.body.username;
        item.title = req.body.title;
        item.description = req.body.description;
        item.duration = Number(req.body.duration);
        item.status = Boolean(req.body.status);
        item.date = Date.parse(req.body.date);
  
        item.save()
          .then(() => res.json('Item updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;
