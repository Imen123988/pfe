import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { StyledContainer } from '../pages/Styled'
import Navbaarr from './Navbaarr'
import {BsFillPencilFill} from "react-icons/bs"
import {RiDeleteBin6Line} from "react-icons/ri"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import { CardContent } from '@mui/material'
import profil from "../pic/profil.png"
import {HiOutlineMail} from "react-icons/hi"
import {MdWorkOutline} from "react-icons/md"
import {BsPhoneVibrate} from "react-icons/bs"
import { toast } from 'react-toastify'


function ConsulterSal() {

    const navigate = useNavigate("");
    const [getuserdata, setUserdata] = useState([]);
    console.log(getuserdata);


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
            setUserdata(data);
            console.log("get data");
        }
    }   

    useEffect(()=>{
        getdata();
    },[])

    const deletesal = async (id) =>{
        const res2 = await fetch(`/deletesal/${id}`, {
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            }
        });

        const deletedata = await res2.json();
        console.log(deletedata);

        if(res2.status === 422 || !deletedata){
            toast.error("erreur !");
        }else{
            toast.success("Suppression effectuée avec succès !");
            navigate("/Liste");
        }
    }

  return (
    <StyledContainer>
        <Navbaarr/>
            <div className='container mt-5' style={{width:"57%", background:"#ebebeb"}}>
                <NavLink to="/Liste"><button className='btn btn-danger mt-4 mb-4' style={{width:"12%"}}>Retour</button></NavLink>
                <div style={{textAlign:"right", marginTop:"-1.3cm"}}>
                    <NavLink to={`/Modifier/${getuserdata._id}`}><button className='btn btn-primary mx-3'><BsFillPencilFill style={{cursor:"pointer"}}/></button></NavLink>
                    <button className='btn btn-danger' onClick={()=>deletesal(getuserdata._id)}><RiDeleteBin6Line style={{cursor:"pointer"}}/></button>
                </div>
                <div className='text-center'>
                    <h1 className='p-0 mb-4' style={{color:"#c62616", textShadow:" gray 0.1em 0.1em 0.2em", fontWeight:"500"}}>Bonjour {getuserdata.nomsal} !</h1><br/>
                </div>
                <Card sx={{width:"80%", marginLeft:"2.3cm"}}>
                    <CardContent>
                    <div className='row'>
                        <div className='left-view col-lg-6 col-md-6 col-12'>
                        <img src={profil} style={{width:70}} alt=''/><br/><hr style={{width:"20%", height:"3px", color:"#C62616"}}/><br/>
                        
                            <div className='col-12' style={{marginLeft:"-1.3cm"}}>
                                <h4 style={{color:"#c62616", fontWeight:"500", fontSize:"25px",marginLeft:"2cm"}}>Nom et prénom : <br/><span style={{color:"black", fontSize:"18px" ,fontWeight:"400"}}>{getuserdata.nomsal}</span></h4>
                            </div>
                        </div><br/><br/>
                        <div className='right-view col-lg-6 col-md-6 col-12' style={{marginLeft:"-2.4cm"}}>
                            <div className='col-mt-4'></div>
                            <div className='col-mt-4'>
                                <h4 style={{color:"#c62616", fontWeight:"500", fontSize:"20px", marginLeft:"2cm"}}><MdWorkOutline style={{color:"gray"}}/>&nbsp;&nbsp;Poste : <br/><span style={{color:"black", fontWeight:"400", fontSize:"16px"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{getuserdata.postsal}</span></h4>
                            </div><br/>
                            <div className='col-mt-4'></div>
                            <div className='col-mt-4'>
                                <h4 style={{color:"#c62616", fontWeight:"500", fontSize:"20px", marginLeft:"2cm"}}><BsPhoneVibrate style={{color:"gray"}}/>&nbsp;&nbsp;Téléphone : <br/><span style={{color:"black", fontWeight:"400", fontSize:"16px"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{getuserdata.telsal}</span></h4>
                            </div><br/>
                            <div className='col-mt-4'></div>
                            <div className='col-mt-4'>
                                <h4 style={{color:"#c62616", fontWeight:"500", fontSize:"20px", marginLeft:"2cm"}}><HiOutlineMail style={{color:"gray"}}/>&nbsp;&nbsp;E-mail : <br/><span style={{color:"black", fontWeight:"400", fontSize:"16px"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{getuserdata.emailsal}</span></h4>
                            </div>
                        </div>
                        </div><br/>

                    </CardContent>
                </Card><br/>
            </div>
    </StyledContainer>
  )
}

export default ConsulterSal