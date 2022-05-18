import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Accueil from "./pages/Accueil";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Headerr from "./components/Headerr";
import { UserContext } from "./UserContext";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

//functions
import { getUser } from "./api/user";
import Liste from "./crud/Liste";
import Ajouter from "./crud/Ajouter";
import Modifier from "./crud/Modifier";
import ConsulterSal from "./crud/ConsulterSal";
import AccueilSal from "./pages/AccueilSal";
// import Cookies from "js-cookie";
function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // get cookies with the name "jwt"
    // if (!localStorage.getItem("token") && window.location.pathname !== "/") {
    //   console.log("hello");
    //   navigate("/");
    // }
    // getUser()
    //   .then((res) => {
    //     if (res.error) {
    //       navigate("/");
    //     }
    //   })
    //   .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div>
        <UserContext.Provider value={{ user, setUser }}>
          <ToastContainer />
          <Routes>
            {/*<Navigate exact to={user ? '/' : 'login'}/>*/}
            <Route exact path="/" element={<Login />} />
            <Route exact path="/accueil" element={<Accueil />} />
            <Route exact path="/acceuilSal" element={<AccueilSal />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/headerr" element={<Headerr />} />
            <Route exact path="/Liste" element={<Liste />} />
            <Route exact path="/Ajouter" element={<Ajouter />} />
            <Route exact path="/Modifier/:id" element={<Modifier />} />
            <Route exact path="/ConsulterSal/:id" element={<ConsulterSal />} />
          </Routes>
        </UserContext.Provider>
      </div>
    </>
  );
}

export default App;
