import express from "express";
import { engine } from "express-handlebars";
import fs from "fs";
import dataBase from "./public/js/modules/fakeDB.js";


const dir = './views';

async function getNumFiles(dir){
  const viewNames = new Set();
  
  const files = await fs.promises.readdir(dir)

  files.forEach(file => {
    if(file.includes('.handlebars')){
      viewNames.add(file.split('.')[0])
    }
  })

  return viewNames;
}

let allViews = await getNumFiles(dir).then((files) => files)

const app = express();

app.engine("handlebars", engine());

app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("inicio", { title: "Juguetería Cósmica" });
});

app.get("/views/inicio", (req, res) => {
  res.render("inicio", { title: "Juguetería Cósmica", products: dataBase, layout: false });
});

app.get("/views/:page", (req, res) => {
  if (allViews.has(req.params.page)) {
    res.render(req.params.page, { title: req.params.page, layout: false });
  } else {
    res.render("404", { title: "Página no existe", layout: false });
  }
});

app.get("/:invalid?", (req, res) => {
  let page = req.params.invalid;
  res.redirect(`/#/${page}` );
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