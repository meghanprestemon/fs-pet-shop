'use strict';

const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.disable('x-powered-by');

app.get('/pets', function(req, res) {
  fs.readFile(petsPath, function(err, petsJSON) {
    if(err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    let pets = JSON.parse(petsJSON);
    res.send(pets);
  });
});

app.post('/pets', function(req, res) {
  fs.readFile(petsPath, function(err, petsJSON) {
    if(err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    let pets = JSON.parse(petsJSON);
    let pet = req.body;

    if(!req.body.age || !req.body.kind || !req.body.name) {
      return res.sendStatus(400);
    }

    pets.push(pet);

    let newPetsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, newPetsJSON, function(writeErr) {
      if(writeErr) {
        console.error(writeErr.stack);
        return res.sendStatus(500);
      }

      res.set('Content-Type', 'application/json');
      res.send(pet);
    });
  });
});

app.get('/pets/:id', function(req, res) {
  fs.readFile(petsPath, function(err, petsJSON) {
    if(err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    let pets = JSON.parse(petsJSON);
    let id = Number.parseInt(req.params.id);

    if(id < 0 || id > pets.length-1 || Number.isNaN(id)) {
      return res.sendStatus(404);
    }

    res.set('Content-Type', 'application/json');
    res.send(pets[id]);
  });
});

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});

module.exports = app;
