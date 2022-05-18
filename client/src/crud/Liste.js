import React, { useEffect, useState } from "react";
import { StyledContainer } from "../pages/Styled";
import Navbaarr from "./Navbaarr";
import { BsFillPencilFill } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { MdRemoveRedEye } from "react-icons/md";
import bootstrap from "bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function Liste() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);
  const [getuserdata, setUserdata] = useState([]);
  const [userDataConst, setUserDataConst] = useState([]);
  const [file, setFile] = useState([]);
  console.log(getuserdata);

  const getdata = async (e) => {
    const res = await fetch("/getdata", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("erreur !");
    } else {
      setUserdata(data);
      setUserDataConst(data);
      console.log("get data");
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const deletesal = async (id) => {
    const res2 = await fetch(`/deletesal/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const deletedata = await res2.json();
    console.log(deletedata);

    if (res2.status === 422 || !deletedata) {
      toast.error("Echec de l'opération !");
    } else {
      toast.success("Suppression effectuée avec succès !");
      getdata();
    }
  };
  // handle upload file
  const handleUpload = (e, id) => {
    e.preventDefault();
    const data = new FormData();
    data.append("pdf", e.target.files[0]);
    data.append("user", id);
    fetch("http://localhost:8080/uploadFiche", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        e.target.files[0] = [];
      });
  };
  const handleFilter = (text) => {
    console.log(text);
    const filter = userDataConst.filter((sal) => {
      if (text === "") {
        return sal;
      } else {
        return sal.nomsal.toLowerCase().includes(text.toLowerCase());
      }
    });
    setUserdata(filter);
  };

  return (
    <>
      <StyledContainer>
        <Navbaarr handleFilter={handleFilter} />
        <div className="mt-5">
          <div className="container">
            <div className="add_btn mt-2" style={{ textAlign: "right" }}>
              <NavLink to="/Ajouter" className="btn btn-danger mb-4">
                Ajouter salarié
              </NavLink>
            </div>

            <table class="table table-striped" style={{ background: "white" }}>
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Nom</th>
                  <th scope="col">Prénom</th>
                  <th scope="col">Téléphone</th>
                  <th scope="col">Poste</th>
                  <th scope="col">Adresse Email</th>
                  <th scope="col">Mot de passe</th>
                  <th scope="col">Fiche de paie</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {getuserdata.map((element, id) => {
                  return (
                    <>
                      <tr>
                        <th scope="row">{id + 1}</th>
                        <td>{element.nomsal}</td>
                        <td>{element.prenomsal}</td>
                        <td>{element.telsal}</td>
                        <td>{element.postsal}</td>
                        <td>{element.emailsal}</td>
                        <td>{element.mdpsal}</td>
                        <td>
                          <input
                            type="file"
                            value={file}
                            onChange={(e) => handleUpload(e, element._id)}
                          />
                        </td>
                        <td className="d-flex justify-content-between">
                          <NavLink to={`/ConsulterSal/${element._id}`}>
                            <button className="btn btn-success">
                              <MdRemoveRedEye style={{ cursor: "pointer" }} />
                            </button>
                          </NavLink>
                          <NavLink to={`/Modifier/${element._id}`}>
                            <button
                              className="btn btn-primary"
                              style={{ cursor: "pointer" }}
                            >
                              <BsFillPencilFill style={{ cursor: "pointer" }} />
                            </button>
                          </NavLink>
                          <button
                            className="btn btn-danger"
                            onClick={() => deletesal(element._id)}
                          >
                            <RiDeleteBin6Line />
                          </button>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </StyledContainer>
    </>
  );
}

export default Liste;
