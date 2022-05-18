const express = require("express");
const { json, urlencoded } = express;
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const multer = require("multer");
const File = require("./models/File");
const path = require("path");
//app
const app = express();

//db
mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.tq39h.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("BD connectée !"))
  .catch((err) => console.log("Erreur de connection de la BD", err));

//middleware
app.use(morgan("dev"));
app.use(cors({ origin: true, credentials: true }));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressValidator());

//routes
const userRoutes = require("./routes/user");
app.use("/", userRoutes);

//port
const port = process.env.PORT || 8080;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });
app.post("/uploadFiche", upload.single("pdf"), async (req, res) => {
  await File.create({
    name: req.file.filename,
    user: req.body.user,
  });
  res.send("ok");
});
// download file from server
app.get("/download/:id", async (req, res) => {
  const fileSelected = await File.findById(req.params.id);
  const file = `./uploads/${fileSelected.name}`;
  res.download(file);
});

//listener
app.use("/pdf", express.static(path.join(__dirname, "uploads")));
const server = app.listen(port, () =>
  console.log(`server running on port ${port}`)
);
// public uploads with path

//salariés
const usersal = require("./models/UserSchema");
const router = require("./routes/router");

app.use(cors());
app.use(express.json());
// configure multer

// create storage

app.use(router);
