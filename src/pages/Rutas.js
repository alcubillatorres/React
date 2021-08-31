import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

class Rutas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      InterfacesWan: "",
      InterfacesLan: "",
      Alias: "",
      Servicio: "",
      TipoIP: "",
      RutaDefault: true,
      Gateway: "",
      RedRutaEstatica: "",
      MascaraRutaEstatica: "",
      GatewayRutaEstatica: "",
      // RutasEstaticas: [],
      Prioridad: "",
      Rutas: "",
      id: "60e6840d443b8d13bcfc8d56", //id cliente
      //id: "6127af643ed47f22941ccfcd",
    };
  }

  componentDidMount() {
    const url = "http://localhost:4000";
    const params = { id: this.state.id };

    axios({
      method: "get",
      url,
      params,
    }).then(
      (response) => {
        this.setState({
          InterfacesWan: response.data.Wan,
          InterfacesLan: response.data.Lan,
          Rutas: response.data.Rutas,
        });
      },
      (error) => {
        alert("Ha ocurrido un error");
        console.log(error);
      }
    );

    
  }

  handleChange = (e) => {
    const { value, name } = e.target;
    const alias = value.split(".")[0];
    const tipoIP = value.split(".")[1];
    const servicio = value.split(".")[2];

    this.setState({
      TipoIP: tipoIP,
      Servicio: servicio,
      [name]: alias,
    });
  };

  handleOnChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleRutaDefault = () => {
    this.setState({
      RutaDefault: !this.state.RutaDefault,
    });
  };

 /*  handleAddRow = (e) => {
    e.preventDefault();
    if(this.state.RedRutaEstatica !== "" && this.state.MascaraRutaEstatica !== ""){
      this.setState((prevState, props) => {
        const row = {
          red: this.state.RedRutaEstatica.trim(),
          mascara: this.state.MascaraRutaEstatica.trim(),
          gateway: this.state.GatewayRutaEstatica.trim(),
          prioridad: this.state.Prioridad.trim(),
        };
        return {
          RutasEstaticas: [...prevState.RutasEstaticas, row],
          RedRutaEstatica: "",
          MascaraRutaEstatica: "",
          Prioridad: "",
        };
      });
    }
  
  }; */

  handleSubmit = (event) => {
   
    const hope = this.state.RutaDefault === true ? this.state.Gateway : this.state.GatewayRutaEstatica

    
   
    const data = {
      Alias: this.state.Alias,
      Default: this.state.RutaDefault,
      Red: this.state.RedRutaEstatica.trim(),
      Mascara: this.state.MascaraRutaEstatica.trim(),
      Gateway: hope.trim(),
      Prioridad: this.state.Prioridad.trim(),
    };
 
    console.log(data)
    
    const url = "http://localhost:4000/rutas";

    if (this.state.Alias !== ""){
   /*  if(this.state.RutaDefault === true || this.state.RutasEstaticas.length !== 0 ){*/
    axios({
      method: "post",
      url: url,
      data,
    }).then(
      (response) => {
        this.setState({
          Servicio: "",
          TipoIP: "",
          RutaDefault: true,
          Gateway: "",
          RedRutaEstatica: "",
          MascaraRutaEstatica: "",
          GatewayRutaEstatica: "",
         /*  RutasEstaticas: [], */
          Prioridad:"",
        });
        alert("Registro Exitoso")
      },
      (error) => {
        alert("Ha ocurrido un error");
        console.log(error);
      }
    ); 
    /*   }else{
        alert("Registra las Rutas Específicas")
      } */
    }else{
      alert("Selecciona la interface")
    }


  };

  render() {
    return (
      <div className="container">
        <div className="row mt-5">
          <div className="col-6">
            <img src="axtel.png" alt="axtel logo" className="image-title"></img>
          </div>
          <div className="col-6 d-flex align-items-end flex-column">
            <div className="mt-auto p-2 alert alert-light">
              <Link to="/" className="alert-link">
                Inicio
              </Link>
            </div>
          </div>
        </div>

        <div className="page-header text-center mt-5">
          <h1>
            <small>CONFIGURACIÓN DE RUTEO</small>
          </h1>
        </div>
        <form onSubmit={this.handleSubmit}>
          <hr></hr>

          <h5>Selecciona la interface a configurar</h5>
          <div className="mb-2">
            <label className="mr-2">WAN</label>

            {this.state.InterfacesWan.length !== 0 && (
              <span>
                <select
                  name="Alias"
                  value={this.state.Alias}
                  onChange={this.handleChange}
                >
                  <option value=""></option>
                  {this.state.InterfacesWan.map((wan, key) => (
                    <option
                      key={key}
                      value={
                        wan.Alias + "." + wan.TipoIP + "." + wan.TipoServicio
                      }
                    >
                      {wan.Alias}
                    </option>
                  ))}
                </select>
              </span>
            )}
          </div>
          <div className="mb-2">
            <label className="mr-2">LAN</label>

            {this.state.InterfacesLan.length !== 0 && (
              <span>
                <select
                  name="Alias"
                  value={this.state.Alias}
                  onChange={this.handleChange}
                >
                  <option value=""></option>
                  {this.state.InterfacesLan.map((lan, key) => (
                    <option key={key} value={lan.LanAlias + "." + lan.LanDHCP}>
                      {lan.LanAlias}
                    </option>
                  ))}
                </select>
              </span>
            )}
          </div>

          <hr></hr>
          {this.state.Alias ==="" && (
          <div className="mb-2 mt-3 d-flex align-items-center">
            <label>INTERFACE: </label>
            <input
              className="form-control ml-2"
              type="text"
              value={this.state.Alias}
              readOnly
            />
          </div>
          )}

          {this.state.Alias !=="" && (
            <div className="mb-2 mt-3 d-flex align-items-center">
            <label>INTERFACE: </label>
            <input
              className="form-control ml-2 green-input"
              type="text"
              value={this.state.Alias}
              readOnly
            />
          </div>
          )}

          {/* Cuando selecciona Lan o Wan le da a escoger si genera la Ruta estática por default */}

          {this.state.Alias !== "" && (
            <span>
              &emsp;
              <input
                name="RutaDefault"
                type="checkbox"
                onChange={this.handleRutaDefault}
                checked={this.state.RutaDefault}
              />
              {this.state.RutaDefault === true && (
                <label>&ensp;Generar Ruta Estática Default</label>
              )}
              {this.state.RutaDefault === false && (
                <span>
                  <label className="label-light">
                    &ensp;Generar Ruta Estática Default
                  </label>
                </span>
              )}
              <div className="mb-2 d-flex align-items-center">
                {this.state.RutaDefault === true && (
                  <span>
                    <span>
                      <div className="mb-2 d-flex align-items-center">
                        <label className="label-light">
                          &ensp;&ensp;Gateway
                        </label>
                        <input
                          className="form-control ml-2"
                          type="text"
                          name="Gateway"
                          value={this.state.Gateway}
                          onChange={this.handleOnChange}
                          
                        />
                      </div>
                      <div className="mb-2 d-flex align-items-center">
                        <label className="label-light">&ensp;&ensp;Prioridad</label>
                        <input
                          className="form-control ml-2"
                          type="text"
                          name="Prioridad"
                          value={this.state.Prioridad}
                          onChange={this.handleOnChange}
                        />
                      </div>
                    </span>
                  </span>
                )}
              </div>
              {this.state.RutaDefault === false && (
                <span>
                  <div>
                    <div className="col-12">
                      <label className="mt-2 mb-2">
                        Agregar Rutas Estáticas Específicas
                      </label>
                      <div className="mb-2 d-flex align-items-center">
                        <label className="label-light">Red</label>
                        <input
                          className="form-control ml-2"
                          type="text"
                          name="RedRutaEstatica"
                          value={this.state.RedRutaEstatica}
                          onChange={this.handleOnChange}
                        />
                      </div>

                      <div className="mb-2 d-flex align-items-center">
                        <label className="label-light">Máscara de Red</label>
                        <input
                          className="form-control ml-2"
                          type="text"
                          name="MascaraRutaEstatica"
                          value={this.state.MascaraRutaEstatica}
                          onChange={this.handleOnChange}
                        />
                      </div>
                      <div className="mb-2 d-flex align-items-center">
                        <label className="label-light">Gateway</label>
                        <input
                          className="form-control ml-2"
                          type="text"
                          name="GatewayRutaEstatica"
                          value={this.state.GatewayRutaEstatica}
                          onChange={this.handleOnChange}
                        />
                      </div>
                      <div className="mb-2 d-flex align-items-center">
                        <label className="label-light">Prioridad</label>
                        <input
                          className="form-control ml-2"
                          type="text"
                          name="Prioridad"
                          value={this.state.Prioridad}
                          onChange={this.handleOnChange}
                        />
                      </div>
                      <div className="row justify-content-center mt-3 mb-2">
                        <div className="col">
                         {/*  <button
                            className="m-1 p-1 btn btn-outline-primary"
                            onClick={this.handleAddRow}
                          >
                            Agregar Ruta
                          </button> */}
                        </div>
                      </div>
                    </div>
                  {/*   <div className="col-8 size-small">
                      {this.state.RutasEstaticas.length !== 0 && (
                        <span>
                          <div className="size-bold">
                            Redes Estáticas Registradas
                          </div>
                          {this.state.RutasEstaticas.map((ruta, i) => {
                            return (
                              <div key={i}>
                                Red = {ruta.red} Máscara = {ruta.mascara}
                                {this.state.TipoIP !== "DHCP" && (
                                  <span> Gateway = {ruta.gateway}</span>
                                )} Prioridad = {ruta.prioridad}
                              </div>
                            );
                          })}
                        </span>
                      )}
                    </div> */}
                  </div>
                  <hr></hr>
                </span>
              )}
            </span>
          )}

          {/* Cuando selecciona Lan o Wan le da a escoger si genera la Ruta estática por default */}
          <div className="col text-center">
            <button 
            type="submit" 
            className="m-1 p-1 btn btn-outline-primary"
            >
              Guardar Configuración
            </button>
          </div>
 {/*MOSTRAR INTERFACES RUTAS  REGISTRADAS///////////////////////////////////*/}
 {this.state.Rutas.length !== 0 && (
            <div>
              <hr></hr>
              <label>RUTAS REGISTRADAS</label>
              <p></p>
              <table border="1">
                <thead>
                  <tr>
                    <th>Alias</th>
                    <th>Red</th>
                    <th>Mascara</th>
                    <th>Gateway</th>
                    <th>Prioridad</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.Rutas.map(function (ruta, key) {
                    return (
                      <tr key={key}>
                        <td>{ruta.Alias}</td>
                        <td>{ruta.Red}</td>
                        <td>{ruta.Mascara}</td>
                        <td>{ruta.Gateway}</td>
                        <td>{ruta.Prioridad}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <br></br>
              <br></br>
            </div>
            
          )}
          {/*FIN MOSTRAR RUTAS REGISTRADAS////////////////////////////////////*/}
        </form>
      </div>
    );
  }
}

export default Rutas;
