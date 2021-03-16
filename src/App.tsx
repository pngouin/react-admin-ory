// import React from 'react';
// import logo from './logo.svg';
// import './App.css';
// import jsonServerProvider from 'ra-data-json-server';
 import { Admin, ListGuesser, Resource } from 'react-admin';
import * as kratos from '@ory/kratos-client'
import fakeDataProvider from 'ra-data-fakerest';



// function App() {
//   // const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');
//   // kratos.AdminApi = "http://ory.test.info/.ory/kratos/private/"
//   const api = kratos.AdminApiFactory(undefined, "http://ory.test.info/.ory/kratos/private");
//   let value: kratos.Identity[] =[];
//   api.listIdentities().then((data) => value = data.data)
//   const dataProvider = fakeDataProvider(value);
//   return (
//     <Admin dataProvider={dataProvider}>
//         <Resource name="users" list={ListGuesser} />
//     </Admin>
//   );
// }

// export default App;

import React, { Component } from "react";
import ReactDOM from "react-dom";

export interface State {
  data: kratos.Identity[],
}

class App extends Component<void, State> {
  constructor() {
    super();
    this.state = { data: [] };
  }

  async componentDidMount() {
    let value: kratos.Identity[] =[];
    const api = kratos.AdminApiFactory(undefined, "http://ory.test.info/.ory/kratos/private");
    const json = await api.listIdentities()
    const dataProvider = fakeDataProvider(value);


    this.setState({ data: json.data });
  }

  render() {
    const dataProvider = fakeDataProvider(this.state);
    return (
      <Admin dataProvider={dataProvider}>
         <Resource name="users" list={ListGuesser} />
     </Admin>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById("app"));