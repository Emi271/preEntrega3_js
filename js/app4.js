class BaseDeDatos {
    constructor() {
      this.personajes = [
        {
          id: "1",
          nombre: 'Jian Haoyi',
          descripcion: `Es el protagonista del anime, él comió un pastel que encontró en la azotea de su colegio, 
          para su desgracia él no sabía que el chocolate del pastel posee una magia cupido en donde las demás personas que
          coman el pastel se verán atraídas por él.`,
          imagen: '../../img/Xian Hao JI.jpg'
        },
        {
          id: "2",
          nombre: 'Xue Li',
          descripcion: `Amiga de la infancia de Hao Yi, está profundamente enamorada de él y no soporta verlo con otras chicas.`,
          imagen: '../../img/Xue Li.webp'
        },
        // ... otros personajes ...
      ];
    }
    
    agregarRegistroDePersonaje(id, nombre, descripcion, imagen) {
      const personaje = new Personaje(id, nombre, descripcion, imagen);
      this.personajes.push(personaje);
    }
    
    traerRegistroDePersonaje() {
      return this.personajes;
    }
    
    registroPorId(id) {
      return this.personajes.find((personaje) => personaje.id === id);
    }
    
    registroPorNombre(palabra) {
      return this.personajes.filter((personaje) => personaje.nombre.toLowerCase().includes(palabra.toLowerCase()));
    }
  }
  
  class Personaje {
    constructor(id, nombre, descripcion, imagen) {
      this.id = id;
      this.nombre = nombre;
      this.descripcion = descripcion;
      this.imagen = imagen;
    }
  }
  
  class MisFavoritos {
    constructor() {
      const favoritosStorage = JSON.parse(localStorage.getItem("misFavoritos"));
      this.favoritos = favoritosStorage || [];
      this.total = 0;
      this.listar();
    }
    
    agregarAFavoritos(personaje) {
      this.favoritos.push(personaje);
      localStorage.setItem("misFavoritos", JSON.stringify(this.favoritos));
      this.listar();
    }
    
    eliminarDeFavoritos(id) {
      const indice = this.favoritos.findIndex((personaje) => personaje.id === id);
      this.favoritos.splice(indice, 1);
      localStorage.setItem("misFavoritos", JSON.stringify(this.favoritos));
      this.listar();
    }
    
    listar() {
      this.total = 0;
      const container = document.querySelector('.row');
      container.innerHTML = '';
    
      const bd = new BaseDeDatos();
      const personajes = bd.traerRegistroDePersonaje();
    
      personajes.forEach((personaje) => {
        const card = `
          <div class="card m-3" style="width: 18rem;">
            <img class="card-img-top" src="${personaje.imagen}">
            <div class="card-body">
              <h5 class="card-title">${personaje.nombre}</h5>
              <p class="card-text">${personaje.descripcion}</p>
              <button class="btn btn-primary m-2 btn-agregar" data-id="${personaje.id}">Agregar a favoritos</button>
              <button class="btn btn-danger m-2 btn-eliminar" data-id="${personaje.id}">Eliminar de favoritos</button>
            </div>
          </div>
        `;
    
        container.innerHTML += card;
      });
    
      const agregarBtns = document.querySelectorAll('.btn-agregar');
      for (const boton1 of agregarBtns) {
        boton1.addEventListener('click', (event) => {
          event.preventDefault();
          const personajeId = boton1.dataset.id;
          const personaje = bd.registroPorId(personajeId);
          this.agregarAFavoritos(personaje);
        });
      }
    
      const eliminarBtns = document.querySelectorAll('.btn-eliminar');
      for (const boton2 of eliminarBtns) {
        boton2.addEventListener('click', (event) => {
          event.preventDefault();
          const personajeId = boton2.dataset.id;
          this.eliminarDeFavoritos(personajeId);
        });
      }
    }
    
    mostrarFavoritos() {
      const container = document.querySelector('.container-fluid');
      container.innerHTML = '';
    
      const bd = new BaseDeDatos();
      const favoritos = this.favoritos;
    
      this.total = 0;
    
      favoritos.forEach((personaje) => {
        const card = `
          <div class="card m-3" style="width: 18rem;">
            <img class="card-img-top" src="${personaje.imagen}">
            <div class="card-body">
              <h5 class="card-title">${personaje.nombre}</h5>
              <p class="card-text">${personaje.descripcion}</p>
              <button class="btn btn-danger m-2 btn-eliminar" data-id="${personaje.id}">Eliminar de favoritos</button>
            </div>
          </div>
        `;
    
        container.innerHTML += card;
      });
    }
  }
  
  const bd = new BaseDeDatos();
  const favoritos = new MisFavoritos();
  favoritos.listar();
  
  const inputBuscar = document.querySelector('.form-control');
  inputBuscar.addEventListener('keyup', (event) => {
    event.preventDefault();
    const palabra = inputBuscar.value;
    const personajes = bd.registroPorNombre(palabra);
    cargarPersonajes(personajes);
  });
  