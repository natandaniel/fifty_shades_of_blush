import React from 'react';
import {
    ArrayInput,
    Edit,
    SimpleForm,
    TextInput,
    DisabledInput,
    BooleanInput,
} from 'react-admin';

export const UserEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="username" label="USERNAME" />
            <TextInput source="password" label="PASSWORD" />
            <TextInput source="firstName" label="FIRST NAME" />
            <TextInput source="lastName" label="LAST NAME" />
            <DisabledInput source="createdAt" label="CREATED AT" />
            <DisabledInput source="updatedAt" label="MODIFIED AT" />
            <BooleanInput source="enabled" label="ENABLED" />
            <BooleanInput source="credentialsNonExpired" label="CREDENTIALS NON EXPIRED" />
            <BooleanInput source="accountNonLocked" label="ACCOUNT NON LOCKED" />
            <BooleanInput source="accountNonExpired" label="ACCOUNT NON EXPIRED" />
            <ArrayInput source="authorities" label="AUTHORITIES">
                <SimpleForm>
                    <TextInput source="authority" label="AUTHORITY" />
                </SimpleForm>
            </ArrayInput>
            <DisabledInput source="_links.self.href" label="URI" />
        </SimpleForm>
    </Edit>
);