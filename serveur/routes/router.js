const express = require("express");
const router = express.Router();
const usersal = require("../models/UserSchema");
const File = require("../models/File");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
//router.get("/", (req,res)=>{
//console.log("connnnnnnnnnnnnnnnnect")
//});

router.post("/ajouter", async (req, res) => {
  // console.log(req.body);
  try {
    const { nomsal, prenomsal, postsal, emailsal, telsal, mdpsal } = req.body;

    if (!nomsal || !prenomsal || !postsal || !emailsal || !telsal || !mdpsal) {
      return res.status(422).json("plz fill the data");
    }
    console.log("emailsal" + emailsal);
    const preuser = await usersal.findOne({ emailsal });

    console.log("fjskdlfjsmfklsjmfj" + preuser);

    if (preuser) {
      res.status(422).json("this is usersal is already present");
    } else {
      const adduser = new usersal({
        nomsal,
        prenomsal,
        telsal,
        postsal,
        emailsal,
        mdpsal,
      });

      await adduser.save();
      res.status(201).json(adduser);
      console.log(adduser);
    }
  } catch (error) {
    console.log(error);
    res.status(422).json(error);
  }
});

//get alllllllllllllllllllllllllll data
router.get("/getdata", async (req, res) => {
  try {
    const userdata = await usersal.find();
    res.status(201).json(userdata);
    console.log(userdata);
  } catch (error) {
    res.status(422).json(error);
  }
});

//get un salarié by id
router.get("/getsal/:id", async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;

    const salindividual = await usersal.findById({ _id: id });
    console.log(salindividual);
    res.status(201).json(salindividual);
  } catch (error) {
    res.status(422).json(error);
  }
});

//update les données d'un salarié
router.patch("/updatesal/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatesal = await usersal.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    console.log(updatesal);
    res.status(201).json(updatesal);
  } catch (error) {
    res.status(422).json(error);
  }
});

//delete salarié by id
router.delete("/deletesal/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletesal = await usersal.findByIdAndDelete({ _id: id });
    console.log(deletesal);
    res.status(201).json(deletesal);
  } catch (error) {
    res.status(422).json(error);
  }
});
router.post("/files/byIdUser", async (req, res) => {
  try {
    const { token } = req.body;
    // verify token
    console.log(token);
    const id = jwt.verify(token, "secretsecretsecret")._id;
    console.log(id);
    const files = await File.find({ user: id });
    res.status(201).json(files);
  } catch (error) {
    console.log(error);
    res.status(422).json(error);
  }
});
module.exports = router;
