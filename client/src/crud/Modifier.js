import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { StyledContainer, StyledTitle } from '../pages/Styled'
import Navbaarr from './Navbaarr'


function Modifier() {

    const [getuserdata, setUserdata] = useState([]);
    console.log(getuserdata);

    const navigate = useNavigate("");

    const [inpval, setINP] = useState({
        nomsal: "",
        prenomsal: "",
        telsal: "",
        postsal: "",
        emailsal: "",
        mdpsal: "",
    })

    const setdata = (e) => {
        const inputvalue = e.target.name

        const {  value } = e.target;
        setINP((preval) => {
            return {
                ...preval,
                [inputvalue]: value
            };
        });
    };



    const {id} = useParams("");
    console.log(id);


    const getdata = async() =>{
        
        const res = await fetch(`/getsal/${id}`, {
            method: "GET",
            headers:{
                "Content-Type":"application/json"
            },
        });

        const data = await res.json();
        console.log(data);

        if(res.status === 422 || !data){
            console.log("erreur !");
        } else{
            setINP(data);
            console.log("get data");
        }
    }   

    useEffect(()=>{
        getdata();
    },[]);

    const updatesal = async (e)=>{
        e.preventDefault();

        const {nomsal, prenomsal, telsal, postsal, emailsal, mdpsal} = inpval;

        const res2 = await fetch(`/updatesal/${id}`, {
            method:"PATCH",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                nomsal, prenomsal, telsal, postsal, emailsal, mdpsal
            })
        });

        const data2 = await res2.json();
        console.log(data2);

        if(res2.status === 422 || !data2){
            toast.error("Veuillez saisir toutes les données !");
        }else{
            navigate("/Liste");
            toast.success("Mise à jour du salarié effectuée avec succès !");
        }
    }

  return (
    <StyledContainer>
        <Navbaarr/>
            <div className='container' style={{width:"57%"}}>
                <NavLink to="/Liste"><button className='btn btn-danger mt-4 mb-3' style={{width:"12%"}}>Retour</button></NavLink>
                <form style={{background:"#ebebeb"}}>
                <br/><StyledTitle size={55} style={{color:"#c62616", textShadow:" gray 0.1em 0.1em 0.2em"}} ><label htmlFor='' className='h3'>Modifier un salarié !</label></StyledTitle><br/>
                    <div className='row'>
                    <div className="mb-3 col-lg-6 col-md-6 col-12" style={{width:'40%', marginLeft:"2cm"}}>
                        <label htmlFor="exampleInputEmail1" className="form-label">Nom</label>
                        <input defaultValue={inpval.nomsal} onChange={setdata} placeholder='Nom du salarié...' name='nomsal' type="text" className="form-control" aria-describedby="emailHelp"/>
                    </div>

                    <div className="mb-3 col-lg-6 col-md-6 col-12" style={{width:'40%'}}>
                        <label htmlFor="exampleInputEmail1" className="form-label">Prénom</label>
                        <input defaultValue={inpval.prenomsal} onChange={setdata} placeholder='Prénom du salarié...' name='prenomsal' type="text" className="form-control" aria-describedby="emailHelp"/>
                    </div>

                    <div className="mb-3 col-lg-6 col-md-6 col-12" style={{width:'40%', marginLeft:"2cm"}}>
                        <label htmlFor="exampleInputEmail1" className="form-label">Téléphone</label>
                        <input defaultValue={inpval.telsal} onChange={setdata} placeholder='Numéro de téléphone du salarié...' name='telsal' type="number" className="form-control" aria-describedby="emailHelp"/>
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12" style={{width:'40%'}}>
                        <label htmlFor="exampleInputPassword1" className="form-label">Post</label>
                        <input defaultValue={inpval.postsal} onChange={setdata} placeholder='Poste du salarié...' type="text" name='postsal' className="form-control"/>
                    </div>

                    <div className="mb-3 col-lg-6 col-md-6 col-12" style={{width:'40%', marginLeft:"2cm"}}>
                        <label htmlFor="exampleInputPassword1" className="form-label">Adresse Email</label>
                        <input defaultValue={inpval.emailsal} onChange={setdata} placeholder='Email du salarié...' type="email" name='emailsal' className="form-control"/>
                    </div>

                    <div className="mb-3 col-lg-6 col-md-6 col-12" style={{width:'40%'}}>
                        <label htmlFor="exampleInputPassword1" className="form-label">Mot de passe</label>
                        <input defaultValue={inpval.mdpsal} onChange={setdata} placeholder='Mot de passe du salarié...' name='mdpsal' type="password" className="form-control"/>
                    </div>
                    </div>
                    <br/><button onClick={updatesal} type="submit" style={{marginLeft:"9.7cm", width:"15%"}} className="btn btn-outline-danger">Modifier</button><br/><br/><br/>
                </form>
            </div>
        </StyledContainer>
  )
}

export default Modifier