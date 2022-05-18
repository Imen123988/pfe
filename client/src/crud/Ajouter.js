import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { StyledContainer, StyledTitle } from "../pages/Styled";
import Navbaarr from "./Navbaarr";
import { toast } from "react-toastify";

function Ajouter() {
  const navigate = useNavigate("");
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);
  const [inpval, setINP] = useState({
    nomsal: "",
    prenomsal: "",
    telsal: "",
    postsal: "",
    emailsal: "",
    mdpsal: "",
  });

  const setdata = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setINP((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const addinpdata = async (e) => {
    e.preventDefault();

    const { nomsal, prenomsal, telsal, postsal, emailsal, mdpsal } = inpval;

    const res = await fetch("/ajouter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nomsal,
        prenomsal,
        telsal,
        postsal,
        emailsal,
        mdpsal,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      alert(" Echec de l'opération !");
      console.log("erreur !");
    } else {
      alert("Ajout du salarié effectuée avec succès !");
      navigate("/Liste");
    }
  };

  return (
    <StyledContainer>
      <Navbaarr />
      <div className="container" style={{ width: "57%" }}>
        <NavLink to="/Liste">
          <button className="btn btn-danger mt-4 mb-4" style={{ width: "12%" }}>
            Retour
          </button>
        </NavLink>
        <form style={{ background: "#ebebeb" }}>
          <br />
          <StyledTitle
            size={55}
            style={{ color: "#c62616", textShadow: " gray 0.1em 0.1em 0.2em" }}
          >
            <label htmlFor="" className="h3">
              Ajouter un salarié !
            </label>
          </StyledTitle>
          <br />
          <div className="row">
            <div
              className="mb-3 col-lg-6 col-md-6 col-12"
              style={{ width: "40%", marginLeft: "2cm" }}
            >
              <label htmlFor="exampleInputEmail1" className="form-label">
                Nom
              </label>
              <input
                defaultValue={inpval.nomsal}
                required
                onChange={setdata}
                placeholder="Nom du salarié..."
                name="nomsal"
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
              />
            </div>

            <div
              className="mb-3 col-lg-6 col-md-6 col-12"
              style={{ width: "40%" }}
            >
              <label htmlFor="exampleInputEmail1" className="form-label">
                Prénom
              </label>
              <input
                defaultValue={inpval.prenomsal}
                required
                onChange={setdata}
                placeholder="Prénom du salarié..."
                name="prenomsal"
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
              />
            </div>

            <div
              className="mb-3 col-lg-6 col-md-6 col-12"
              style={{ width: "40%", marginLeft: "2cm" }}
            >
              <label htmlFor="exampleInputEmail1" className="form-label">
                Téléphone
              </label>
              <input
                defaultValue={inpval.telsal}
                required
                onChange={setdata}
                placeholder="Numéro de téléphone du salarié..."
                name="telsal"
                type="number"
                className="form-control"
                aria-describedby="emailHelp"
              />
            </div>
            <div
              className="mb-3 col-lg-6 col-md-6 col-12"
              style={{ width: "40%" }}
            >
              <label htmlFor="exampleInputPassword1" className="form-label">
                Post
              </label>
              <input
                defaultValue={inpval.postsal}
                required
                onChange={setdata}
                placeholder="Poste du salarié..."
                type="text"
                name="postsal"
                className="form-control"
              />
            </div>

            <div
              className="mb-3 col-lg-6 col-md-6 col-12"
              style={{ width: "40%", marginLeft: "2cm" }}
            >
              <label htmlFor="exampleInputPassword1" className="form-label">
                Adresse Email
              </label>
              <input
                defaultValue={inpval.emailsal}
                required
                onChange={setdata}
                placeholder="Email du salarié..."
                type="mail"
                name="emailsal"
                className="form-control"
              />
            </div>

            <div
              className="mb-3 col-lg-6 col-md-6 col-12"
              style={{ width: "40%" }}
            >
              <label htmlFor="exampleInputPassword1" className="form-label">
                Mot de passe
              </label>
              <input
                defaultValue={inpval.mdpsal}
                required
                onChange={setdata}
                placeholder="Mot de passe du salarié..."
                name="mdpsal"
                type="password"
                className="form-control"
              />
            </div>
          </div>
          <br />
          <button
            onClick={addinpdata}
            type="submit"
            style={{ marginLeft: "9.7cm", width: "15%" }}
            className="btn btn-outline-danger"
          >
            Ajouter
          </button>
          <br />
          <br />
          <br />
        </form>
      </div>
    </StyledContainer>
  );
}

export default Ajouter;
