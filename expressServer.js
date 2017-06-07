'use strict';

const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');

const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

app.disable('x-powered-by');

function throwError(err) {
  if(err) {
    console.error(err.stack);
    return res.sendStatus(500);
  }
};
//can I use this instead of typing out the error code every time?
//if so, what do i pass in?

app.get('/pets', function(req, res) {
  fs.readFile(petsPath, function(err, petsJSON) {
    //Where is it getting petsJSON from? petsPath?
    throwError(err);
    //not sure if i can put this here

    let pets = JSON.parse(petsJSON);
    res.send(pets);
  });
});

app.get('/pets/:id', function(req, res) {
  fs.readFile(petsPath, function(err, petsJSON) {
    throwError(err);

    let id = Number.parseInt(req.params.id);
    let pets = JSON.parse(petsJSON);

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
