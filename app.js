import express from "express";
import { engine } from "express-handlebars";

const app = express();

app.engine("handlebars", engine());

app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("inicio", { title: "Juguetería Cósmica - Damián Cabrera" });
});

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
