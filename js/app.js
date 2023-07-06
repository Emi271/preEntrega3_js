/* Esta es la función por la cual el usuario ingresa el nombre del personaje que desea agregar a favoritos*/

/* Ahora para la 3er preentrega utilizar los métodos de JSON stringfy y demás para agregar los personajes
y luego hacer que se vea digamos en el mismo navegador en la pantalla y bueno.. aparezca por el DOM osea que en el 
inspeccionar se vea ese personaje agregado a favoritos

Para esto quitar todos los prompts y vamos a cambiar la lógica para hacerlo con los métodos de json  y storage
tambien voy a hacer una class y constructor para todo esto

vamos a mostrar la info por el DOM, no se usan alertas ahora ni tampoco los prompts

*/
class misFaoritos {
  constructor() {

const favoritos = [];

function agregarAfavoritos() {
  const nombrePersonaje = prompt("Ingresa el nombre del personaje que deseas agregar a favoritos:");
  if (nombrePersonaje) {
    const nuevoPersonaje = {
      nombre: nombrePersonaje
    };

    let personajeSeleccionado = enFavoritos(nuevoPersonaje);
    if (!personajeSeleccionado) {
      nuevoPersonaje.cantidad = 1;
      favoritos.push(nuevoPersonaje);
      alert("¡Agregaste a " + nuevoPersonaje.nombre + " a tus favoritos!");
    } else {
      alert("¡Ya tienes a " + nuevoPersonaje.nombre + " en tus favoritos!");
    }
  }  else {
    alert("No ingresaste ningún nombre.\n No se agregó ningún personaje a favoritos.");
  }
}
 /* Esta función al tocar el botón de la card elimina el personaje de favoritos*/
function eliminarDeFavoritos(event) {
  const button = event.target;
  const card = button.closest('.card');
  const nombrePersonaje = card.querySelector('.card-title').innerText;

  const index = favoritos.findIndex((favPersonaje) => favPersonaje.nombre === nombrePersonaje);

  if (index !== -1) {
    favoritos.splice(index, 1);
    alert("¡Eliminaste a " + nombrePersonaje + " de tus favoritos!");
  } else {
    alert("¡No encontré a " + nombrePersonaje + " en tus favoritos!");
  }
}

/* Acá ponemos los botones para que hagan las acciones*/ 
const agregarBtns = document.querySelectorAll('.agregar-btn');
agregarBtns.forEach(btn => {
    btn.addEventListener('click', agregarAfavoritos);
  });
  
const eliminarBtns = document.querySelectorAll('.eliminar-btn');

eliminarBtns.forEach(btn => {
  btn.addEventListener('click', eliminarDeFavoritos);
});

const verFavoritosBtn = document.getElementById('ver-favoritos-btn');
verFavoritosBtn.addEventListener('click', verFavoritos);

function enFavoritos(nuevoPersonaje) {
  return favoritos.find((favPersonaje) => favPersonaje.nombre === nuevoPersonaje.nombre);
}
/* Función para ver los personajes agregados a favoritos*/ 
function verFavoritos() {
  if (favoritos.length > 0) {
    let mensaje = "Tus personajes favoritos son:\n";
    favoritos.forEach((nuevoPersonaje) => {
      mensaje += "- " + nuevoPersonaje.nombre + "\n";
    });
    alert("Mis personajes favoritos:\n\n" + mensaje);
  } else {
    alert("No tienes personajes agregados a favoritos.");
  }
}

  }
}


