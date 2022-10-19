import express from "express";
import { engine } from "express-handlebars";
import routerPage from "./routers/page.js";
import routerProducts from "./routers/products.js";

const app = express();

app.engine("handlebars", engine());

app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.static("public"));

app.get("*", (req, res, next)=>{
  console.log(req.url);
  next()
});

app.get("/", (req, res) => {
  res.render("inicio", { title: "Juguetería Cósmica" });
});

app.use("/views", routerPage);

app.use("/api/products", routerProducts);


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
