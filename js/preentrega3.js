/* Acá lo que hacemos es un array de los personajes que contiene la aplicación, con toda su info
como su nombre, una breve descripción, imágenes

Esto es lo que luego procederemos a utilizar  para la funcionalidad de la app*/
class baseDeDatos {
    constructor() {
this.personajes = [
    {
    id: "1",
    nombre: 'Jian Haoyi',
    descripcion: `Es el protagonista del anime, él comió un pastel que encontró en la azotea de su colegio, 
    para su desgracia el no sabía que el chocolate del pastel posee una magia cupido en dónde las demás personas que
    coman el pastel se varán atraídas por él`,
    imagen: '../../img/Xian Hao JI.jpg' },
    {
    id: "2",
    nombre: 'Xue Li',
    descripcion: `Amiga de la infancia de Hao Yi, está profundamente enamorada de él y no soporta verlo con otras chicas.`,
    imagen: '../../img/Xue Li.webp' },
    {
    id: "3",
    nombre: "Hua Yushan",
    descripcion: `Cantante profesional y amiga de la infancia de Lv Zhe`,
    imagen: '../../img/Hua Yushan.webp'  },
    {
    id: "4",
    nombre: 'Lin Yuan',
    descripcion: `Lin Yuan es la tercera chica que se le aparece a Haoyi en Cupid's Chocolates. 
    Después de comer el pastel de chocolate, fantaseó con ser la esposa de Haoyi y la madre de sus dos hijos como familia.`,
    imagen: '../../img/Lin Yuan.webp',},
    {
        id: "5",
        nombre: 'Mei Tata',
        descripcion: `Mei Tata es un cupido en entrenamiento que en su primera misión fue
         enviado a buscar personas con deseos de encontrar el amor y concederles en el proceso en Cupid's Chocolates.`,
        imagen: '../../img/Mei Tata.webp'  },
    {
        id: "6",
        nombre: 'Tang Xuan',
        descripcion: `Tang Xuan es una chica muy atlética y la segunda en acercarse a Jiang 
        Haoyi afirmando ser su novia.  es la primera chica en acercarse a Haoyi después de comer
         un trozo del pastel de chocolate dado por este último. Su fantasía implica que esté 
        embarazada del hijo de Haoyi, lo que causa mucha decepción con su legión de admiradores tanto que comienzan a atacar a Haoyi.`,
        imagen: '../../img/Tang Xuan.webp'  },
    {
        id: "7",
        nombre: 'Xia ZiTong',
        descripcion: ` Es la primera chica en acercarse a Haoyi después de comer un trozo 
        del pastel de chocolate dado por este último. Su fantasía implica que esté 
        embarazada del hijo de Haoyi, lo que causa mucha decepción con su legión de admiradores tanto que comienzan a atacar a Haoyi.`,
        imagen: '../../img/XiaZiTong.jpg'  },
        {
        id: "8",
        nombre: 'Jiang Tianming',
        descripcion: `Padre de Jian Haoyi`,
        imagen: '../../img/Jiang Tianming.webp'
        },
        {
        id: "9",
        nombre: 'Mrs Jiang',
        descripcion: 'Mamá de Jian Haoyi',
        imagen: '../../img/Mrs Jiang.webp'
        },
        {
        id: "10",
        nombre: 'Sol Dongyun',
        descripcion: ``,
        imagen: '../../img/SolDongyun.webp'
        },
        {
        id: "11",
        nombre: 'Xiao Zixin',
        descripcion: ``,
        imagen: '../../img/Xiao Zixin.webp'
        },
        {
        id: "12",
        nombre: 'Ji Ran',
        descripcion: `Profesora particular de Jian Haoyi`,
        imagen: '../../img/Ji Ran.webp'
    }];}
    agregarRegistroDePersonaje(id, nombre, descripcion, imagen) {
        const personaje = new Personaje(id, nombre, descripcion, imagen);
        this.personajes.push(personaje);
    }
    traerRegistroDePersonaje(){
        return this.personajes;
    }
    registroPorId(id){
        return this.personajes.find((personaje) => personaje.id === id);
    }

    registroPorNombre(palabra) {
      return this.personajes.filter((personaje) => personaje.nombre.toLowerCase().includes(palabra));
    }

    funcionBuscador(palabra) {
        return this.personajes.filter((personaje) => personaje.nombre.toLowerCase().includes(palabra));
    }
}

class Personaje {
    constructor(id, nombre, descripcion, imagen) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.imagen = imagen;}}

class misFavoritos {
    constructor() {
        const favoritosStorage = JSON.parse(localStorage.getItem("misFavoritos"));
        this.favoritos = favoritosStorage || [];
        this.total = 0;
        this.listar();
    }
    
    agregarAFavoritos(personaje) {
          this.favoritos.push(personaje);
          localStorage.setItem("favoritos", JSON.stringify(this.favoritos));
          this.listar();
      }
    
      eliminarDeFavoritos(id) {
        const indice = this.favoritos.findIndex((personaje) => personaje.id === id);
        this.favoritos.splice(indice, 1);
        localStorage.setItem("favoritos", JSON.stringify(this.favoritos));
        this.listar();
      }
    
    /*   guardarFavoritos() {
        localStorage.setItem("misFavoritos", JSON.stringify(this.favoritos));
      }
 */
/* Esta es  la función que renderiza los personajes en el navegador*/
      listar() {
        this.total = 0;
        const container = document.querySelector('.row');
        container.innerHTML = '';
        const bd = new baseDeDatos();
        const personajes = bd.traerRegistroDePersonaje();      
        personajes.forEach((personaje) => {
          const card = `
            <div class="card m-3" style="width: 18rem;">
              <img class="card-img-top" src="img/${personaje.imagen}">
              <div class="card-body">
                <h5 class="card-title">${personaje.nombre}</h5>
                <p class="card-text">${personaje.descripcion}</p>
                <button class="btn btn-primary m-2 btn-agregar" data-id="${personaje.id}">Agregar a favoritos</button>
                <button class="btn btn-danger m-2 btn-eliminar" data-id="${personaje.id}">Eliminar de favoritos</button>
              </div>
            </div>
          `;
          container.innerHTML += card;});

        const agregarBtns = document.querySelectorAll('.btn-agregar');
        for (const boton1 of agregarBtns) {
          boton1.onclick = (event) => {
            event.preventDefault();
            this.agregarAFavoritos(Number(boton1.dataset.id));
          }}
        
      }
      /* Esta es la función para renderizar los favoritos agregados*/
      mostrarFavoritos() {
        const mostratFavoritosBtn = document.getElementById('ver-favoritos-btn');
mostratFavoritosBtn.addEventListener('click', mostratFavoritosBtn);

        const container = document.querySelector('.container-fluid');
        container.innerHTML = '';
      
        const bd = new baseDeDatos();
        const favoritos = this.favoritos;
      
        this.total = 0;
      
        favoritos.forEach((personaje) => {
          const card = `
            <div class="card m-3" style="width: 18rem;">
              <img class="card-img-top" src="img/${personaje.imagen}">
              <div class="card-body">
                <h5 class="card-title">${personaje.nombre}</h5>
                <p class="card-text">${personaje.descripcion}</p>
                <button class="btn btn-danger m-2 btn-eliminar" onclick="eliminarDeFavoritos(${personaje.id})">Eliminar de favoritos</button>
              </div>
            </div>
          `;
      
          container.innerHTML += card;
        });
      }
    }   
  
    const bd = new baseDeDatos();

  
      
    const eliminarBtns = document.querySelectorAll('.btn-eliminar');
    
    eliminarBtns.forEach(btn => {
      btn.addEventListener('click', () => favoritos.eliminarDeFavoritos(btn.getAttribute('data-id')));
    });
    
  /* aca vamos  a haceer el buscador*/
  const inputBuscar = document.getElementsByClassName("form-control")
  inputBuscar[0].addEventListener('keyup', (event) => {
    event.preventDefault();
    const palabra = inputBuscar.value;
    const personajes = bd.registroPorNombre(palabra.toLowerCase());
    cargarPersonajes(personajes);
  });

  const favoritos = new misFavoritos();
  favoritos.listar();

    