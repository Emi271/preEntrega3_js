class BaseDeDatos {
    constructor() {
      this.personajes = [
        {
          id: "1",
          nombre: 'Jian Haoyi',
          descripcion: `Es el protagonista del anime, él comió un pastel que encontró en la azotea de su colegio, 
          para su desgracia el no sabía que el chocolate del pastel posee una magia cupido en dónde las demás personas que
          coman el pastel se varán atraídas por él`,
          imagen: '../../img/Xian Hao JI.jpg'
        },
        {
          id: "2",
          nombre: 'Xue Li',
          descripcion: `Amiga de la infancia de Hao Yi, está profundamente enamorada de él y no soporta verlo con otras chicas.`,
          imagen: '../../img/Xue Li.webp'
        }
      ];
      this.favoritos = [];
    }
  
    agregarFavorito(id) {
      const personaje = this.personajes.find(personaje => personaje.id === id);
      if (personaje && !this.favoritos.includes(personaje)) {
        this.favoritos.push(personaje);
      }
    }
  
    eliminarFavorito(id) {
      const index = this.favoritos.findIndex(personaje => personaje.id === id);
      if (index !== -1) {
        this.favoritos.splice(index, 1);
      }
    }
  
    buscarPersonaje(termino) {
      return this.personajes.filter(personaje =>
        personaje.nombre.toLowerCase().includes(termino.toLowerCase())
      );
    }
  }
  
  // Obtener referencias a los elementos HTML
  const verFavoritosBtn = document.getElementById('ver-favoritos-btn');
  const btnEliminar = document.getElementsByClassName('btn-eliminar');
  const btnAgregar = document.getElementsByClassName('btn-agregar');
  const resultadosContainer = document.getElementById('resultados-container');
  
  // Crear instancia de la base de datos
  const baseDatos = new BaseDeDatos();
  
  // Función para mostrar los resultados en pantalla
  function mostrarResultados(resultados) {
    resultadosContainer.innerHTML = '';
  
    if (resultados.length === 0) {
      resultadosContainer.innerHTML = 'No se encontraron resultados.';
      return;
    }
  
    resultados.forEach(personaje => {
      const card = document.createElement('div');
      card.classList.add('card');
  
      const imagen = document.createElement('img');
      imagen.src = personaje.imagen;
      imagen.alt = personaje.nombre;
  
      const nombre = document.createElement('h3');
      nombre.textContent = personaje.nombre;
  
      const descripcion = document.createElement('p');
      descripcion.textContent = personaje.descripcion;
  
      card.appendChild(imagen);
      card.appendChild(nombre);
      card.appendChild(descripcion);
  
      // Botón de agregar a favoritos
      const btnAgregarFavorito = document.createElement('button');
      btnAgregarFavorito.classList.add('btn-agregar');
      btnAgregarFavorito.textContent = 'Agregar a favoritos';
      btnAgregarFavorito.addEventListener('click', () => {
        baseDatos.agregarFavorito(personaje.id);
      });
  
      // Botón de eliminar de favoritos
      const btnEliminarFavorito = document.createElement('button');
      btnEliminarFavorito.classList.add('btn-eliminar');
      btnEliminarFavorito.textContent = 'Eliminar de favoritos';
      btnEliminarFavorito.addEventListener('click', () => {
        baseDatos.eliminarFavorito(personaje.id);
      });
  
      card.appendChild(btnAgregarFavorito);
      card.appendChild(btnEliminarFavorito);
  
      resultadosContainer.appendChild(card);
    });
  }
  
  // Evento click en el botón "Ver favoritos"
  verFavoritosBtn.addEventListener('click', () => {
    mostrarResultados(baseDatos.favoritos);
  });
  
  // Evento click en los botones de clase "btn-eliminar"
  Array.from(btnEliminar).forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.parentElement.querySelector('h3').textContent;
      baseDatos.eliminarFavorito(id);
    });
  });
  
  // Evento click en los botones de clase "btn-agregar"
  Array.from(btnAgregar).forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.parentElement.querySelector('h3').textContent;
      baseDatos.agregarFavorito(id);
    });
  });
  
  // Función para manejar la búsqueda
  function buscarPersonajes() {
    const inputBusqueda = document.getElementById('busqueda-input');
    const termino = inputBusqueda.value;
    const resultados = baseDatos.buscarPersonaje(termino);
    mostrarResultados(resultados);
  }
  
  // Evento input en el campo de búsqueda
  const busquedaInput = document.getElementsByClassName('form-control');
  busquedaInput.addEventListener('input', buscarPersonajes);
  