class Main {
  async ajax(url, method = "get") {
    return await fetch(url, { method: method }).then((res) => res.text());
  }

  getIdFromHash() {
    let id = location.hash.slice(1);
    if (id[0] === "/") {
      id = id.slice(1);
    }
    return id || "inicio";
  }

  getViewUrlFromId(id) {
    return `views/${id}`;
  }

  getModuleUrlFromId(id) {
    return `./modules/${id}.js`;
  }

  setActiveLink(id) {
    const links = document.querySelectorAll(".main-nav__link");
    links.forEach((link) => {
      if (link.getAttribute("href") === `#/${id}`) {
        link.classList.add("main-nav__link--active");
        link.ariaCurrent = "page";
      } else {
        link.classList.remove("main-nav__link--active");
        link.removeAttribute("aria-current");
      }
    });
  }

  async initJS(id) {
    const moduleUrl = this.getModuleUrlFromId(id);
    try {
      const { default: module } = await import(moduleUrl);
      if (typeof module.init !== "function") {
        console.error(`El módulo ${id} no posee un método init().`);
        return;
      }
      module.init();
    } catch (error) {
      console.log(error);
      console.error(`No se pudo importar el módulo ${moduleUrl}.`);
    }
  }

  hideHamburguer(){
    const hamburguerToggle = document.getElementById("main-nav-toggle");
    hamburguerToggle.checked = false;
  }

  async loadTemplate() {
    const id = this.getIdFromHash();

    this.hideHamburguer();

    const viewUrl = this.getViewUrlFromId(id);

    //Cargar loader
    document.querySelector("main").innerHTML = `<h1>Cargando</h1>`;
    //

    const viewContent = await this.ajax(viewUrl);

    document.querySelector("main").innerHTML = viewContent;

    this.setActiveLink(id);

    document.title = `Jugueteria Cósmica - ${
      id.charAt(0).toUpperCase() + id.slice(1)
    } - Damián Cabrera`;

    this.initJS(id);
  }

  async loadTemplates() {
    this.loadTemplate();
    window.addEventListener("hashchange", () => this.loadTemplate());
  }

  async start() {
    await this.loadTemplates();
  }
}

const main = new Main();
main.start();
