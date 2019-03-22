import React, { Component } from "react";

const USERNAME = "kevincalimeno@gmail.com";
const PASSWORD = "YgM8Y5bUFczs24R6RMU5PLejgjtjGzLJ5Jxnbw8";
const LOGINURL = "https://na85.salesforce.com";
const GRANTSERVICE = "/services/oauth2/token?grant_type=password";
const CLIENTID =
  "3MVG9KsVczVNcM8x6B9FeCsVN8ifdmFstpFOc2n2f3JOduX1KZ1ioYUNnHFZJ3i2GhUw5IHUWru5ZMeRUlk0P";
const CLIENTSECRET =
  "1E82298C0D41D05250B5BA5C424F9828B2FC0B183A3B9BC5A6457273B33BE785";
const REST_ENDPOINT = "/services/data";
const API_VERSION = "/v44.0";

class App extends Component {
  constructor() {
    super();
    this.state = { carLead: "0", myArray: [] };
  }
  _getData = () => {
    const loginURL =
      LOGINURL +
      GRANTSERVICE +
      "&client_id=" +
      CLIENTID +
      "&client_secret=" +
      CLIENTSECRET +
      "&username=" +
      USERNAME +
      "&password=" +
      PASSWORD;

    // fetch(loginURL, {
    //   method: "POST"
    // }).then(res => {
    //   console.log("RESP", res);
    // });

    const baseUri =
      "https://na85.salesforce.com/" + REST_ENDPOINT + API_VERSION;

    const uri = baseUri + "/query?q=SELECT+lead__c+FROM+car__c";

    fetch(uri, {
      headers: {
        Authorization:
          "OAuth 00D1U0000014vwW!AQcAQNbdXir9pMCnK.BA_5MM4FgcbFQgQ.L_f2cZxMvX3axZhEEfXMEt.R0Kk1F6Siu1qX1.VHxZqBFwemwe5hh4h3IF6Uqz",
        "X-PrettyPrint": "1"
        // Accept: 'application/json',
        // 'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(resp => {
        console.log("Response Data: ", resp);
        this.setState({ myArray: resp.records });
      });
  };

  componentDidMount() {
    this._getData();
  }

  handleChange(event) {
    console.log("Value OnChange: ", event.target.value);
    this.setState({ carLead: event.target.value });
    this._getSecond(event.target.value);
  }

  _getSecond(id) {
    alert("My ID " + id)
    let muyURL = LOGINURL + id;
    // fetch(loginURL, {
    //   method: "POST"
    // }).then(res => {
    //   console.log("RESP", res);
    // });
  }

   render() {
    return (
      <div className="App">
        <label>
          Marca de Carro:
          <select
            value={this.state.carLead}
            onChange={event => this.handleChange(event)}
          >
            {this.state.myArray.map(dato => (
              <option value={dato.lead__c}>{dato.lead__c}</option>
            ))}
            {/* <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option> */}
          </select>
        </label>
      </div>
    );
  }
}

export default App;