import React from 'react';
import {
    List,
    Datagrid,
    TextField,
    DateField,
    UrlField
} from 'react-admin';

export const UserList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="username" />
            <TextField source="password" />
            <TextField source="roles" />
            <TextField source="token" />
            <TextField source="status" />
            <DateField source="createdAt" />
            <DateField source="updatedAt" />
            <UrlField  source="_links.self.href" />
            <TextField source="id" />
        </Datagrid>
    </List>
);