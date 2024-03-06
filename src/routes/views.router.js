const express = require("express");
const router = express.Router();
const ProductManager = require("../dao/db/product-manager-db.js");
const CartManager = require("../dao/db/cart-manager-db.js");
const productManager = new ProductManager();
const cartManager = new CartManager();

router.get("/", async (req, res) => {
   try {
      const productos = await productManager.getProducts();
   
      const nuevoArray = productos.docs.map(producto => {
            const { _id, ...rest } = producto.toObject();
            return rest;
      });

      res.render("index", {
            productos: nuevoArray,
            user: req.session.user
      });
   } catch (error) {
      console.error("Error al obtener productos", error);
         res.status(500).json({
         error: "Error interno del servidor"
      });
   }
})

router.get("/products", async (req, res) => {
   try {
      const { page = 1, limit = 3 } = req.query;
      const productos = await productManager.getProducts({
         page: parseInt(page),
         limit: parseInt(limit)
      });

      const nuevoArray = productos.docs.map(producto => {
         const { _id, ...rest } = producto.toObject();
         return rest;
      });

      res.render("products", {
         productos: nuevoArray,
         hasPrevPage: productos.hasPrevPage,
         hasNextPage: productos.hasNextPage,
         prevPage: productos.prevPage,
         nextPage: productos.nextPage,
         currentPage: productos.page,
         totalPages: productos.totalPages,
         user: req.session.user
      });

   } catch (error) {
      console.error("Error al obtener productos", error);
      res.status(500).json({
         status: 'error',
         error: "Error interno del servidor"
      });
   }
});

router.get("/carts/:cid", async (req, res) => {
   const cartId = req.params.cid;

   try {
      const carrito = await cartManager.getCarritoById(cartId);

      if (!carrito) {
         console.log("No existe ese carrito con el id");
         return res.status(404).json({ error: "Carrito no encontrado" });
      }

      const productosEnCarrito = carrito.products.map(item => ({
         product: item.product.toObject(),
         quantity: item.quantity
      }));


      res.render("carts", { productos: productosEnCarrito });
   } catch (error) {
      console.error("Error al obtener el carrito", error);
      res.status(500).json({ error: "Error interno del servidor" });
   }
});




//      USUARIOS

// Ruta para el formulario de login
router.get("/login", (req, res) => {
   res.render("login");
});

// Ruta para el formulario de registro
router.get("/register", (req, res) => {
   res.render("register");
});

// Ruta para la vista de perfil
router.get("/profile", (req, res) => {
   res.render("profile", { user: req.session.user });
});
module.exports = router; 