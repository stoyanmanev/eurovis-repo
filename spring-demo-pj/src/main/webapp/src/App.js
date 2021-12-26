import React , {useState} from "react";
import axios from "axios";
import Login from "./components/Login";
import Home from './components/Home';

function App() {

  const [activeUser, setActiveUser] = useState(false);

  axios.get(window.location.origin + '/activeUser').then(res => {
    res.data ? setActiveUser(true) : setActiveUser(false);
  });


  return (
    <div className="App">
      <div className="container">
        <div className={`row ${activeUser ? '' : 'j-center'}`}>
          <div className={`col ${activeUser ? 'col-12' : 'col-6'}`}>
              {activeUser ? <Home logout={setActiveUser}/> : <Login setUser={setActiveUser}/>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
