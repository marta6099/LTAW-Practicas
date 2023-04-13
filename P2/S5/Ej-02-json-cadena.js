// Estructura en JSON en una cadena
const tienda_json = `[
    {
        "nombre": "Producto1",
        "descripcion": "Descripcion del producto 1",
        "stock": 27
    },
    {
        "nombre": "Producto2",
        "stock": 4
    }
]`

// Crear la estructura a partir de la cadena
const tienda = JSON.parse(tienda_json);

// Mostrar cosas de la tienda
console.log("Productos en la tienda: " + tienda.length);

tienda.forEach((element, index)=>{
    console.log("Producto " + (index + 1) + ": " + element.nombre);
});