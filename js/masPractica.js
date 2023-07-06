/* ACá me voy a copiar el juego que hizo el profe en js*/ 
class Carrito {
    constructor() {
        const carritoStorage = JSON.parse(localStorage.getItem("carrito"));
        if(carritoStorage)
        {
            this.productos = carritoStorage;
        } else {
            this.productos = [];
        }
        this.total = 0
    }
}