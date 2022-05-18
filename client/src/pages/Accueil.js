import React, { useContext, useEffect } from "react";
import {
  StyledContainer,
  StyledTitle,
  StyledSubTitle,
  StyledButton,
  ButtonGroup,
} from "./Styled";
import Headerr from "../components/Headerr";
import { Link } from "react-router-dom";
import { TiTick } from "react-icons/ti";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";

function Accueil() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);
  return (
    <StyledContainer>
      <div>
        <Headerr />
        <div
          style={{
            background: "rgba(0,0,0,0.1)",
            borderRadius: "700px",
            marginTop: "-12cm",
          }}
        >
          <ButtonGroup style={{ marginTop: "25cm" }}>
            <Link to="/register">
              <StyledButton>Gérer les administrateurs</StyledButton>
            </Link>
            <Link to="/Liste">
              <StyledButton>Gérer les fiches de paies</StyledButton>
            </Link>
          </ButtonGroup>
        </div>
        <br />
        <br />
        <div
          style={{
            background: "rgba(0,0,0,0.1)",
            borderRadius: "700px",
            marginTop: "-14cm",
          }}
        >
          <StyledTitle size={56}>
            Bienvenue chez <span style={{ color: "#c62616" }}>R</span>&
            <span style={{ color: "#c62616" }}>K</span> Transport
          </StyledTitle>
          <StyledSubTitle size={23} style={{ color: "#eeeee4" }}>
            Gérez les administrateurs et les fiches de paies des salariers !
          </StyledSubTitle>
          <StyledSubTitle size={17} style={{ color: "#fff" }}>
            Cet éspace est réservé pour les administrateurs de la société{" "}
            <span style={{ color: "#c62616" }}>R</span>&
            <span style={{ color: "#c62616" }}>K</span>Transport...
            <br />
            {user && (
              <span
                className="text-light"
                style={{ background: "#c62616", fontSize: "15px" }}
              >
                {user}
              </span>
            )}{" "}
            Vous pouvez :<br />
            <br />
            <span style={{ marginLeft: "-10cm" }}>
              <TiTick style={{ color: "#c62616", fontSize: "32px" }} /> Gérer
              les administrateurs ( Ajouter un autre administrateur ){" "}
            </span>
            <br />
            <span style={{ marginLeft: "4cm" }}>
              <TiTick style={{ color: "#c62616", fontSize: "32px" }} /> Gérer
              les fiches de paix des salariés ( Consulter, Ajouter, Modifier,
              Supprimer un salarier et déposer les fiches de paix des salariers
              ).
            </span>
          </StyledSubTitle>
        </div>
      </div>
    </StyledContainer>
  );
}

export default Accueil;
