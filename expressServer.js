'use strict';

const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.disable('x-powered-by');

function throwError(err) {
  if(err) {
    console.error(err.stack);
    return res.sendStatus(500);
  }
};
//can I use this instead of typing out the error code every time?
//if so, what do i pass in?

function writeError(writeErr) {
  if(writeErr) {
    console.error(writeErr.stack);
    return res.sendStatus(500);
  }
}
//can i also use this?

app.get('/pets', function(req, res) {
  fs.readFile(petsPath, function(err, petsJSON) {
    //Where is it getting petsJSON from? petsPath?
    throwError(err);
    //not sure if i can put this here

    let pets = JSON.parse(petsJSON);
    res.send(pets);
  });
});

app.post('/pets/', function(req, res) {
  fs.readFile(petsPath, function(err, petsJSON) {
    throwError(err);

    let pets = JSON.parse(petsJSON);
    let pet = req.body.name;

    if(!pet) {
      return res.sendStatus(400);
    }

    pets.push(pet);

    let newPetsJSON = JSON.stringify(pets);

    fw.writeFile(petsPath, newPetsJSON, function(writeErr) {
      writeError(writeErr);

      res.set('Content-Type', 'text/plain');
      res.send(pet);
    });
  });
});

app.get('/pets/:id', function(req, res) {
  fs.readFile(petsPath, function(err, petsJSON) {
    throwError(err);

    let pets = JSON.parse(petsJSON);
    let id = Number.parseInt(req.params.id);

    if(id < 0 || id > pets.length || Number.isNaN(id)) {
      return res.sendStatus(404);
    }

    res.set('Content-Type', 'text/plain');
    res.send(pets[id]);
  });
});

app.use(function(req, res) {
  res.sendStatus(404);
});
//what does this do?
//is this the default if there is no additional path specified (i.e. /pets)?

app.listen(port, function() {
  console.log('Listening on port', port);
});
