import { Admin, BooleanField, Datagrid, DateField, List, ListGuesser, Resource, TextField } from 'react-admin';
import * as kratos from '@ory/kratos-client'
import fakeDataProvider from 'ra-data-fakerest';
import React, { Component } from "react";
import ReactDOM from "react-dom";

export interface State {
  users: any[],
}

export interface Props {
  message?: kratos.Identity[],
}
const { REACT_APP_KRATOS_PRIVATE_API } = process.env;

export const PostList = (props: any) => (
  <List {...props}>
      <Datagrid>
          <TextField source="id" />
          <TextField label="first name" source="traits.name.first" />
          <TextField label="last name" source="traits.name.last" />
          <TextField label="email" source="traits.email" />
          <BooleanField label="verified" source="verifiable_addresses[0].verified" />
      </Datagrid>
  </List>
);

class App extends Component<Props, State> {
  private dataprovider = fakeDataProvider(this.state);

  constructor() {
    super({message: []});
    this.state = { users: [] };
  }

  async componentDidMount() {
    const api = kratos.AdminApiFactory(undefined, REACT_APP_KRATOS_PRIVATE_API);
    const json = await api.listIdentities();
    this.setState({ users: json.data });
  }

  async componentDidUpdate() {
    this.dataprovider = fakeDataProvider(this.state);
  }

  render() {
    const dataProvider = fakeDataProvider(this.state);
    return (
      <Admin dataProvider={dataProvider}>
         <Resource name="users" list={PostList} />
     </Admin>
    );
  }
}

export default App;
