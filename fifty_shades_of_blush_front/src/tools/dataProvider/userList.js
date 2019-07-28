import React from 'react';
import {
    List,
    Datagrid,
    TextField,
    DateField,
    UrlField,
    BooleanField,
    ArrayField
} from 'react-admin';

export const UserList = props => (
    <List {...props} >
        <Datagrid rowClick="edit">
            <TextField source="username" label="USERNAME" />
            <TextField source="password" label="PASSWORD" />
            <TextField source="firstName" label="FIRST NAME" />
            <TextField source="lastName" label="LAST NAME" />
            <DateField source="createdAt" label="CREATED AT" />
            <DateField source="updatedAt" label="MODIFIED AT" />
            <BooleanField source="enabled" label="ENABLED" />
            <BooleanField source="credentialsNonExpired" label="CREDENTIALS NON EXPIRED" />
            <BooleanField source="accountNonLocked" label="ACCOUNT NON LOCKED" />
            <BooleanField source="accountNonExpired" label="ACCOUNT NON EXPIRED" />
            <ArrayField source="authorities" label="AUTHORITIES">
                <Datagrid>
                    <TextField source="authority" label="AUTHORITY" />
                </Datagrid>
            </ArrayField>
            <UrlField source="_links.self.href" label="URI" />
        </Datagrid>
    </List>
);