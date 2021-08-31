import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

class Interfaces extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TipoInterface: "",
      Alias: "",
      Servicio: "INTERNET",
      TipoIP: "MANUAL",
      DireccionIP: "",
      Mascara: "",
      Gateway: "",
      Vlan: "",
      //id: "6127af643ed47f22941ccfcd", //id cliente
      id: "60e6840d443b8d13bcfc8d56",
      WanSaved: "",
      LanSaved: "",
      LanAlias: "",
      LanDireccionIP: "",
      LanMascara: "",
      LanVlan: "",
      DHCP: "SI",
      DHCPFrom: "",
      DHCPTo: "",
      LanServidorDNS1: "",
      LanServidorDNS2: "",
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
          WanSaved: response.data.Wan,
          LanSaved: response.data.Lan,
        });
      },
      (error) => {
        alert("Ha ocurrido un error");
        console.log(error);
      }
    );
  }

  handleOnChange = (e) =>{
    const {name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (event) => {
    const data = {
      
      TipoInterface: this.state.TipoInterface,
      Alias: this.state.Alias.trim(),
      TipoServicio: this.state.Servicio,
      TipoIP: this.state.TipoIP,
      DireccionIP: this.state.DireccionIP.trim(),
      Mascara: this.state.Mascara.trim(),
      Gateway: this.state.Gateway.trim(),
      Vlan: this.state.Vlan.trim(),
      LanAlias: this.state.LanAlias.trim(),
      LanDireccionIP: this.state.LanDireccionIP.trim(),
      LanMascara: this.state.LanMascara.trim(),
      LanVlan: this.state.LanVlan.trim(),
      LanDHCP: this.state.DHCP,
      DHCPFrom: this.state.DHCPFrom.trim(),
      DHCPTo: this.state.DHCPTo.trim(),
      LanServidorDNS1: this.state.LanServidorDNS1.trim(),
      LanServidorDNS2: this.state.LanServidorDNS2.trim(),
    };

    const url = "http://localhost:4000";
    axios({
      method: "post",
      url: url,
      data,
    }).then(
      (response) => {
        this.setState({
          TipoInterface: "",
          Alias: "",
          Servicio: "",
          TipoIP: "MANUAL",
          DireccionIP: "",
          Mascara: "",
          Gateway: "",
          Vlan: "",
          LanAlias: "",
          LanMascara: "",
          LanDireccionIP: "",
          LanVlan: "",
          LanDHCP: "SI",
          DHCPFrom: "",
          DHCPTo: "",
          LanServidorDNS1: "",
          LanServidorDNS2: "",
        });
      },
      (error) => {
        alert("Ha ocurrido un error");
        console.log(error);
      }
    );
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
            <small>CONFIGURACIÓN DE INTERFACES</small>
          </h1>
        </div>
        <form onSubmit={this.handleSubmit}>
          {/* SELECCION MENU WAN /LAN*/}
          <hr></hr>
          <label>Agregar Interface (WAN/LAN)</label>
          <select
            name="TipoInterface"
            className="form-select form-select-lg mb-3 ml-2"
            value={this.state.TipoInterface}
            onChange={this.handleOnChange}
          >
            <option value="">Selecciona</option>
            <option value="WAN">WAN</option>
            <option value="LAN">LAN</option>
          </select>

          {/*FIN SELECCION MENU WAN /LAN*/}

          {/* Configuración WAN ///////////////////////////////////////////////////////*/}
          <span>
            {this.state.TipoInterface === "WAN" && (
              <div className="align-items-center">
                <div className="mb-2 d-flex align-items-center">
                  <label>Nombre WAN (Alias)</label>
                  <input
                    className="form-control ml-2"
                    name="Alias"
                    type="text"
                    value={this.state.Alias}
                    onChange={this.handleOnChange}
                    required
                  />
                  <span className="tc-img">
                    &ensp; Nombre con la que se va a identificar a la interface
                  </span>
                </div>

                <div className="mb-2">
                  <label>Servicio</label>
                  <select
                    required
                    name="Servicio"
                    value={this.state.Servicio}
                    onChange={this.handleOnChange}
                    className="form-select ml-2"
                  >
                    <option value="MPLS">MPLS</option>
                    <option value="INTERNET">INTERNET</option>
                  </select>
                </div>

                <div className="select-control mb-2 d-flex align-items-center">
                  <label>Tipo de IP</label>
                  <select
                    required
                    name="TipoIP"
                    value={this.state.TipoIP}
                    onChange={this.handleOnChange}
                    className="form-select ml-2"
                  >
                    <option value="MANUAL">MANUAL</option>
                    <option value="DHCP">DHCP</option>
                    <option value="PPPoE">PPPoE</option>
                  </select>
                  <span className="tc-img">
                    &ensp; De que manera se le asignará la direccion IP a la
                    interface
                  </span>
                </div>
                {this.state.TipoIP === "MANUAL" && (
                  <span>
                    <div className="mb-2 d-flex align-items-center">
                      <label>Dirección IP</label>
                      <input
                        className="form-control ml-2"
                        type="text"
                        name="DireccionIP"
                        value={this.state.DireccionIP}
                        onChange={this.handleOnChange}
                        required
                      />
                      <span className="tc-img">
                        &ensp; Direccion IP de la interface del firewall.
                      </span>
                    </div>

                    <div className="mb-2 d-flex align-items-center">
                      <label>Máscara de Red</label>
                      <input
                        className="form-control ml-2"
                        type="text"
                        name="Mascara"
                        value={this.state.Mascara}
                        onChange={this.handleOnChange}
                        required
                      />
                    </div>

                    <div className="mb-2 d-flex align-items-center">
                      <label>Gateway</label>
                      <input
                        className="form-control ml-2"
                        type="text"
                        name="Gateway"
                        value={this.state.Gateway}
                        onChange={this.handleOnChange}
                        required
                      />
                    </div>
                  </span>
                )}

                <div className="mb-2 d-flex align-items-center">
                  <label>VLAN</label>
                  <input
                    className="form-control ml-2"
                    type="text"
                    name="Vlan"
                    value={this.state.Vlan}
                    onChange={this.handleOnChange}
                    placeholder="[1-4096]"
                    required
                  />
                </div>

                <button type="submit" className="mt-3 btn btn-outline-primary">
                  Agregar
                </button>

                <br></br>
                <br></br>
              </div>
            )}
          </span>
          {/* FIN Configuración WAN//////////////////////////////////////////////*/}

          {/* Configuración LAN//////////////////////////////////////////////*/}
          {this.state.TipoInterface === "LAN" && (
            <div>
              <div className="align-items-center">
                <div className="mb-2 d-flex align-items-center">
                  <label>Nombre LAN (Alias)</label>
                  <input
                    className="form-control ml-2 d-flex align-items-center"
                    type="text"
                    name="LanAlias"
                    value={this.state.LanAlias}
                    onChange={this.handleOnChange}
                    required
                  />
                  <span className="tc-img">
                    &ensp; Nombre con la que se va a identificar a la interface
                  </span>
                </div>

                <div className="mb-2 d-flex align-items-center">
                  <label>Dirección IP</label>
                  <input
                    className="form-control ml-2"
                    type="text"
                    name="LanDireccionIP"
                    value={this.state.LanDireccionIP}
                    onChange={this.handleOnChange}
                    required
                  />
                  <span className="tc-img">
                    &ensp; Direccion IP de la interface del firewall
                  </span>
                </div>

                <div className="mb-2 d-flex align-items-center">
                  <label>Máscara de Red</label>
                  <input
                    className="form-control ml-2"
                    type="text"
                    name="LanMascara"
                    value={this.state.LanMascara}
                    onChange={this.handleOnChange}
                    required
                  />
                </div>

                <div className="mb-2 d-flex align-items-center">
                  <label>VLAN</label>
                  <input
                    className="form-control ml-2"
                    type="text"
                    name="LanVlan"
                    value={this.state.LanVlan}
                    onChange={this.handleOnChange}
                    placeholder="[1-4096]"
                    required
                  />
                </div>

                <div className="select-control mb-2 d-flex align-items-center">
                  <label>Entrega DHCP</label>
                  <select
                    value={this.state.DHCP}
                    onChange={this.handleOnChange}
                    name="DHCP"
                    className="form-select ml-2"
                  >
                    <option value="SI">Sí</option>
                    <option value="NO">No</option>
                  </select>
                  <span className="tc-img">
                    &ensp; Seleccionar "Sí" en caso de que la interface entregue
                    DHCP
                  </span>
                </div>
                {this.state.DHCP === "SI" && (
                  <span>
                    <div className="mb-2 d-flex align-items-center">
                      <label>Rango de DHCP</label>
                      <input
                        className="form-control ml-2"
                        type="text"
                        name="DHCPFrom"
                        value={this.state.DHCPFrom}
                        onChange={this.handleOnChange}
                        required
                      />

                      <input
                        className="form-control ml-2"
                        type="text"
                        name="DHCPTo"
                        value={this.state.DHCPTo}
                        onChange={this.handleOnChange}
                        required
                      />
                      <span className="tc-img">
                        &ensp; Rango de direcciones IP que serán entregadas
                      </span>
                    </div>

                    <div className="mb-2 d-flex align-items-center">
                      <label>Servidor DNS 1</label>
                      <input
                        className="form-control ml-2"
                        type="text"
                        name="LanServidorDNS1"
                        value={this.state.LanServidorDNS1}
                        onChange={this.handleOnChange}
                        required
                      />
                      <span className="tc-img">
                        &ensp; Seleccionar si se desea usar el servidor DNS de
                        Axtel (207.248.224.71) o especificar cual se desea usar
                        en el DHCP
                      </span>
                    </div>

                    <div className="mb-2 d-flex align-items-center">
                      <label>Servidor DNS 2</label>
                      <input
                        className="form-control ml-2"
                        type="text"
                        name="LanServidorDNS2"
                        value={this.state.LanServidorDNS2}
                        onChange={this.handleOnChange}
                        required
                      />
                      <span className="tc-img">
                        &ensp; Seleccionar si se desea usar el servidor DNS de
                        Axtel (207.248.224.71) o especificar cual se desea usar
                        en el DHCP.
                      </span>
                    </div>
                  </span>
                )}

                <button type="submit" className="mt-3 btn btn-outline-primary">
                  Agregar
                </button>

                <br></br>
                <br></br>
              </div>
            </div>
          )}
          {/*FIN Configuración LAN//////////////////////////////////////////////*/}

          {/*MOSTRAR INTERFACES WAN REGISTRADAS///////////////////////////////////////*/}
          {this.state.WanSaved.length !== 0 && (
            <div className="row">
              <div className="col-6">
                <hr></hr>
                <label>INTERFACES WAN REGISTRADAS</label>
                <p></p>
                <table border="1">
                  <thead>
                    <tr>
                      <th>Alias</th>
                      <th>Tipo IP</th>
                      <th>Direccion IP</th>
                      <th>Mascara</th>
                      <th>Gateway</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.WanSaved.map(function (wan, key) {
                      return (
                        <tr key={key}>
                          <td>{wan.Alias}</td>
                          <td>{wan.TipoIP}</td>
                          <td>{wan.DireccionIP}</td>
                          <td>{wan.Mascara}</td>
                          <td>{wan.Gateway}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {/* FIN MOSTRAR INTERFACES WAN REGISTRADAS///////////////////////////////////*/}

          {/*MOSTRAR INTERFACES LAN REGISTRADAS////////////////////////////////////////*/}
          {this.state.LanSaved.length !== 0 && (
            <div>
              <hr></hr>
              <label>INTERFACES LAN REGISTRADAS</label>
              <p></p>
              <table border="1">
                <thead>
                  <tr>
                    <th>Alias</th>
                    <th>Direccion IP</th>
                    <th>Mascara</th>
                    <th>VLAN</th>
                    <th>DHCP</th>
                    <th>Rango DHCP</th>
                    <th>Servidor DNS 1</th>
                    <th>Servidor DNS 2</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.LanSaved.map(function (lan, key) {
                    return (
                      <tr key={key}>
                        <td>{lan.LanAlias}</td>
                        <td>{lan.LanDireccionIP}</td>
                        <td>{lan.LanMascara}</td>
                        <td>{lan.LanVlan}</td>
                        <td>{lan.LanDHCP}</td>
                        <td>
                          {lan.DHCPFrom}-{lan.DHCPTo}
                        </td>
                        <td>{lan.LanServidorDNS1}</td>
                        <td>{lan.LanServidorDNS2}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
          {/*FIN MOSTRAR INTERFACES LAN REGISTRADAS////////////////////////////////////*/}

          <br></br>
          <br></br>
        </form>
      </div>
    );
  }
}

export default Interfaces;
