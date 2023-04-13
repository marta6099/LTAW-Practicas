const fs = require('fs');

// nombre del fichero json que queremos leer
const FICHERO_JSON = "tienda.json";

// leer el fichero
const tienda_json = fs.readFileSync(FICHERO_JSON);

// crear la estructura a partir del fichero
const tienda = JSON.parse(tienda_json);

// Mostrar cosas de la tienda
// -- Usuarios
console.log("Número de usuarios: " + tienda.usuarios.length);

tienda.usuarios.forEach((element)=>{
    console.log("-- " + element.nickname);
});

// -- Productos
console.log("Número de productos: " + tienda.productos.length);

tienda.productos.forEach((element)=>{
    console.log("-- " + element.nombre + " (" + element.stock + ")");
});

// -- Pedidos
console.log("Número de pedidos: " + tienda.pedidos.length);

tienda.pedidos.forEach((element)=>{
    console.log(element);
});