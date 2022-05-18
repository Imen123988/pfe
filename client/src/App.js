import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Login from './pages/Login';
import Register from './pages/Register';
import Accueil from './pages/Accueil';
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Headerr from './components/Headerr';
import {UserContext} from "./UserContext";
import { useEffect, useState } from 'react';
import {toast} from "react-toastify";

//functions
import {getUser} from "./api/user";
import Liste from './crud/Liste';
import Ajouter from './crud/Ajouter';
import Modifier from './crud/Modifier';
import ConsulterSal from './crud/ConsulterSal';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = getUser().then((res) =>{
      if(res.error) toast(res.error);
      else setUser(res.nom);
    })
    .catch((err) => toast(err));

    return () => unsubscribe;
  }, []);


  return (
    <>
    <div>
        <Router>
          <UserContext.Provider value={{user, setUser}}>
              <ToastContainer/>
              <Routes>
                {/*<Navigate exact to={user ? '/' : 'login'}/>*/}
                  <Route exact path="/" element={<Login/>} />
                  <Route exact path="/accueil" element={<Accueil/>} />
                  <Route exact path="/register" element={<Register/>}/>
                  <Route exact path="/headerr" element={<Headerr/>}/>
                  <Route exact path="/Liste" element={<Liste/>} />
                  <Route exact path="/Ajouter" element={<Ajouter/>} />
                  <Route exact path="/Modifier/:id" element={<Modifier/>} />
                  <Route exact path="/ConsulterSal/:id" element={<ConsulterSal/>} />
              </Routes>
          </UserContext.Provider>
        </Router>
      </div>
    </>

  );
}

export default App;
