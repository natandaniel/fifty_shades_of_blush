import React from 'react';
import { Admin, Resource} from 'react-admin';
import jsonHalRestProvider from 'ra-data-json-hal';
import { withCookies } from 'react-cookie';
import Cookies from 'universal-cookie';

import authProvider from '../../tools/authProvider/authProvider';

import Dashboard from '../../tools/dataProvider/dashboard';
import {ArticleList} from '../../tools/dataProvider/articleList';
import {ArticleEdit} from '../../tools/dataProvider/articleEdit';

import {ArticleContentList} from '../../tools/dataProvider/articleContentList';
import {ArticleContentEdit} from '../../tools/dataProvider/articleContentEdit';
import {UserList} from '../../tools/dataProvider/userList';
import {UserEdit} from '../../tools/dataProvider/userEdit';


const _fetch = require('../../tools/dataProvider/fetch');

const cookies = new Cookies();


class AdminPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.state.csrfToken = cookies.get('XSRF-TOKEN');
        console.log(this.state.csrfToken);

    }

    render() {

        const httpClient = (url, options = {}, resource, type) => {

            if (!options.headers) {
                options.headers = new Headers({ Accept: 'application/json'});
            }
            options.headers.set('X-XSRF-TOKEN', this.state.csrfToken);

            const token = localStorage.getItem('token');
            options.user = {
                authenticated: true,
                token: token
            }
           
        console.log(token);
        console.log(this.state.csrfToken);
            return _fetch.fetchJson(url, options, resource, type);
        }
        const dataProvider = jsonHalRestProvider('http://localhost:8080/api', httpClient);
        

        return (

            <Admin dashboard={Dashboard} authProvider={authProvider} dataProvider={dataProvider} >
                  <Resource name="articles"  list={ArticleList} edit={ArticleEdit}/>
                  <Resource name="articleContents"  list={ArticleContentList} edit={ArticleContentEdit} options={{ label: 'Paragraphs' }}/>
                  <Resource name="users"  list={UserList} edit={UserEdit}/>
            </Admin>
        );
    }


}


export default withCookies(AdminPage);