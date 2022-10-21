import ModelPage from "../models/page.js";

const modelPage = new ModelPage();

class ApiPage {
  async getViews() {
    let allViews = await modelPage.getNumFiles().then((files) => files);
    return allViews;
  }
}

export default ApiPage;
