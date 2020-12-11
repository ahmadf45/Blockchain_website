import React from 'react';
import './App.css';
import AdminDashboard from './AdminDashboard.js';
import AdminDaftar from './AdminDaftar.js'
import AdminUpload from './AdminUpload.js'
import AsesorDashboard from './AsesorDashboard'
import AsesorUpload from './AsesorUpload'
import MitraDashboard from './MitraDashboard'
import MitraUpload from './MitraUpload'
import Verifikasi from './Verifikasi'

import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';



function App() {
  return (
    <Router>
       <div className="App">
        <Switch>
          <Route path="/" exact component={Verifikasi}/>
          <Route path="/admin" exact component={AdminDashboard}/>
          <Route path="/daftardokumen" exact component={AdminDaftar}/>
          <Route path="/uploaddokumen" exact component={AdminUpload}/>
          <Route path="/asesor" exact component={AsesorDashboard}/>
          <Route path="/uploadhasil" exact component={AsesorUpload}/>
          <Route path="/mitra" exact component={MitraDashboard}/>
          <Route path="/uploadmitra" exact component={MitraUpload}/>                             

        </Switch>
      </div>
    </Router>
  );
}

/*const Home = () => (
  <div>
    <section id="main">
      <div className="main-text">
        
      </div>

      
    </section>
  </div>
);*/

export default App;
