import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";


class Home extends Component {
  render() {
    return (
      <div className="container">
         <div className="row mt-5 mb-5">
          <div className="col-6">
            <img src="axtel.png" alt="axtel logo" className="image-title"></img>
          </div>
          <div className="col-6 d-flex align-items-end flex-column">
            <div className="mt-auto p-2 ">
             
            </div>
          </div>
        </div>

        <div className="alert alert-light justify-content-center d-flex">
        <h3>
          <Link to="/interfaces" className="alert-link">
            Configuración de Interfaces
          </Link>
          </h3>
        </div>

        <div className="alert alert-light  justify-content-center d-flex">
          <h3>
            <Link to="/rutas" className="alert-link">
              Configuración de Rutas
            </Link>
          </h3>
        </div>
      </div>
    );
  }
}

export default Home;
