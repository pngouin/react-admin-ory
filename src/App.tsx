import { Admin, BooleanField, Datagrid, List, Resource, TextField } from 'react-admin';
import * as kratos from '@ory/kratos-client'
import fakeDataProvider from 'ra-data-fakerest';
import { Component } from "react";
import config from './config.json';

export interface State {
  users: any[],
}

export interface Props {
  message?: kratos.Identity[],
}

export const PostList = (props: any) => (
  <List {...props}>
      <Datagrid>
          <TextField source="id" />
          <TextField label="first name" source="traits.name.first" />
          <TextField label="last name" source="traits.name.last" />
          <TextField label="email" source="traits.email" />
          <TextField label="role" source="traits.role" />
          <TextField label="role" source="traits.group" />
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
    const api = kratos.AdminApiFactory(undefined, config.kratos_admin_api);
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
