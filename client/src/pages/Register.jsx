import React, { useState } from 'react'
import {TextField, InputAdornment, IconButton, OutlinedInput, FormControl, InputLabel, FormHelperText, Button} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {  StyledContainer, StyledFormArea, StyledTitle } from './Styled';
import logo from "../pic/logo.png";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircle from '@mui/icons-material/CheckCircle';
import { useNavigate } from "react-router-dom";
import {toast } from "react-toastify";

//functions
import { register } from '../api/user';
import Headerr from '../components/Headerr';

const Register = () => {

  const navigate = useNavigate();

    //form states
    const [nom, setNom] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");

    //password validation
    let hasSixChar = password.length >= 6;
    let hasLowerChar = /(.*[a-z].*)/.test(password);
    let hasUpperChar = /(.*[A-Z].*)/.test(password);
    let hasNumber = /(.*[0-9].*)/.test(password);
    let hasSpecialChar = /(.*[^a-zA-Z0-9].*)/.test(password);

    const handleRegister = async (e) =>{
      e.preventDefault();

      try{  
        const res = await register({nom, email, password});
        if(res.error) toast.error(res.error);
        else {
          toast.success(res.message);
          
          //redirect the user to login
          navigate('/accueil');

        }
      } catch(err){
        toast.error(err);
      }
    }

    return (
        <StyledContainer>
          <Headerr/>
            <StyledFormArea style={{marginLeft:"16cm", marginTop:".7cm", width:"60vh"}}>

                <div className='text-center mb-5 alert' style={{background:"lineargradient(120deg, #eff2f5, #fff"}}>
                    <img height={55} src={logo} style={{marginTop:"-.5cm"}} alt=""/>
                    <StyledTitle size={55} style={{color:"#c62616", textShadow:" gray 0.1em 0.1em 0.2em"}} ><label htmlFor='' className='h3'>Ajouter un administrateur !</label></StyledTitle>
                </div>
                <div className='form-group'  style={{marginTop:"-1.6cm"}}>
                    <TextField color='error' size='small' variant="outlined" className="form-control" label="Votre nom" value={nom} onChange={(e) =>setNom(e.target.value)} />
                </div><br/>
                <div className='form-group'>
                    <TextField color='error' size='small' variant="outlined" className="form-control" label="Adresse E-mail" value={email} onChange={(e) =>setEmail(e.target.value)} />
                </div><br/>

                <div className='form-group'>
                    <FormControl color='error' variant="outlined" size='small' className='form-control'>
                        <InputLabel>Mot de passe</InputLabel>
                        <OutlinedInput label="Mot de passe" type={showPassword ? "text" : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} endAdornment={
                            <InputAdornment>
                                <IconButton edge="end" onClick={()=> setShowPassword(!showPassword)}>
                                    {showPassword ? <VisibilityIcon/> : <VisibilityOff/>}
                                </IconButton>
                            </InputAdornment>
                        } />
                    </FormControl>
                    { password && (
                      <div className='ml-1' style={{columns:2}}>
                      <FormHelperText>
                        {hasSixChar ? (
                          <span className='text-success'>
                            <CheckCircle
                              className='mr-2'
                              fontSize='25px'
                            />
                            <small>&nbsp;&nbsp;Au moins 6 caractères !</small>
                          </span>
                        ) : (
                          <span className='text-danger'>
                            <CancelIcon
                              className='mr-2'
                              fontSize='25px'
                            />
                            <small>&nbsp;&nbsp;Au moins 6 caractères !</small>
                          </span>
                        )}
                      </FormHelperText>

                      <FormHelperText>
                        {hasLowerChar ? (
                          <span className='text-success'>
                            <CheckCircle
                              className='mr-2'
                              fontSize='25px'
                            />
                            <small>&nbsp;&nbsp;Une lettre minuscule !</small>
                          </span>
                        ) : (
                          <span className='text-danger'>
                            <CancelIcon
                              className='mr-2'
                              fontSize='25px'
                            />
                            <small>&nbsp;&nbsp;Une lettre minuscule !</small>
                          </span>
                        )}
                      </FormHelperText>

                        
                      <FormHelperText>
                        {hasUpperChar ? (
                          <span className='text-success'>
                            <CheckCircle
                              className='mr-2'
                              fontSize='25px'
                            />
                            <small>&nbsp;&nbsp;Une lettre majuscule !</small>
                          </span>
                        ) : (
                          <span className='text-danger'>
                            <CancelIcon
                              className='mr-2'
                              fontSize='25px'
                            />
                            <small>&nbsp;&nbsp;Une lettre majuscule !</small>
                          </span>
                        )}
                      </FormHelperText>

                      <FormHelperText>
                        {hasNumber ? (
                          <span className='text-success'>
                            <CheckCircle
                              className='mr-2'
                              fontSize='25px'
                            />
                            <small>&nbsp;&nbsp;Au moins un chiffre !</small>
                          </span>
                        ) : (
                          <span className='text-danger'>
                            <CancelIcon
                              className='mr-2'
                              fontSize='25px'
                            />
                            <small>&nbsp;&nbsp;Au moins un chiffre !</small>
                          </span>
                        )}
                      </FormHelperText>
                        
                      <FormHelperText>
                        {hasSpecialChar ? (
                          <span className='text-success'>
                            <CheckCircle
                              className='mr-2'
                              fontSize='25px'
                            />
                            <small>&nbsp;&nbsp;Un caractère spécial !</small>
                          </span>
                        ) : (
                          <span className='text-danger'>
                            <CancelIcon
                              className='mr-2'
                              fontSize='25px'
                            />
                            <small>&nbsp;&nbsp;Un caractère spécial !</small>
                          </span>
                        )}
                      </FormHelperText>
                    </div>
                    )}
                </div><br/>
                <div className='form-group'>
                    <TextField color='error' size='small' type="password" variant="outlined" className="form-control" label="Confirmer mot de passe" value={confirmPassword} onChange={(e) =>setConfirmPassword(e.target.value)} />
                    {
                      password && confirmPassword &&(
                      <FormHelperText className='ml-1 mt-1'>
                      {password === confirmPassword ? <span className='text-success'>Mot de passe validé !</span> : <span className='text-danger'>Mot de passe non validé !</span>}
                    </FormHelperText>
                    )}
                </div>
                <div className='text-center mt-4'>
                    <Button onClick={handleRegister} style={{borderRadius:"25px", padding:"10px", width:"180px", fontSize:"14px", textDecoration:"none", textAlign:"center", transition:"0.4s ease-in-out"}} variant="contained" color='error' disabled={!nom || !email || !password || !confirmPassword || password!== confirmPassword || !hasLowerChar || !hasNumber || !hasSixChar || !hasSpecialChar || !hasUpperChar}>Envoyer</Button>
                </div> 
                
            </StyledFormArea>

        </StyledContainer>

    )
}

export default Register