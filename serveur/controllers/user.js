const User = require("../models/user");
const Usersal = require("../models/UserSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
    //check if user already exists
    const nomExists = await User.findOne({
        nom: req.body.nom,
    });
    const emailExists = await User.findOne({
        email: req.body.email,
    }); 

    if (nomExists){
        return res.status(403).json({
            error: 'Ce nom existe déjà !'
        });
    }
    if (emailExists){
        return res.status(403).json({
            error: 'Cette adresse email existe déjà !'
        });
    }

    //if new user, create a new user
    const user = new User(req.body);
    await user.save(); 

    res.status(201).json({
        message : "Administrateur ajouté avec succès! Veuillez vous reconnecter !"
    })
};

exports.login = async(req, res) =>{
    //find the user based on email
    const {email, password} = req.body;

    await User.findOne({email}).exec((err, user) => {
        //if error or l'user n'existe pas
        if(err || !user) {
            return res.status(401).json({
                error: "Vous n'avez pas de compte !",
            });
        }

        //if user is found, we use the authentification method from the model
        if(!user.authentificate(password)){
            return res.status(401).json({
                error:"Email ou mot de passe invalide !",
            });
        }

        //generate a token with user id and jwt secret
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {
            expiresIn: "24h",
        });

        //persist the token as 'jwt' in cookie with an expiry date
        res.cookie("jwt", token, {expire: new Date() + 9999, httpOnly: true});

        //return the response with user
        const {nom} = user;
        return res.json({
            message : "Connexion établie avec succès !",
            nom,
        })

    });
};

exports.logout = (req, res) =>{
    //clear the cookie 
    res.clearCookie("jwt");

    return res.json({
        message :"Déconnection établie avec succès !",
    });
};

exports.getLoggedInUser = (req, res) =>{
    const {nom} = req.user;

    return res.status(200).json({
        message : "L'admin est toujours connecté !",
        nom,
    })
}





