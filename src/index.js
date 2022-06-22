import axios from "axios";

// Sección
let currentpage = [1];
let contenedor = document.querySelector("#contenedor");
let contenedorPersonajes = document.querySelector("#contenedor_personajes");
let buscar = document.querySelector("#search");
let limpiarbuscador = document.querySelector("#limpiar");
let orden = document.querySelector("#orden");
var nombre = "";



const fetchData = async (episode) => {
  return await axios.get(episode).then((res) => res.data);
};

const data = fetchData("https://rickandmortyapi.com/api/episode/1");
console.log(data.then((res) => res));

function getEpisodios(episode) {
  axios
    .get(episode)
    .then((res) => {
      console.log(res.data.name);
      return res.data.name;
    })
    .catch((err) => console.log(err));
}

getPersonajes();

async function buscarPersonaje(e) {
  nombre = e.target.value;
  currentpage[0]=1;
  if (e.key === "Enter") {
    getPersonajes();
  }
}

eventListener();

function eventListener() {
  buscar.addEventListener("keypress", buscarPersonaje);
  // limpiarbuscador.addEventListener("click", limpiarseach);
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
        icon.classList.add("alive");
      } else if (personaje.status == "Dead") {
        icon.classList.add("dead");
      } else {
        icon.classList.add("unknown");
      }
      // console.log(personaje.episode[0]);

      let data = fetchData(personaje.episode[0]);
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
    let genero = document.querySelector("#genero");
    let origen = document.querySelector("#origen");
    let specie = document.querySelector("#specie");
    let episode = document.querySelector("#episodios");
    while (episode.firstChild) {
      episode.removeChild(episode.firstChild);
    }
    nombre.classList.add("text-aquafuerte");
    nombre.textContent = personaje.name;
    imagen.src = personaje.image;
    genero.textContent = personaje.gender;
    origen.textContent = personaje.origin.name;
    specie.textContent = personaje.species;

    for (let i = 0; i < personaje.episode.length; i++) {
      let divEpisodes = document.createElement("div");
      divEpisodes.classList.add("row", "border-top");
      let divTemp = document.createElement("div");
      divTemp.classList.add("col-5", "my-2");
      let title = document.createElement("h5");
      let creation = document.createElement("p");
      let data = fetchData(personaje.episode[i]);
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
        console.log(name);
        name = name.match(regex);
        console.log(name[1].match(regex2));
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

// selecting required element
const paginador = document.querySelector(".pagination");

function createPagination(totalPages, page) {
  while (paginador.firstChild) {
    paginador.removeChild(paginador.firstChild);
  }
  var nextPageList = document.createElement("li");
  var nextPageLink = document.createElement("a");

  let prevPageLink = document.createElement("a");
  let prevPageList = document.createElement("li");

  let numberList = document.createElement("li");
  let numberLink = document.createElement("a");
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
  // if (currentpage > 2) {
  //   //if page value is less than 2 then add 1 after the previous button
  //   numberList.classList.add("page-item");
  //   numberLink.classList.add("page-link");
  //   numberLink.textContent = 1;
  //   numberLink.dataset.pagina = 1;
  //   numberList.appendChild(numberLink);
  //   console.log(numberList);
  //   paginador.appendChild(numberList);
  // }

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
  console.log("beforePage " + beforePage);
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
    console.log("Current dentro de get personajes "+currentpage)
    const url = `https://rickandmortyapi.com/api/character/?page=${currentpage}&name=${nombre}`;
    const response = await axios.get(url);
    console.log(response.data);
    console.log(response.data.info.next);
    imprimirPersonajes(response.data);
    createPagination(response.data.info.pages, currentpage[0]);
  } catch (error) {
    console.log(error);
  }
}