import React from 'react';
//import Home from "./pages/Home"
import Inicio from "./pages/Inicio"
import Interfaces from "./pages/Interfaces";
import Rutas from "./pages/Rutas"
import Nateo from "./pages/Nateo"
import Cliente from "./pages/Cliente"
import AltaCliente from "./pages/AltaCliente"
import AltaSitio from "./pages/AltaSitio"
import Configuraciones from "./pages/Configuraciones"

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';



const App=()=> {
return (
  <Router>
    {/* <Header /> */}
    <div className="container">
      <Switch>
        <Route exact path="/" component={Inicio} />
        <Route exact path="/altaCliente" component={AltaCliente} />
        <Route exact path="/altaSitio" component={AltaSitio} />
        <Route path="/cliente" component={Cliente} />
        <Route  path="/interfaces" component={Interfaces} />
        <Route  path="/configuraciones" component={Configuraciones} />
        <Route path="/rutas" component={Rutas} />
        <Route path="/nateo" component={Nateo} />
      </Switch>
    </div>
    
  </Router>
);
}
export default App;
