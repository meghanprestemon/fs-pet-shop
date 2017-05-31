#!/usr/bin/env node

var fs = require('fs');
var cmd = process.argv[2];

if (cmd === 'read') {
  fs.readFile('./pets.json', 'utf8', function(err, data) {
    if (err) {
      throw err;
    }

    var pets = JSON.parse(data);
    var indexInput = process.argv[3]
      if (indexInput) {
        if ((indexInput < 0) || (indexInput >= pets.length)) {
          console.error("Usage: node pets.js read INDEX");
          process.exit(1);
        } else {
          console.log(pets[indexInput]);
        }
      } else {
        console.log(pets);
      }
  });
}
else if (cmd === "create") {
  fs.readFile('./pets.json', 'utf8', function(readErr, data) {
    if (readErr) {
      throw readErr;
    }

    var pets = JSON.parse(data);
    var age = process.argv[3];
    var kind = process.argv[4];
    var name = process.argv[5];

    if (!age || !kind || !name) {
      console.error('Usage: node pets.js create AGE KIND NAME');
      process.exit(1);
    }

    var pet = {'age': Number(age), 'kind': kind, 'name': name};

    pets.push(pet)

    var petsJSON = JSON.stringify(pets);

    fs.writeFile('./pets.json', petsJSON, function(writeErr) {
      if (writeErr) {
        throw writeErr;
      }

      console.log(pet);
    });
  });
}
else if (cmd === "update") {
  fs.readFile('./pets.json', 'utf8', function(err, data) {
    if (err) {
      throw err;
    }

    var pets = JSON.parse(data);
    var index = process.argv[3];
    var age = process.argv[4];
    var kind = process.argv[5];
    var name = process.argv[6];

    if (!index || !age || !kind || !name) {
      console.error('Usage: node pets.js update INDEX AGE KIND NAME');
      process.exit(1);
    }

    pets[index] = {'age': Number(age), 'kind': kind, 'name': name};

    var petsJSON = JSON.stringify(pets);

    fs.writeFile('./pets.json', petsJSON, function(writeErr) {
      if (writeErr) {
        throw writeErr;
      }

      console.log(pets[index]);
    });
  });
}
else if (cmd === "destroy") {
  fs.readFile('./pets.json', 'utf8', function(err, data) {
    if (err) {
      throw err;
    }

    var pets = JSON.parse(data);
    var index = process.argv[3];
    var destroyed = pets.splice(index, 1)[0];

    if (!index) {
      console.error('Usage: node pets.js destroy INDEX');
      process.exit(1);
    }

    var petsJSON = JSON.stringify(pets);

    fs.writeFile('./pets.json', petsJSON, function(writeErr) {
      if (writeErr) {
        throw writeErr;
      }

      console.log(destroyed);
    });
  });
}
else {
  console.error("Usage: node pets.js [read | create | update | destroy]");
  process.exit(1);
}
