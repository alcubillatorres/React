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
      AliasWan: "",
      AliasLan: "",
      Servicio: "",
      TipoIP: "",
      RutaDefault: false,
      Gateway: "",
      RedRutaEstatica: "",
      MascaraRutaEstatica: "",
      GatewayRutaEstatica: "",
      Prioridad: "",
      Rutas: "",
      id: "612d88527e68291480780dd9",
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
    const gateway = value.split(",")[1];

    this.setState({
      TipoIP: tipoIP,
      Servicio: servicio,
      AliasWan: "",
      AliasLan: "",
      [name]: alias,
      Alias: alias,
      Gateway: gateway,
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

  handleSubmit = (event) => {
    
    const hope = 
      this.state.AliasLan !== ""
        ? this.state.GatewayRutaEstatica
        : this.state.Gateway

    const red = 
      this.state.RutaDefault === false
        ? this.state.RedRutaEstatica.trim()
        : "0.0.0.0"
    
    const mascara = 
      this.state.RutaDefault === false
        ? this.state.MascaraRutaEstatica.trim()
        : "0.0.0.0"

    const data = {
      Alias: this.state.Alias,
      Default: this.state.RutaDefault,
      Red: red,
      Mascara: mascara,
      Gateway: hope,
      Prioridad: this.state.Prioridad.trim(),
    };

   // console.log(data);

    const url = "http://localhost:4000/rutas";

    if (this.state.AliasWan !== "" || this.state.AliasLan !== "") {
      axios({
        method: "post",
        url: url,
        data,
      }).then(
        (response) => {
          this.setState({
            Servicio: "",
            TipoIP: "",
            RutaDefault: false,
            Gateway: "",
            RedRutaEstatica: "",
            MascaraRutaEstatica: "",
            GatewayRutaEstatica: "",
            Prioridad: "",
            Alias:"",
            AliasLan: "",
            AliasWan: "",
          });
          alert("Registro Exitoso");
        },
        (error) => {
          alert("Ha ocurrido un error");
          console.log(error);
        }
      );
    } else {
      alert("Selecciona la interface");
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
                  name="AliasWan"
                  value={this.state.AliasWan}
                  onChange={this.handleChange}
                >
                  <option value=""></option>
                  {this.state.InterfacesWan.map((wan, key) => (
                    <option
                      key={key}
                      value={
                        wan.Alias +
                        "." +
                        wan.TipoIP +
                        "." +
                        wan.TipoServicio +
                        "," +
                        wan.Gateway
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
                  name="AliasLan"
                  value={this.state.AliasLan}
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
          {this.state.AliasLan !== "" && (
            <div className="mb-2 mt-3 d-flex align-items-center">
              <label>INTERFACE: </label>
              <input
                className="form-control ml-2 green-input"
                type="text"
                value={this.state.AliasLan}
                readOnly
              />
            </div>
          )}

          {this.state.AliasWan !== "" && (
            <span>
              <div className="mb-2 mt-3 d-flex align-items-center">
                <label>INTERFACE: </label>
                <input
                  className="form-control ml-2 green-input"
                  type="text"
                  value={this.state.AliasWan}
                  readOnly
                />
              </div>
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
                    <div className="mb-2 d-flex align-items-center">
                      <label className="label-light">&ensp;&ensp;Gateway</label>
                      <input
                        className="form-control ml-2"
                        type="text"
                        name="Gateway"
                        value={this.state.Gateway}
                        readOnly
                      />
                    </div>
                    <div className="mb-2 d-flex align-items-center">
                      <label className="label-light">
                        &ensp;&ensp;Prioridad
                      </label>
                      <input
                        className="form-control ml-2"
                        type="text"
                        name="Prioridad"
                        value={this.state.Prioridad}
                        onChange={this.handleOnChange}
                      />
                    </div>
                  </span>
                )}
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
                            value={this.state.Gateway}
                            readOnly
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
                      </div>
                    </div>
                    <hr></hr>
                  </span>
                )}
              </div>
            </span>
          )}

          {this.state.AliasLan !== "" && (
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
                </div>
              </div>
              <hr></hr>
            </span>
          )}

          <div className="col text-center">
            <button type="submit" className="m-1 p-1 btn btn-outline-primary">
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
