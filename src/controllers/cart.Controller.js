const CartServices = require("../services/cartServices.js");
const cartServices = new CartServices();
const ProductServices = require("../services/productServices.js");
const productServices = new ProductServices();

class CartController {
    async crearCarrito(req, res) {
        try {
            const nuevoCarrito = await cartServices.crearCarrito();
            res.json(nuevoCarrito);
        } catch (error) {
            console.error("Error al crear un nuevo carrito", error);
            res.status(500).json({ error: "Error en el servidor" });
        }
    }
    
    async obtenerCarrito(req, res) {
        try {
            const { cartId } = req.params;
            const carrito = await cartServices.getCarritoById(cartId);
            if (!carrito) {
                return res.status(404).json({ error: "Carrito no encontrado" });
            }
            res.json(carrito);
        } catch (error) {
            console.error("Error al obtener el carrito", error);
            res.status(500).json({ error: "Error en el servidor" });
        }
    }

    async agregarProductoAlCarrito(req, res) {
        try {
            const { cid, pid } = req.params; // Obtener los parámetros de la URL
            const { quantity } = req.body; // Obtener el cuerpo de la solicitud
            const carrito = await cartServices.agregarProductoAlCarrito(cid, pid, quantity);
            res.json(carrito);
        } catch (error) {
            console.error("Error al agregar un producto al carrito", error);
            res.status(500).json({ error: "Error en el servidor" });
        }
    }
    /*async agregarProductoAlCarrito(req, res) {
        try {
            const { cartId, productId, quantity } = req.body;
            const carrito = await cartServices.agregarProductoAlCarrito(cartId, productId, quantity);
            res.json(carrito);
        } catch (error) {
            console.error("Error al agregar un producto al carrito", error);
            res.status(500).json({ error: "Error en el servidor" });
        }
    }*/

    async eliminarProductoDelCarrito(req, res) {
        try {
            const { cartId, productId } = req.params;
            const carrito = await cartServices.eliminarProductoDelCarrito(cartId, productId);
            res.json(carrito);
        } catch (error) {
            console.error("Error al eliminar un producto del carrito", error);
            res.status(500).json({ error: "Error en el servidor" });
        }
    }

    async actualizarCarrito(req, res) {
        try {
            const { cid } = req.params; // Obtener los parámetros de la URL
            const updatedProducts = req.body;
            const carrito = await cartServices.actualizarCarrito(cid, updatedProducts);
            res.json(carrito);
        } catch (error) {
            console.error("Error al actualizar el carrito", error);
            res.status(500).json({ error: "Error en el servidor" });
        }
    }
    /*async actualizarCarrito(req, res) {
        try {
            const { cartId } = req.params;
            const updatedProducts = req.body;
            const carrito = await cartServices.actualizarCarrito(cartId, updatedProducts);
            res.json(carrito);
        } catch (error) {
            console.error("Error al actualizar el carrito", error);
            res.status(500).json({ error: "Error en el servidor" });
        }
    }*/

    async actualizarCantidadDeProducto(req, res) {
        try {
            const { cid, pid } = req.params; // Obtener los parámetros de la URL
            const { newQuantity } = req.body; // Obtener el cuerpo de la solicitud
            const carrito = await cartServices.actualizarCantidadDeProducto(cid, pid, newQuantity);
            res.json(carrito);
        } catch (error) {
            console.error("Error al actualizar la cantidad de un producto en el carrito", error);
            res.status(500).json({ error: "Error en el servidor" });
        }
    }

    /*async actualizarCantidadDeProducto(req, res) {
        try {
            const { cartId, productId } = req.params;
            const { newQuantity } = req.body;
            const carrito = await cartServices.actualizarCantidadDeProducto(cartId, productId, newQuantity);
            res.json(carrito);
        } catch (error) {
            console.error("Error al actualizar la cantidad de un producto en el carrito", error);
            res.status(500).json({ error: "Error en el servidor" });
        }
    }*/

    async vaciarCarrito(req, res) {
        try {
            const { cartId } = req.params;
            console.log("ID del carrito recibido:", cartId); // Agrega un mensaje de depuración para mostrar el ID del carrito recibido
            const carrito = await cartServices.vaciarCarrito(cartId);
            console.log("Carrito vaciado exitosamente:", carrito); // Agrega un mensaje de depuración para mostrar el carrito vaciado
            res.json(carrito);
        } catch (error) {
            console.error("Error al vaciar el carrito", error);
            res.status(500).json({ error: "Error en el servidor" });
        }
    }
    
}

/*class CartController{
    async crearCarrito(req, res){
        try {
            const nuevoCarrito = await cartServices.crearCarrito();
            res.json(nuevoCarrito);
        } catch (error) {
            console.error("Error al crear un nuevo carrito", error);
            res.status(500).json({error: "Error en el servidor"});
        }
    }
}*/


module.exports = CartController