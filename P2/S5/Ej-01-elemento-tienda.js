// La variable tienda es una estructura con dos productos

const tienda = [
    {
        nombre: "Producto1",
        descripcion: "Descripcion del producto 1",
        stock: 27
    },
    {
        nombre: "Producto2",
        stock: 4
    }
];

// Mostrar cosas de la tienda

console.log("Productos en la tienda: " + tienda.length);

tienda.forEach((element, index)=>{
    console.log("Producto " + (index + 1) + ": " + element.nombre);
});