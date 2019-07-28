import React from 'react';
import { Admin, Resource} from 'react-admin';
import jsonHalRestProvider from 'ra-data-json-hal';

import authProvider from '../../tools/authProvider/authProvider';

import {ArticleList} from '../../tools/dataProvider/articleList';
import {ArticleEdit} from '../../tools/dataProvider/articleEdit';
import {ArticleCreate} from '../../tools/dataProvider/articleCreate';
import {ArticleContentList} from '../../tools/dataProvider/articleContentList';
import {ArticleContentEdit} from '../../tools/dataProvider/articleContentEdit';
import {UserList} from '../../tools/dataProvider/userList';
import {UserEdit} from '../../tools/dataProvider/userEdit';

class AdminPage extends React.Component {


    constructor(props) {
        super(props);
    }

    render() {
        
        return (
            <Admin authProvider={authProvider} dataProvider={jsonHalRestProvider('http://localhost:8080/api')} >
                  <Resource name="articles"  list={ArticleList} edit={ArticleEdit} create={ArticleCreate}/>
                  <Resource name="articleContents"  list={ArticleContentList} edit={ArticleContentEdit}/>
                  <Resource name="users"  list={UserList} edit={UserEdit}/>
            </Admin>
        );
    }


}


export default AdminPage;