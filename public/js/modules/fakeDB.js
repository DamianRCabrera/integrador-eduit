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

const dataBase = [];

dataBase.push(
  new Producto(
    "Disfraz Disney",
    'Disfraz Disney encanto Mirabel talle "1"',
    5860
  )
);
dataBase.push(
  new Producto("Monopatín rosa", "Monopatin Rocker Pro 4 Ruedas Rosa", 12400)
);
dataBase.push(
  new Producto(
    "Bebote Cry",
    "Bebote Cry Babies Llora c/Lagrimas y sonido",
    12600
  )
);
dataBase.push(
  new Producto(
    "Casa de muñecas",
    "Pinypon Casa Rosa Maletin con figuras y accesorios",
    15130
  )
);
dataBase.push(
  new Producto("Monopatin Negro", "Monopatin Rocker Pro 4 Ruedas Negro", 13175)
);
dataBase.push(
  new Producto("Cocina de juguete", "Cocina plástica Duravit en caja", 6230)
);
dataBase.push(new Producto("Pistola X", "Pistola X Shot Excel Hawk Eye", 5860));
dataBase.push(
  new Producto(
    "Hot Wheels Parking",
    "Guarda Autos Hot Wheels 3x1 Rack n Track",
    8541
  )
);
dataBase.push(
  new Producto(
    "Monopoly Board Game",
    "Juego de mesa Monopoly Banco Electronico",
    9950
  )
);
dataBase.push(
  new Producto("Disfraz Marvel", "Disfraz Spiderman talle '1'", 3550)
);
dataBase.push(
  new Producto(
    "Vehiculo Paw Patrol",
    "Vehiculo Paw Patrol Rescue Knights con figura Marshall",
    10250
  )
);
dataBase.push(new Producto("Metegol", "Metegol de mesa madera", 12500));

export default dataBase;