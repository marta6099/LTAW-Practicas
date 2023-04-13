const fs = require('fs');

// nombre del fichero json que queremos leer
const FICHERO_JSON = "Ej-03-fichero-json.json";

// leer el fichero
const tienda_json = fs.readFileSync(FICHERO_JSON);

// crear la estructura a partir del fichero
const tienda = JSON.parse(tienda_json);

// Mostrar cosas de la tienda
console.log("Productos en la tienda: " + tienda.length);

tienda.forEach((element, index)=>{
    console.log("Producto " + (index + 1) + ": " + element.nombre);
});