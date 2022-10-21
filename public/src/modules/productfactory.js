class Producto {
  static productoID = 1;

  constructor(name, shortDescription, price) {
    this.id = Producto.productoID++;
    this.name = name;
    this.shortDescription = shortDescription;
    this.image = `./assets/products/producto${this.id}.jpg`;
    this.price = price;
  }
}

export default Producto;
