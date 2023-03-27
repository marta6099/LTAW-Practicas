function agregarAlCarrito() {
    // Obtener la información del producto
    var producto = document.getElementById("producto").innerHTML;
  
    // Agregar el producto al carrito
    productosEnCarrito.push(producto);
  
    // Mostrar una alerta para confirmar que el producto se ha agregado al carrito
    alert("El producto se ha agregado al carrito");
  }