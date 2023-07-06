/* Esto va a ser mi favoritos hecho sin prompts, solo con traer los elementos desde el html*/

/* const nombree = document.getElementById("nombre");

function definirNombre() {
    let nombre = prompt("¿Cual es tu nombre?");
    localStorage.setItem('miNombre', nombre)
    nombree.innerHTML = nombre;
}
nombree.innerText = localStorage.getItem("miNombre");
  */
const personaje = {
    nombre: "Lily",
    altura: 1.50,
    ataque: 80,
    defensa: 70,
    tipo: "nocturna",
    vida: 28000,
    nivel: 1,
}

let personajeJSON = JSON.stringify(personaje);
localStorage.setItem("miPersonaje", personajeJSON);
let storageJSON = JSON.parse(localStorage.getItem("miPersonaje"));
console.log(storageJSON); 