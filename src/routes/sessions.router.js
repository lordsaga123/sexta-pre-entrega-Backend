const express = require("express");
const router = express.Router();
const UserModel = require("../dao/models/user.model.js");
const { isValidPassword } = require("../utils/hashBcrypt.js");
const passport = require("passport");

//Logout

router.get("/logout", (req, res) => {
    if (req.session.login) {
        req.session.destroy();
    }
    res.redirect("/login");
})

/////////////////////////////////////////////

//VERSION CON PASSPORT: 

router.post("/login", passport.authenticate("login", {failureRedirect: "/api/sessions/faillogin"}), async (req, res) => {
    if(!req.user) return res.status(400).send({status: "error", message: "Credenciales invalidas"});
    if(req.user.email === 'adminCoder@coder.com'){
        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            age: req.user.age,
            role: 'admin'
        };
}else{
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        age: req.user.age,
        role: "Usuario"//req.user.role
    };
}
    req.session.login = true;

    res.redirect("/");
})

router.get("/faillogin", async (req, res ) => {
    console.log("Fallo la estrategia de registro")
    res.send({error: "fallo todo"});
})


///VERSION PARA GITHUB: 

router.get("/github", passport.authenticate("github", {scope: ["user:email"]}), async (req, res) => {})

router.get("/githubcallback", passport.authenticate("github", {failureRedirect: "/login"}), async (req, res) => {
    //La estrategía de github nos retornará el usuario, entonces lo agregamos a nuestro objeto de session. 
    req.session.user = req.user; 
    req.session.login = true; 
    res.redirect("/profile");
})

module.exports = router;