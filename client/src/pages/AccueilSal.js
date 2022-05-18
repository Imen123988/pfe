import React from "react";
import { useEffect, useState } from "react";

import Navbaarr from "../crud/Navbaarr";
import { StyledContainer } from "./Styled";
import fileDownload from "js-file-download";
import { useNavigate } from "react-router-dom";
export default function AccueilSal() {
  const [files, setFiles] = useState([]);
  const [dFile, setDFile] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      return navigate("/");
    } else {
      fetch("/files/byIdUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: localStorage.getItem("token"),
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          setFiles(res);
        });
    }
    // fetch post method send token
  }, []);

  const handleDownload = (id, file) => {
    fetch("/download/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.blob();
      })
      .then((res) => {
        fileDownload(res, file);
      });
  };
  return (
    <StyledContainer>
      <Navbaarr />
      <div
        style={{
          padding: 50,
          backgroundColor: "rgba(0,0,0,0.3)",
          height: "100vh",
          boxShadow: "3px 3px 5px black",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 3fr)",
            gridGap: "20px",
            //   grid-template-columns: repeat(2, 1fr);
            //   grid-gap: 1em;
          }}
        >
          {files &&
            files.map((file) => (
              <div
                //   onClick={() => {
                //     window.location.href = "http://localhost:8080/pdf/" + file.name;
                //   }}
                className="nt-3"
                style={{
                  backgroundColor: "#ebebeb",
                  boxShadow: "3px 3px 5px grey",
                  height: 200,
                  width: 200,
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  marginRight: 15,
                }}
              >
                <img
                  src="https://www.biochek.com/wp-content/uploads/2018/07/adobe-pdf-icon-logo-png-transparent.png"
                  width={100}
                  height={100}
                />
                <p style={{ marginTop: 22 }}>{file.name}</p>
                <button
                  className="btn btn-outline-danger "
                  style={{ width: "100%" }}
                  onClick={() => handleDownload(file._id, file.name)}
                >
                  Télécharger
                </button>
              </div>
            ))}
        </div>
      </div>
    </StyledContainer>
  );
}
