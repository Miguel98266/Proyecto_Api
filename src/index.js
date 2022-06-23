import axios from "axios";

// Sección
let currentpage = [1];
let contenedor = document.querySelector("#contenedor");
let contenedorPersonajes = document.querySelector("#contenedor_personajes");
let buscar = document.querySelector("#search");
let limpiarbuscador = document.querySelector("#limpiar");
const paginador = document.querySelector(".pagination");

var nombre = "";
var genero = "";
var specie = "";
var statu = "";

var divspecie = document.querySelector("#species");
var divgender = document.querySelector("#gender");
var divstatus = document.querySelector("#status");

var statusFilter = [];
var speciesFilter = [];
var genderFilter = [];

const getEpisodios = async (episode) => {
  return await axios.get(episode).then((res) => res.data);
};

// const data = getEpisodios("https://rickandmortyapi.com/api/episode/1");
// console.log(data.then((res) => res));

getPersonajes();

async function buscarPersonaje(e) {
  nombre = e.target.value;
  currentpage[0] = 1;
  // if (e.key === "Enter") {
  //   getPersonajes();
  // }
  getPersonajes();
}

eventListener();
function eventListener() {
  buscar.addEventListener("keypress", buscarPersonaje);
  gender.addEventListener("click", filtrarGenero);
  species.addEventListener("click", filtrarSpecie);
  divstatus.addEventListener("click", filtrarStatus);
  limpiarbuscador.addEventListener("click", limpiarseach);
}

function limpiarseach() {
  nombre = "";
  genero = "";
  specie = "";
  statu = "";
  getPersonajes();
}

function filtrarGenero(e) {
  console.log(e.target.htmlFor);
  if (e.target.htmlFor) {
    genero = e.target.htmlFor;
    getPersonajes();
  }
}
function filtrarStatus(e) {
  console.log(e.target.htmlFor);
  if (e.target.htmlFor) {
    statu = e.target.htmlFor;
    getPersonajes();
  }
}
function filtrarSpecie(e) {
  console.log(e.target.htmlFor);
  if (e.target.htmlFor) {
    specie = e.target.htmlFor;
    getPersonajes();
  }
}

function imprimirPersonajes({ results }) {
  limpiar(contenedorPersonajes);
  if (results[0] != null) {
    results.forEach((personaje) => {
      let card = document.createElement("div");
      let cardbody = document.createElement("div");
      let img = document.createElement("img");
      let divstatusspecie = document.createElement("div");
      let status_specie = document.createElement("p");
      let labelLocation = document.createElement("p");
      let location = document.createElement("p");
      let labelEpisode = document.createElement("p");
      let episode = document.createElement("p");
      let icon = document.createElement("span");
      let title = document.createElement("h4");

      // prevPage.classList.add("btn", "btn-outline-light");
      // nextPage.classList.add("btn", "btn-outline-light");
      // containButones.append(prevPage, nextPage);
      // containButones.classList.add("d-flex", "justify-content-center", "gap-3");
      // contenedor.append(containButones);

      card.classList.add(
        "card",
        "mx-2",
        "my-3",
        "shadow",
        "p-3",
        "mb-5",
        "bg-body",
        "rounded"
      );
      cardbody.classList.add("card-body");
      divstatusspecie.classList.add("d-flex", "align-items-center");
      status_specie.classList.add("card-text");
      icon.classList.add("dot", "mx-1");
      title.classList.add("card-title");
      labelLocation.classList.add("card-text", "text-gray");
      labelEpisode.classList.add("card-text", "text-gray");

      img.src = personaje.image;
      status_specie.textContent =
        personaje.status + " - " + personaje.species + " - " + personaje.gender;
      labelLocation.textContent = "Last known location:";
      location.textContent = personaje.location.name;
      title.textContent = personaje.name;

      card.dataset.id = personaje.id;
      if (personaje.status == "Alive") {
        icon.classList.add("bg-alive");
      } else if (personaje.status == "Dead") {
        icon.classList.add("bg-dead");
      } else {
        icon.classList.add("bg-unknown");
      }
      // console.log(personaje.episode[0]);

      let data = getEpisodios(personaje.episode[0]);
      data.then((res) => (episode.textContent = res.episode + " " + res.name));
      labelEpisode.textContent = "First seen in:";

      card.onclick = () => {
        displayModal(personaje);
      };
      divstatusspecie.append(icon, status_specie);
      cardbody.append(
        title,
        divstatusspecie,
        labelLocation,
        location,
        labelEpisode,
        episode
      );
      card.append(img, cardbody);
      contenedorPersonajes.appendChild(card);
    });
  } else {
    let titulo = document.createElement("h2");
    titulo.textContent = "No se han encontrado resultados";
    contenedorPersonajes.appendChild(titulo);
  }

  function displayModal(personaje) {
    console.log(document.querySelector("#exampleModal"));
    let nombre = document.querySelector("#nombre");
    let imagen = document.querySelector("#imagen");
    let estado = document.querySelector("#estado");
    let genero = document.querySelector("#genero");
    let origen = document.querySelector("#origen");
    let specie = document.querySelector("#specie");
    let episode = document.querySelector("#episodios");
    while (episode.firstChild) {
      episode.removeChild(episode.firstChild);
    }
    nombre.classList.add("text-aquafuerte", "fw-bold");
    nombre.textContent = personaje.name;
    imagen.src = personaje.image;
    estado.textContent = personaje.status;
    genero.textContent = personaje.gender;
    origen.textContent = personaje.origin.name;
    specie.textContent = personaje.species;
    if (personaje.status == "Alive") {
      estado.classList.add("text-alive");
    } else if (personaje.status == "Dead") {
      estado.classList.add("text-dead");
    } else {
      estado.classList.add("text-unknown");
    }
    for (let i = 0; i < personaje.episode.length; i++) {
      let divEpisodes = document.createElement("div");
      divEpisodes.classList.add("row", "border-top");
      let divTemp = document.createElement("div");
      divTemp.classList.add("col-5", "my-2");
      let title = document.createElement("h5");
      let creation = document.createElement("p");
      let data = getEpisodios(personaje.episode[i]);
      let divCap = document.createElement("div");
      divCap.classList.add("col-7", "my-2");
      let link = document.createElement("a");
      link.classList.add("text-center");
      data.then((res) => {
        title.textContent = res.episode;
        creation.textContent = res.air_date;
        link.textContent = res.name;
        let regex = /(\d+)/g;
        let regex2 = /^0+|\s+/g;
        let name = res.episode;
        name = name.match(regex);
        if (name[1].match(regex2)) {
          name[1] = name[1].replace("0", "");
        }
        if (name[0].match(regex2)) {
          name[0] = name[0].replace("0", "");
        }
        link.href = `https://repelis24.co/episodio/rick-y-morty-${name[0]}x${name[1]}/`;
      });
      divTemp.append(title, creation);
      //   <div class="col-5 ">
      //   <h4>S01E01</h4>
      //   <p>December 2, 2013</p>
      // </div>

      divCap.append(link);
      // <div class="col-7">
      //   <a id="specie" href="https://repelis24.co/episodio/rick-y-morty-1x1/">Pilot</a>
      // </div>
      divEpisodes.append(divTemp, divCap);
      episode.append(divEpisodes);
    }

    var modal = new bootstrap.Modal(document.querySelector("#exampleModal"));
    modal.show();
  }
}

function limpiar(secccion) {
  while (secccion.firstChild) {
    secccion.removeChild(secccion.firstChild);
  }
}

function createPagination(totalPages, page) {
  while (paginador.firstChild) {
    paginador.removeChild(paginador.firstChild);
  }
  var nextPageList = document.createElement("li");
  var nextPageLink = document.createElement("a");

  let prevPageLink = document.createElement("a");
  let prevPageList = document.createElement("li");

  console.log("Inicio " + page);
  var active;
  var beforePage = page - 1;
  var afterPage = page + 1;
  if (page > 1) {
    //show the next button if the page value is greater than 1

    prevPageList.classList.add("page-item");
    prevPageLink.classList.add("page-link");
    prevPageLink.textContent = "Prev";
    prevPageLink.dataset.pagina = page - 1;
    prevPageList.appendChild(prevPageLink);
    console.log(prevPageList);
    paginador.appendChild(prevPageList);
  }
  prevPageLink.onclick = () => {
    currentpage[0] = currentpage[0] - 1;
    // console.log(currentpage);
    getPersonajes();
  };

  // how many pages or li show before the current li
  if (page == totalPages) {
    beforePage = beforePage - 2;
  } else if (page == totalPages - 1) {
    beforePage = beforePage - 1;
  }
  // how many pages or li show after the current li
  if (page == 1) {
    afterPage = afterPage + 2;
  } else if (page == 2) {
    afterPage = afterPage + 1;
  }
  
  for (let plength = beforePage; plength <= afterPage; plength++) {
    if (plength > totalPages) {
      //if plength is greater than totalPage length then continue
      continue;
    }
    if (plength == 0) {
      //if plength is 0 than add +1 in plength value
      plength = plength + 1;
    }
    if (page == plength) {
      //if page is equal to plength than assign active string in the active variable
      active = "active2";
    } else {
      //else leave empty to the active variable
      active = "";
    }
    // console.log(plength);
    let numList = document.createElement("li");
    let numLink = document.createElement("a");
    numList.classList.add("page-item");
    if (active) {
      numLink.classList.add(active);
    }
    numLink.classList.add("page-link");
    numLink.textContent = plength;
    numLink.dataset.pagina = plength;
    numList.appendChild(numLink);
    // console.log(numList);
    paginador.appendChild(numList);

    numLink.onclick = () => {
      currentpage[0] = plength;
      console.log(currentpage);
      getPersonajes();
    };
  }

  if (page < totalPages) {
    //show the next button if the page value is greater than 1
    nextPageList.classList.add("page-item");
    nextPageLink.classList.add("page-link");
    nextPageLink.textContent = "Next";
    nextPageLink.dataset.pagina = currentpage + 1;
    nextPageList.appendChild(nextPageLink);
    // console.log(nextPageList);
    paginador.appendChild(nextPageList);
  }
  nextPageLink.onclick = () => {
    currentpage[0] = currentpage[0] + 1;
    console.log(currentpage);
    getPersonajes();
  };
}

async function getPersonajes() {
  try {
    console.log("Current dentro de get personajes " + currentpage);
    const url = `https://rickandmortyapi.com/api/character/?page=${currentpage}&name=${nombre}&gender=${genero}&species=${specie}&status=${statu}`;
    const response = await axios.get(url);
    console.log(response.data);
    console.log(response.data.info.next);
    imprimirPersonajes(response.data);
    createPagination(response.data.info.pages, currentpage[0]);
    GetAllPersonajes(url);
  } catch (error) {
    console.log(error);
  }
}

const GetAllPersonajes = async (url) => {
  try {
    console.log("Current dentro de get personajes ");
    // const url = `https://rickandmortyapi.com/api/character/?page=${currentpage}&name=${nombre}`;
    const response = await axios.get(url);
    if (response.data.info.next) {
      GetAllPersonajes(response.data.info.next);
      // console.log(datos)
      // console.log(datos[0])
    } else {
      ImprimirFiltros();
    }
    for (const resultados of response.data.results) {
      statusFilter.push(resultados.status);
      speciesFilter.push(resultados.species);
      genderFilter.push(resultados.gender);
    }
  } catch (error) {
    console.log(error);
  }
};

function ImprimirFiltros() {
  const status = new Set(statusFilter);
  const species = new Set(speciesFilter);
  const gender = new Set(genderFilter);

  while (divspecie.firstChild) {
    divspecie.removeChild(divspecie.firstChild);
  }

  while (divgender.firstChild) {
    divgender.removeChild(divgender.firstChild);
  }

  while (divstatus.firstChild) {
    divstatus.removeChild(divstatus.firstChild);
  }
  // const type = new Set(typeFilter);
  // console.log(status);
  // console.log(species);
  // console.log(gender);
  // console.log(type);
  let statusArray = Array.from(status);
  let speciesArray = Array.from(species);
  let genderArray = Array.from(gender);
  for (let i = 0; i < speciesArray.length; i++) {
    let divform = document.createElement("div");
    divform.classList.add("form-check");
    let inputRadio = document.createElement("input");
    inputRadio.type = "radio";
    inputRadio.classList.add("form-check-input", "x");
    let labelRadio = document.createElement("label");
    labelRadio.classList.add("btn", "radio-button-aqua");

    if (!document.querySelector(`${speciesArray[i]}`)) {
      if (speciesArray[i] == specie) {
        inputRadio.checked = true;
      }
      inputRadio.name = "species";
      inputRadio.id = speciesArray[i];
      inputRadio.value = speciesArray[i];
      labelRadio.htmlFor = speciesArray[i];
      labelRadio.textContent = speciesArray[i];

      divform.append(inputRadio, labelRadio);
      divspecie.appendChild(divform);
    }
  }
  for (let i = 0; i < genderArray.length; i++) {
    let divform = document.createElement("div");
    divform.classList.add("form-check");
    let inputRadio = document.createElement("input");
    inputRadio.type = "radio";
    inputRadio.classList.add("form-check-input", "x");
    let labelRadio = document.createElement("label");
    labelRadio.classList.add("btn", "radio-button-aqua");

    if (!document.querySelector(`${genderArray[i]}`)) {
      if (genderArray[i] == genero) {
        inputRadio.checked = true;
      }
      inputRadio.name = "gender";
      inputRadio.id = genderArray[i];
      inputRadio.value = genderArray[i];
      labelRadio.htmlFor = genderArray[i];
      labelRadio.textContent = genderArray[i];

      divform.append(inputRadio, labelRadio);
      divgender.appendChild(divform);
    }
  }
  for (let i = 0; i < statusArray.length; i++) {
    let divform = document.createElement("div");
    divform.classList.add("form-check");
    let inputRadio = document.createElement("input");
    inputRadio.type = "radio";
    inputRadio.classList.add("form-check-input", "x");
    let labelRadio = document.createElement("label");
    labelRadio.classList.add("btn", "radio-button-aqua");

    if (!document.querySelector(`${statusArray[i]}`)) {
      if (statusArray[i] == statu) {
        inputRadio.checked = true;
      }
      inputRadio.name = "status";
      inputRadio.id = statusArray[i];
      inputRadio.value = statusArray[i];
      labelRadio.htmlFor = statusArray[i];
      labelRadio.textContent = statusArray[i];

      divform.append(inputRadio, labelRadio);
      divstatus.appendChild(divform);
    }
  }
}
