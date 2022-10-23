import Producto from "../modules/productfactory.js";

const DataBase = [];

DataBase.push(
  new Producto(
    "Disfraz Disney",
    'Disfraz Disney encanto Mirabel talle "1"',
    5860,
    10
  )
);
DataBase.push(
  new Producto("Monopatín rosa", "Monopatin Rocker Pro 4 Ruedas Rosa", 12400)
);
DataBase.push(
  new Producto(
    "Bebote Cry",
    "Bebote Cry Babies Llora c/Lagrimas y sonido",
    12600,
    5
  )
);
DataBase.push(
  new Producto(
    "Casa de muñecas",
    "Pinypon Casa Rosa Maletin con figuras y accesorios",
    15130,
    3
  )
);
DataBase.push(
  new Producto("Monopatin Negro", "Monopatin Rocker Pro 4 Ruedas Negro", 13175, 4)
);
DataBase.push(
  new Producto("Cocina de juguete", "Cocina plástica Duravit en caja", 6230,3)
);
DataBase.push(new Producto("Pistola X", "Pistola X Shot Excel Hawk Eye", 5860,0));
DataBase.push(
  new Producto(
    "Hot Wheels Parking",
    "Guarda Autos Hot Wheels 3x1 Rack n Track",
    8541,
    2
  )
);
DataBase.push(
  new Producto(
    "Monopoly Board Game",
    "Juego de mesa Monopoly Banco Electronico",
    9950,
    8
  )
);
DataBase.push(
  new Producto("Disfraz Marvel", "Disfraz Spiderman talle '1'", 3550,1)
);
DataBase.push(
  new Producto(
    "Vehiculo Paw Patrol",
    "Vehiculo Paw Patrol Rescue Knights con figura Marshall",
    10250,5
  )
);
DataBase.push(new Producto("Metegol", "Metegol de mesa madera", 12500, 6));

export default DataBase;
