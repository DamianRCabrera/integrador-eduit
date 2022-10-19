import fs from 'fs';

const dir = './views';
const viewNames = new Set();


//Función para crear dinámicamente las rutas posibles de las views
async function getNumFiles(){
  const files = await fs.promises.readdir(dir)

  files.forEach(file => {
    if(file.includes('.handlebars')){
      viewNames.add(file.split('.')[0])
    }
  })

  return viewNames;
}



export default {
  getNumFiles,
}

