/* Acá lo que hacemos es un array de los personajes que contiene la aplicación, con toda su info
como su nombre, una breve descripción, imágenes

Esto es lo que luego procederemos a utilizar  para la funcionalidad de la app*/
class baseDeDatos {
  constructor() {
    this.personajes = [];
  }

 async traerRegistroDePersonaje() {
  const response = await fetch('personajes.json');
  this.personajes = await response.json();
    return this.personajes;
  }
  registroPorId(id) {
    return this.personajes.find((personaje) => personaje.id === id);
  }

  registroPorNombre(palabra) {
    return this.personajes.filter((personaje) =>
      personaje.nombre.toLowerCase().includes(palabra)
    );
  }
}

//Clase para crear personajes
class Personaje {
  constructor(id, nombre, descripcion, imagen) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.imagen = imagen;
  }
}

class misFavoritos {
  constructor() {
    const favoritosStorage = JSON.parse(localStorage.getItem("favoritos"))
    this.favoritos = favoritosStorage||[];
    this.total = 0;
    this.listarFavoritos();
  }

  enFavoritos({ id }) {
    return this.favoritos.find((personaje) => personaje.id === id);
  }

  agregarAFavoritos(personaje) {
    let personajeEnFavoritos = this.enFavoritos(personaje);
    if (personajeEnFavoritos) {
      alert("El personaje ya esta en favoritos");
    } else {
      this.favoritos.push(personaje);
    }
    localStorage.setItem("favoritos", JSON.stringify(this.favoritos) )
    this.listarFavoritos();
  }

  eliminarDeFavoritos(id) {
    const indice = this.favoritos.findIndex((personaje) => personaje.id === id);
    this.favoritos.splice(indice, 1);
    localStorage.setItem("favoritos", JSON.stringify(this.favoritos) )
    this.listarFavoritos();
  }

  /* Esta es la función para renderizar los favoritos agregados*/
  listarFavoritos() {
    this.total = 0;
    const favoritosDiv = document.querySelector("#favoritosDiv");
    favoritosDiv.innerHTML = "";

    for (const personaje of this.favoritos) {
      favoritosDiv.innerHTML += `
        <div class="card m-3" style="width: 18rem;">
          <img class="card-img-top" src="img/${personaje.imagen}">
          <div class="card-body">
            <h5 class="card-title">${personaje.nombre}</h5>
            <p class="card-text">${personaje.descripcion}</p>
            <button class="btn btn-danger m-2 btn-eliminar-favoritos" onclick="eliminarDeFavoritos(${personaje.id})">Eliminar de favoritos</button>
          </div>
        </div>
      `;
      this.total++;
    }
    //Botones Eliminar
    const eliminarBtns = document.querySelectorAll(".btn-eliminar-favoritos");

    for (const boton of eliminarBtns) {
      boton.onclick = (event) => {
        event.preventDefault();
        this.eliminarDeFavoritos(Number(boton.dataset.id));
      };
    }
  }
}

//Inicializamos la bd
const bd = new baseDeDatos();

//Llamada a cargar personajes
bd.traerRegistroDePersonaje().then((personajes) => cargarPersonajes(personajes));


//Imprime la bd de registros en el html
function cargarPersonajes(personajes) {
  const container = document.querySelector("#divPersonajes");
  container.innerHTML = "";
  for (const personaje of personajes) {
    container.innerHTML += `
                <div class="card m-3" style="width: 18rem;">
                  <img class="card-img-top" src="img/${personaje.imagen}">
                  <div class="card-body">
                    <h5 class="card-title">${personaje.nombre}</h5>
                    <p class="card-text">${personaje.descripcion}</p>
                    <button class="btn btn-primary m-2 btn-agregar" data-id="${personaje.id}">Agregar a favoritos</button>
                  </div>
                </div>
              `;
  }
  //Botones añadir
  const agregarBtns = document.querySelectorAll(".btn-agregar");
  for (const boton of agregarBtns) {
    boton.addEventListener("click", (event) => {
      event.preventDefault();
      const id = Number(boton.dataset.id);
      const personaje = bd.registroPorId(id);
      favoritos.agregarAFavoritos(personaje);
    });
  }
}

//Buscador
const inputBuscar = document.querySelector("#search");
inputBuscar.addEventListener("keyup", () => {
  const palabra = inputBuscar.value;
  cargarPersonajes(bd.registroPorNombre(palabra.toLowerCase()));
});


const favoritos = new misFavoritos();
