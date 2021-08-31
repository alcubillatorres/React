import React from 'react';
import Home from "./pages/Home"
import Interfaces from "./pages/Interfaces";
import Rutas from "./pages/Rutas"
import Nateo from "./pages/Nateo"
import Cliente from "./pages/Cliente"


import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

const App=()=> {
return (
  <Router>
    {/* <Header /> */}
    <div className="container">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/cliente" component={Cliente} />
        <Route  path="/interfaces" component={Interfaces} />
        <Route path="/rutas" component={Rutas} />
        <Route path="/nateo" component={Nateo} />
      </Switch>
    </div>
    
  </Router>
);
}
export default App;
