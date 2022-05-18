

const User = require("../models/user");

exports.userRegisterValidator = (req, res, next) =>{
    //nom non null
    req.check("nom", "Saisie du nom obligatoire !").notEmpty();

    //email non null, valid et normalisé
    req.check("email", "Saisie du mail obligatoire !").notEmpty();

    //check password
    req.check("password", "Saisie du mot de passe obligatoire !").notEmpty();
    req.check("password").isLength({min: 6}).withMessage("Mot de passe doit contenir au moins 6 caractères !");

    req.check(
		"password",
		"Le mot de passe doit contenir un majuscule, un minuscule, un chiffre et un caractère spécial ! "
	).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/, "i");

    //check for errors
    const errors = req.validationErrors();

    //if error, show the first one as it happens
    if(errors){
        const firstError = errors.map((err) => err.msg)[0];

        return res.status(400).json({
            error: firstError,
        });
    }

    //process to next middleware
    next();

};

exports.userById = async(req, res, next) =>{
    User.findById(req._id).exec((err, user) =>{
        if(err || !user) {
            return res.status(404).json({
                error : "Admin n'est pas trouvé !",
            });
        }

        //add user object in req with all user info
        req.user = user;

        next();
    });
};