const fs = require("fs")

function generate() {
  let arr = new Array(300);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = {
      name: 'Location ' + i,
      coordinates: [
        Math.floor(Math.random() * (180  - (-180) + 1)) + (-180),
        Math.floor(Math.random() * (90  - (-90) + 1)) + (-90)
      ]
    }
  }
  fs.writeFile('locations-big.json', JSON.stringify(arr), err => {
    if (err) throw err;
  });
}
generate();
