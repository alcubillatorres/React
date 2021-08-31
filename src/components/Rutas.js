import React, { Component } from "react";


import "bootstrap/dist/css/bootstrap.min.css";

class Rutas extends Component {
 
  render() {
    return (
      <div className="container">
        <div>
          <img src="axtel.png" alt="axtel logo" className="image-title"></img>
        </div>
        <div className="page-header text-center">
          <h1>
            <small>CONFIGURACIÓN DE RUTAS</small>
          </h1>
        </div>
        <form>
          <h1>Ruta</h1>
        </form>
      </div>
    );
  }
}

export default Rutas;
