const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');

class PetsRepository {

  getPets() {
    return new Promise((resolve, reject) => {
      fs.readFile(petsPath, (err, petsJSON) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(JSON.parse(petsJSON));
      });
    })
  }

  query() {
    return this.getPets();
  }

  get(id) {
    return this.getPets()
    .then((petsData) => {
      if (!petsData[id]) {
        throw 404;
      }
      return petsData[id];
    });
  }

  create(pet) {
    return this.getPets()
    .then((petsData) => {
      if (!Number.parseInt(pet.age) || !pet.kind || !pet.name) {
        throw 400;
      }
      petsData.push(pet);
      fs.writeFileSync(petsPath, JSON.stringify(petsData));
      return pet;
    });
  }

  delete(id) {
    return this.getPets()
    .then((petsData) => {
      if (!petsData[id]) {
        throw 404;
      }
      let pet = petsData.splice(id, 1);
      fs.writeFileSync(petsPath, JSON.stringify(petsData));
      return pet[0];
    });
  }

  update(id, changes) {
    return this.getPets()
    .then((petsData) => {
      if (!petsData[id]) {
        throw 404;
      }
      if (!(Number.parseInt(petsData[id].age) || petsData[id].kind || petsData[id].name)) {
        throw 400;
      }
      petsData[id] = Object.assign({}, petsData[id], changes);
      fs.writeFileSync(petsPath, JSON.stringify(petsData));
      return petsData[id];
    });
  }
}

module.exports = PetsRepository;

// let pet = new PetsRepository();
// console.log(pet.pets);
