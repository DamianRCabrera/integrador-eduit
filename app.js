import express from "express";
import { engine } from "express-handlebars";
import routerPage from "./routers/page.js";
import routerProducts from "./routers/products.js";
import routerCart from "./routers/cart.js";
import routerTable from "./routers/table.js";
import DBMongoDB from "./models/DB/MongoDB.js";
import cors from 'cors';

const app = express();

DBMongoDB.connectDB();

////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.engine("handlebars", engine());

app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("inicio", { title: "Juguetería Cósmica" });
});

app.use("/views", routerPage);

app.use("/api/products", routerProducts);

app.use("/api/cart", routerCart);

app.use("/api/table", routerTable);

const PORT = 8080;
const server = app.listen(PORT, () =>
  console.log(`Servidor Express escuchando en el puerto ${PORT}`)
);
server.on("error", (error) =>
  console.error(
    "Se produjo un error al intentar iniciar el servidor Express. Detalle: " +
      error.message
  )
);
