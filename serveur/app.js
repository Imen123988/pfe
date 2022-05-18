const express = require("express");
const {json, urlencoded} = express; 
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");

//app
const app = express();

//db
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser : true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("BD connectée !"))
    .catch((err) => console.log("Erreur de connection de la BD", err));

//middleware
app.use(morgan("dev"));
app.use(cors({ origin : true, credentials : true}));
app.use(json());
app.use(urlencoded({extended : false}));
app.use(cookieParser());
app.use(expressValidator());

//routes 
const userRoutes = require("./routes/user");
app.use("/", userRoutes);

//port
const port = process.env.PORT || 8080;

//listener
const server = app.listen(port, () => 
    console.log(`server running on port ${port}`)
);

//salariés
const usersal = require("./models/UserSchema");
const router = require("./routes/router");

app.use(cors());
app.use(express.json());

app.use(router);