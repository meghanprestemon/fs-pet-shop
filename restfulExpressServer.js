'use strict';

const PetsRepository = require('./PetsRepository');
const petsRepository = new PetsRepository();

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const morgan = require('morgan');
app.use(morgan('short'));

app.disable('x-powered-by');
app.set('port', process.env.PORT || 5000);

app.get('/pets/:id/', (req, res) => {
  const id = req.params.id;
  petsRepository.get(id).then((pet) => {
    res.send(pet);
  })
  .catch(err => res.send(err));
});

app.get('/pets/', (req, res) => {
  petsRepository.query().then((petsData) => {
    res.send(petsData);
  })
  .catch(err => res.send(err));
});

app.post('/pets/', (req, res) => {
  petsRepository.create(req.body).then((pet) => {
    res.send(pet);
  })
  .catch(err => res.send(err));
});

app.delete('/pets/:id/', (req, res) => {
  const id = req.params.id;
  petsRepository.delete(id).then((pet) => {
    res.send(pet);
  })
  .catch(err => res.send(err));
});

app.patch('/pets/:id/', (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  petsRepository.update(id, changes).then((pet) => {
    res.send(pet);
  })
  .catch(err => res.send(err));
});

app.use((req, res) => {
  res.sendStatus(404);
});

app.listen(app.get('port'), () => {
  console.log('Listening on', app.get('port'));
});

module.exports = app;
