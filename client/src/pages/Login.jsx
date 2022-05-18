import React, { useContext, useState } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  OutlinedInput,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { StyledContainer, StyledFormArea, StyledTitle } from "./Styled";
import logo from "../pic/logo.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../UserContext";

//functions
import { login } from "../api/user";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  //form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password });
      console.log(res);
      if (res.error) toast.error(res.error);
      else {
        toast.success(res.message);
        setUser(res.nom);
        localStorage.setItem("token", res.token);
        //redirect the user to home
        console.log(res.role);
        if (res.role === "admin") navigate("/accueil");
        else {
          navigate("/acceuilSal");
        }
      }
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <StyledContainer>
      <StyledFormArea style={{ marginLeft: "14cm" }}>
        <div
          className="text-center mb-5 alert"
          style={{ background: "lineargradient(120deg, #eff2f5, #fff" }}
        >
          <img height={55} src={logo} alt="" />
          <StyledTitle
            size={55}
            style={{ color: "#c62616", textShadow: " gray 0.1em 0.1em 0.2em" }}
          >
            <label htmlFor="" className="h3">
              Se connecter
            </label>
          </StyledTitle>
        </div>

        <div style={{ marginTop: "-1.6cm" }} className="form-group">
          <TextField
            color="error"
            size="small"
            variant="outlined"
            className="form-control"
            label="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <br />
        <div className="form-group">
          <FormControl
            color="error"
            variant="outlined"
            size="small"
            className="form-control"
          >
            <InputLabel>Mot de passe</InputLabel>
            <OutlinedInput
              label="Mot de passe"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment>
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>
        <br />
        <div className="text-center mt-4">
          <Button
            onClick={handleLogin}
            style={{
              borderRadius: "25px",
              padding: "10px",
              width: "180px",
              fontSize: "14px",
              textDecoration: "none",
              textAlign: "center",
              transition: "0.4s ease-in-out",
            }}
            variant="contained"
            color="error"
            disabled={!email || !password}
          >
            Envoyer
          </Button>
        </div>
      </StyledFormArea>
    </StyledContainer>
  );
};

export default Login;
