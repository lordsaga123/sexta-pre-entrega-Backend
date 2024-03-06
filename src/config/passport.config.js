const passport = require("passport");
const local = require("passport-local");
const UserModel = require("../dao/models/user.model.js");
const { createHash, isValidPassword } = require("../utils/hashBcrypt.js");

//Passport con GitHub:
const GitHubStrategy = require("passport-github2");

const LocalStrategy = local.Strategy;

const initializePassport = () => {

    passport.use("register", new LocalStrategy({
        passReqToCallback: true,
        usernameField: "email"
    }, async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;
        try {
            //Verificación de existencia o no de registro de email
            let user = await UserModel.findOne({ email });
            if (user) return done(null, false);
            //Si no existe, voy a crear un registro de usuario nuevo
            let newUser = {
                first_name,
                last_name,
                email,
                age,
                password: createHash(password)
            }

            let result = await UserModel.create(newUser);
            //Si todo resulta bien, podemos mandar done con el usuario generado. 
            return done(null, result);
        } catch (error) {
            return done(error);
        }
    }))

    //Estrategia para el "login":
    passport.use("login", new LocalStrategy({
        usernameField: "email"
    }, async (email, password, done) => {
        try {
            //Verificar si existe un usuario con el email.
            const user = await UserModel.findOne({ email });
            if (!user) {
                console.log("Este usuario no existe, intente nuevamente.");
                return done(null, false);
            }
            //Si existe el uruario, se verifica la contraseña: 
            if (!isValidPassword(password, user)) return done(null, false);
            return done(null, user);

        } catch (error) {
            return done(error);
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        let user = await UserModel.findById({ _id: id });
        done(null, user);
    })

    //Acá desarrollamos nuestra nueva estrategia con GitHub: 
    passport.use("github", new GitHubStrategy({
        clientID: "Iv1.ac897018476700ab",
        clientSecret: "9e79f10996f38757cd26f76539b4c86c1b0ddada",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback"
    }, async (accessToken, refreshToken, profile, done) => {
        console.log("Profile: ", profile);
        try {
            let user = await UserModel.findOne({ email: profile._json.email })

            //Generador de edad random entre 18 y 60 años
            function getRandomAge() {
                const randomNumber = Math.random();
                const ageRange = 60 - 18 + 1;
                const randomAgeInRange = Math.floor(randomNumber * ageRange);
                const finalAge = 18 + randomAgeInRange;
                return finalAge;
            }            
            const edadAleatoria = getRandomAge();

            if (!user) {
                let newUser = {
                    first_name: profile._json.name,
                    last_name: "",
                    age: edadAleatoria,
                    email: profile._json.email,
                    password: ""
                }
                let result = await UserModel.create(newUser);
                done(null, result)
            } else {
                done(null, user);
            }

        } catch (error) {
            return done(error);
        }

    }))
}


module.exports = initializePassport;