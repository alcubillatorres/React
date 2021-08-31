import React, { Component } from "react";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TipoInterface: "",
      Alias: "",
      Servicio: "",
      RutaDefault: false,
      NextHop: "",
      RutasEstaticas: [],
      RedRutaEstatica: [],
      MascaraRutaEstatica: [],
      NextHopRutaEstatica: [],
      TipoIP: "MANUAL",
      DireccionIP: "",
      Mascara: "",
      Gateway: "",
      Vlan: "",
      id: "610ca5db0a831b20c80247d2", //id cliente
      //id: "60e6840d443b8d13bcfc8d56",
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

    this.handleRutaDefault = this.handleRutaDefault.bind(this);
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

  handleTipoInterface = (event) => {
    this.setState({ TipoInterface: event.target.value });
  };

  handleAlias = (event) => {
    this.setState({
      Alias: event.target.value,
    });
  };

  handleServicio = (event) => {
    this.setState({
      Servicio: event.target.value,
    });
  };

  handleRutaDefault = () => {
    this.setState({
      RutaDefault: !this.state.RutaDefault,
    });
  };

  handleNextHop = (event) => {
    this.setState({
      NextHop: event.target.value,
    });
  };

  handleRedRutaEstatica = (event) => {
    this.setState({
      RedRutaEstatica: event.target.value,
    });
  };

  handleMascaraRutaEstatica = (event) => {
    this.setState({
      MascaraRutaEstatica: event.target.value,
    });
  };

  handleNextHopRutaEstatica = (event) => {
    this.setState({
      NextHopRutaEstatica: event.target.value,
    });
  };

  handleTipoIP = (event) => {
    this.setState({
      TipoIP: event.target.value,
    });
  };

  handleDireccionIP = (event) => {
    this.setState({
      DireccionIP: event.target.value,
    });
  };

  handleMascara = (event) => {
    this.setState({
      Mascara: event.target.value,
    });
  };

  handleGateway = (event) => {
    this.setState({
      Gateway: event.target.value,
    });
  };

  handleVlan = (event) => {
    this.setState({
      Vlan: event.target.value,
    });
  };

  handleLanAlias = (event) => {
    this.setState({
      LanAlias: event.target.value,
    });
  };

  handleLanDireccionIP = (event) => {
    this.setState({
      LanDireccionIP: event.target.value,
    });
  };

  handleLanMascara = (event) => {
    this.setState({
      LanMascara: event.target.value,
    });
  };

  handleLanVlan = (event) => {
    this.setState({
      LanVlan: event.target.value,
    });
  };

  handleDHCP = (event) => {
    this.setState({
      DHCP: event.target.value,
    });
  };

  handleDHCPFrom = (event) => {
    this.setState({
      DHCPFrom: event.target.value,
    });
  };

  handleDHCPTo = (event) => {
    this.setState({
      DHCPTo: event.target.value,
    });
  };

  handleLanServidorDNS1 = (event) => {
    this.setState({
      LanServidorDNS1: event.target.value,
    });
  };

  handleLanServidorDNS2 = (event) => {
    this.setState({
      LanServidorDNS2: event.target.value,
    });
  };

  handleAddRow = (e) => {
    e.preventDefault();
    this.setState((prevState, props) => {
      const row = {
        red: this.state.RedRutaEstatica,
        mascara: this.state.MascaraRutaEstatica,
        hop: this.state.NextHopRutaEstatica,
      };
      return {
        RutasEstaticas: [...prevState.RutasEstaticas, row],
        RedRutaEstatica: "",
        MascaraRutaEstatica: "",
      };
    });
  };

  handleSubmit = (event) => {
    const data = {
      TipoInterface: this.state.TipoInterface,
      Alias: this.state.Alias.trim(),
      TipoServicio: this.state.Servicio,
      RutaDefault: this.state.RutaDefault,
      NextHop: this.state.NextHop.trim(),
      RutasEstaticas: this.state.RutasEstaticas,
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
          RutaDefault: true,
          NextHop: "",
          RedRutaEstatica: [],
          MascaraRutaEstatica: [],
          NextHopRutaEstatica: [],
          RutasEstaticas: [],
          TipoIP: "MANUAL",
          DireccionIP: "",
          Mascara: "",
          Gateway: "",
          Vlan: "",
          LanAlias: "",
          LanMascara: "",
          LanDireccionIP: "",
          LanVlan: "",
          LanDHCP: "",
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
        <div>
          <img src="axtel.png" alt="axtel logo" className="image-title"></img>
        </div>
        <div className="page-header text-center">
          <h1>
            <small>CONFIGURACIÓN DE INTERFACES</small>
          </h1>
        </div>
        <form onSubmit={this.handleSubmit}>
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

          <hr></hr>
          <label>Agregar Interface (WAN/LAN)</label>
          <select
            className="form-select form-select-lg mb-3 ml-2"
            value={this.state.TipoInterface}
            onChange={this.handleTipoInterface}
          >
            <option value=""></option>
            <option value="WAN">WAN</option>
            <option value="LAN">LAN</option>
          </select>

          {/* Configuración WAN ///////////////////////////////////////////////////////*/}

          <span>
            {this.state.TipoInterface === "WAN" && (
              <div className="align-items-center">
                <div className="mb-2 d-flex align-items-center">
                  <label>Nombre WAN (Alias)</label>
                  <input
                    className="form-control ml-2"
                    type="text"
                    value={this.state.Alias}
                    onChange={this.handleAlias}
                    required
                  />
                </div>

                <div className="mb-2">
                  <label>Servicio</label>
                  <select
                    value={this.state.Servicio}
                    onChange={this.handleServicio}
                    className="form-select ml-2"
                  >
                    <option value=""></option>
                    <option value="MPLS">MPLS</option>
                    <option value="INTERNET">INTERNET</option>
                  </select>
                </div>

                <div className="mb-2">
                  <label>Tipo de IP</label>
                  <select
                    value={this.state.TipoIP}
                    onChange={this.handleTipoIP}
                    className="form-select ml-2"
                  >
                    <option value="MANUAL">MANUAL</option>
                    <option value="DHCP">DHCP</option>
                    <option value="PPPoE">PPPoE</option>
                  </select>
                </div>
                {this.state.TipoIP === "MANUAL" && (
                  <span>
                    <div className="mb-2 d-flex align-items-center">
                      <label>Dirección IP</label>
                      <input
                        className="form-control ml-2"
                        type="text"
                        value={this.state.DireccionIP}
                        onChange={this.handleDireccionIP}
                        placeholder="xxx.xxx.xxx.xxx"
                        required
                      />
                    </div>

                    <div className="mb-2 d-flex align-items-center">
                      <label>Máscara de Red</label>
                      <input
                        className="form-control ml-2"
                        type="text"
                        value={this.state.Mascara}
                        onChange={this.handleMascara}
                        placeholder="xxx.xxx.xxx.xxx"
                        required
                      />
                    </div>

                    <div className="mb-2 d-flex align-items-center">
                      <label>Gateway</label>
                      <input
                        className="form-control ml-2"
                        type="text"
                        value={this.state.Gateway}
                        onChange={this.handleGateway}
                        placeholder="xxx.xxx.xxx.xxx"
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
                    value={this.state.Vlan}
                    onChange={this.handleVlan}
                    placeholder="[1-4096]"
                    required
                  />
                </div>

                {/* 
                <hr></hr>

                <div className="mb-2 d-flex align-items-center">
                  <label>CONFIGURACION DE RUTEO</label>
                </div>

                {this.state.Servicio !== "" && (
                  <span>
                    {this.state.TipoIP !== "DHCP" && (
                      <div className="mb-2 d-flex align-items-center">
                        <input
                          type="checkbox"
                          onChange={this.handleRutaDefault}
                          defaultChecked={this.state.RutaDefault}
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
                      </div>
                    )}

                    {this.state.RutaDefault === true && (
                      <span>
                        {this.state.TipoIP !== "DHCP" && (
                          <span>
                            <div className="mb-2 d-flex align-items-center">
                              <label>Next-hop</label>
                              <input
                                className="form-control ml-2"
                                type="text"
                                value={this.state.NextHop}
                                onChange={this.handleNextHop}
                                placeholder="xxx.xxx.xxx.xxx"
                                required
                              />
                            </div>
                          </span>
                        )}
                      </span>
                    )}

                    {this.state.Servicio === "MPLS" && (
                      <span>
                        {this.state.RutaDefault === false && (
                          <span>
                            <div className="row">
                              <div className="col-5">
                                <label className="mt-2 mb-2">
                                  Agregar Rutas Estáticas Específicas
                                </label>
                                <div className="mb-2 d-flex align-items-center">
                                  <label>Red</label>
                                  <input
                                    className="form-control ml-2"
                                    type="text"
                                    value={this.state.RedRutaEstatica}
                                    onChange={this.handleRedRutaEstatica}
                                    placeholder="xxx.xxx.xxx.xxx"
                                  />
                                </div>

                                <div className="mb-2 d-flex align-items-center">
                                  <label>Máscara de Red</label>
                                  <input
                                    className="form-control ml-2"
                                    type="text"
                                    value={this.state.MascaraRutaEstatica}
                                    onChange={this.handleMascaraRutaEstatica}
                                    placeholder="xxx.xxx.xxx.xxx"
                                  />
                                </div>
                                {this.state.TipoIP !== "DHCP" && (
                                  <div className="mb-2 d-flex align-items-center">
                                    <label>Next-hop</label>
                                    <input
                                      className="form-control ml-2"
                                      type="text"
                                      value={this.state.NextHopRutaEstatica}
                                      onChange={this.handleNextHopRutaEstatica}
                                      placeholder="xxx.xxx.xxx.xxx"
                                    />
                                  </div>
                                )}

                                <div className="row justify-content-center">
                                  <div className="col text-center">
                                    <button
                                      className="m-1 p-1 btn btn-outline-primary"
                                      onClick={this.handleAddRow}
                                    >
                                      Agregar Ruta
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="col size-small">
                                {this.state.RutasEstaticas.length !== 0 && (
                                  <span>
                                    <div className="size-bold">
                                      Redes Estáticas Registradas
                                    </div>
                                    {this.state.RutasEstaticas.map(
                                      (ruta, i) => {
                                        return (
                                          <div key={i}>
                                            {" "}
                                            Red = {ruta.red} Máscara ={" "}
                                            {ruta.mascara}
                                            {this.state.TipoIP !== "DHCP" && (
                                              <span>Next-hop = {ruta.hop}</span>
                                            )}
                                          </div>
                                        );
                                      }
                                    )}
                                  </span>
                                )}
                              </div>
                            </div>
                            <hr></hr>
                          </span>
                        )}
                      </span>
                    )}
                  </span>
                )} */}

                <button type="submit" className="mt-3 btn btn-outline-primary">
                  Agregar
                </button>

                <br></br>
                <br></br>
              </div>
            )}
          </span>

          {/* fIN Configuración WAN//////////////////////////////////////////////*/}

          {/* Configuración LAN//////////////////////////////////////////////*/}
          {this.state.TipoInterface === "LAN" && (
            <div>
              <div className="align-items-center">
                <div className="mb-2 d-flex align-items-center">
                  <label>Nombre LAN (Alias)</label>
                  <input
                    className="form-control ml-2 d-flex align-items-center"
                    type="text"
                    value={this.state.LanAlias}
                    onChange={this.handleLanAlias}
                    required
                  />
                  <span className="tc-img">
                    Nombre con la que se va a identificar a la interface
                  </span>
                </div>

                <div className="mb-2 d-flex align-items-center">
                  <label>Dirección IP</label>
                  <input
                    className="form-control ml-2"
                    type="text"
                    value={this.state.LanDireccionIP}
                    onChange={this.handleLanDireccionIP}
                    placeholder="xxx.xxx.xxx.xxx"
                    required
                  />
                  <span className="tc-img">
                    Direccion IP de la interface del firewall
                  </span>
                </div>

                <div className="mb-2 d-flex align-items-center">
                  <label>Máscara de Red</label>
                  <input
                    className="form-control ml-2"
                    type="text"
                    value={this.state.LanMascara}
                    onChange={this.handleLanMascara}
                    placeholder="xxx.xxx.xxx.xxx"
                    required
                  />
                </div>

                <div className="mb-2 d-flex align-items-center">
                  <label>VLAN</label>
                  <input
                    className="form-control ml-2"
                    type="text"
                    value={this.state.LanVlan}
                    onChange={this.handleLanVlan}
                    placeholder="[1-4096]"
                    required
                  />
                </div>

                <div className="select-control mb-2 d-flex align-items-center">
                  <label>Entrega DHCP</label>
                  <select
                    value={this.state.DHCP}
                    onChange={this.handleDHCP}
                    className="form-select ml-2"
                  >
                    <option value="SI">Sí</option>
                    <option value="NO">No</option>
                  </select>
                  <span className="tc-img">
                    Seleccionar "Sí" en caso de que la interface entregue DHCP
                  </span>
                </div>
                {this.state.DHCP === "SI" && (
                  <span>
                    <div className="mb-2 d-flex align-items-center">
                      <label>Rango de DHCP</label>
                      <input
                        className="form-control ml-2"
                        type="text"
                        value={this.state.DHCPFrom}
                        onChange={this.handleDHCPFrom}
                        placeholder="xxx.xxx.xxx.xxx"
                        required
                      />

                      <input
                        className="form-control ml-2"
                        type="text"
                        value={this.state.DHCPTo}
                        onChange={this.handleDHCPTo}
                        placeholder="xxx.xxx.xxx.xxx"
                        required
                      />
                      <span className="tc-img">
                        Rango de direcciones IP que serán entregadas
                      </span>
                    </div>

                    <div className="mb-2 d-flex align-items-center">
                      <label>Servidor DNS 1</label>
                      <input
                        className="form-control ml-2"
                        type="text"
                        value={this.state.LanServidorDNS1}
                        onChange={this.handleLanServidorDNS1}
                        placeholder="xxx.xxx.xxx.xxx"
                        required
                      />
                      <span className="tc-img">
                        Seleccionar si se desea usar el servidor DNS de Axtel
                        (207.248.224.71) o especificar cual se desea usar en el
                        DHCP
                      </span>
                    </div>

                    <div className="mb-2 d-flex align-items-center">
                      <label>Servidor DNS 2</label>
                      <input
                        className="form-control ml-2"
                        type="text"
                        value={this.state.LanServidorDNS2}
                        onChange={this.handleLanServidorDNS2}
                        placeholder="xxx.xxx.xxx.xxx"
                        required
                      />
                      <span className="tc-img">
                        Seleccionar si se desea usar el servidor DNS de Axtel
                        (207.248.224.71) o especificar cual se desea usar en el
                        DHCP.
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
        </form>
      </div>
    );
  }
}

export default Home;
