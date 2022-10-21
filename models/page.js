import fs from "fs";

const dir = "./views";
const viewNames = new Set();

class ModelPage {
  async getNumFiles() {
    const files = await fs.promises.readdir(dir);
    files.forEach((file) => {
      if (file.includes(".handlebars")) {
        viewNames.add(file.split(".")[0]);
      }
    });
    return viewNames;
  }
}

export default ModelPage;
