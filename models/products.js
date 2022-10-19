// Creando clase de lo que van a ser los productos.

class Producto {
  static productQuantity = 1;

  constructor(name, shortDescription, price){
    this.id = Producto.productQuantity++;
    this.name = name;
    this.shortDescription = shortDescription;
    this.image = `./assets/products/producto${this.id}.jpg`
    this.price = price
  }
}

// Instanciando los objetos que serviran de base de datos.

const products = [];

products.push(
  new Producto(
    "Disfraz Disney",
    'Disfraz Disney encanto Mirabel talle "1"',
    5860
  )
);
products.push(
  new Producto("Monopatín rosa", "Monopatin Rocker Pro 4 Ruedas Rosa", 12400)
);
products.push(
  new Producto(
    "Bebote Cry",
    "Bebote Cry Babies Llora c/Lagrimas y sonido",
    12600
  )
);
products.push(
  new Producto(
    "Casa de muñecas",
    "Pinypon Casa Rosa Maletin con figuras y accesorios",
    15130
  )
);
products.push(
  new Producto("Monopatin Negro", "Monopatin Rocker Pro 4 Ruedas Negro", 13175)
);
products.push(
  new Producto("Cocina de juguete", "Cocina plástica Duravit en caja", 6230)
);
products.push(new Producto("Pistola X", "Pistola X Shot Excel Hawk Eye", 5860));
products.push(
  new Producto(
    "Hot Wheels Parking",
    "Guarda Autos Hot Wheels 3x1 Rack n Track",
    8541
  )
);
products.push(
  new Producto(
    "Monopoly Board Game",
    "Juego de mesa Monopoly Banco Electronico",
    9950
  )
);
products.push(
  new Producto("Disfraz Marvel", "Disfraz Spiderman talle '1'", 3550)
);
products.push(
  new Producto(
    "Vehiculo Paw Patrol",
    "Vehiculo Paw Patrol Rescue Knights con figura Marshall",
    10250
  )
);
products.push(new Producto("Metegol", "Metegol de mesa madera", 12500));

////////////////////////////////////////////////////////////////////////////////
//                              CRUD - C: Create                              //
////////////////////////////////////////////////////////////////////////////////`

let createProduct = (product) =>{
  let newProduct = new Producto(product.id, product.name, product.shortDescription, product.image, product.price);
  products.push(newProduct);
  return newProduct;
};


////////////////////////////////////////////////////////////////////////////////
//                               CRUD - R: Read                               //
////////////////////////////////////////////////////////////////////////////////

const readProducts = () => products;

const readProduct = id => products.find( product => product.id === id ) || {};


////////////////////////////////////////////////////////////////////////////////
//                              CRUD - U: Update                              //
////////////////////////////////////////////////////////////////////////////////`

const updateProduct = (id, product) => {
  product.id = id;

  const index = products.findIndex( product => product.id === id );
  // Si no se encontró
  if (index === -1) {
      return {};
  }
  products[index] = product;
  return product;
};

////////////////////////////////////////////////////////////////////////////////
//                              CRUD - D: Delete                              //
////////////////////////////////////////////////////////////////////////////////

const deleteProduct = id => {
  const index = products.findIndex( product => product.id === id );
  // Si no se encontró
  if (index === -1) {
      return {};
  }
  const removedProduct = products.splice(index, 1)[0];
  return removedProduct;
};


export default {
  createProduct,
  readProducts,
  readProduct,
  updateProduct,
  deleteProduct
};