import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../UserContext";

//functions
import { logout } from "../api/user";

const Navbaar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    logout()
      .then((res) => {
        toast.success(res.message);
        //set user to null
        setUser(null);

        //redirect the user to login
        navigate("/");
      })
      .catch((err) => toast.error(err));
  };
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{ background: "rgba(0,0,0,0.4)", height: "2cm" }}
      >
        <div className="container-fluid">
          <Link to="" className="navbar-brand">
            R&K Transport
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav" style={{ marginLeft: "8cm" }}>
              {!user ? (
                <>
                  <li className="nav-item">
                    <Link
                      to="/accueil"
                      className="nav-link active"
                      style={{ marginLeft: "0cm" }}
                      aria-current="page"
                    >
                      Accueil&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/register" className="nav-link">
                      G??rer les
                      administrateurs&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/Liste" className="nav-link">
                      G??rer les
                      salari??s&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </Link>
                  </li>
                  <li className="nav-item">
                    <span
                      onClick={handleLogout}
                      className="nav-link"
                      style={{ cursor: "pointer" }}
                    >
                      Se d??connecter
                    </span>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <span
                    onClick={handleLogout}
                    className="nav-link"
                    style={{ cursor: "pointer" }}
                  >
                    Se d??connecter
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbaar;
