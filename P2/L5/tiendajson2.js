const fs = require('fs');

// nombre del fichero json que queremos leer
const FICHERO_JSON = "tienda.json";

// leer el fichero
const tienda_json = fs.readFileSync(FICHERO_JSON);

// crear la estructura a partir del fichero
const tienda = JSON.parse(tienda_json);

// modificación
tienda.productos.forEach((element) => {
    element.stock += 1;
})

// guardar
let myJSON = JSON.stringify(tienda);
fs.writeFileSync(FICHERO_JSON, myJSON);
console.log("Información guardada en el fichero: " + FICHERO_JSON);