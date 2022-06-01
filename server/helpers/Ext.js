var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
  next();
});

router.get('/', function(req, res) {
  res.send('hi1');
});

router.get('/about', function(req, res) {
  res.send('hi2');
});


router.get('/test2', (req, res) => {
  res.send([
    {
      "id": 1,
      "name": "yuna kim",
      "age": "25"
    },
    {
      "id": 2,
      "name": "Ervin Howell",
      "age": "25"
    },
    {
      "id": 3,
      "name": "Clementine Bauch",
      "age": "27"
    },
    {
      "id": 4,
      "name": "Patricia Lebsack",
      "age": "30"
    },
    {
      "id": 5,
      "name": "Chelsey Dietrich",
      "age": "20"
    },
    {
      "id": 6,
      "name": "Mrs. Dennis Schulist",
      "age": "15"
    },
    {
      "id": 7,
      "name": "Kurtis Weissnat",
      "age": "17"
    },
    {
      "id": 8,
      "name": "Nicholas Runolfsdottir V",
      "age": "7"
    },
    {
      "id": 9,
      "name": "Glenna Reichert",
      "age": "4"
    },
    {
      "id": 10,
      "name": "Clementina DuBuque",
      "age": "45"
    }
  ]);
})


module.exports = router;