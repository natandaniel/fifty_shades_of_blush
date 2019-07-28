import React from 'react';
import { Admin, Resource, ListGuesser } from 'react-admin';
import jsonHalRestProvider from 'ra-data-json-hal';

class AdminPage extends React.Component {


    constructor(props) {
        super(props);
    }

    render() {
        
        return (
            <Admin dataProvider={jsonHalRestProvider('http://localhost:8080/api')}>
                  <Resource name="articles"  list={ListGuesser}/>
                  <Resource name="users"  list={ListGuesser}/>
            </Admin>
        );
    }


}


export default AdminPage;