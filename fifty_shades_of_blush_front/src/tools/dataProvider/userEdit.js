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
            <DisabledInput source="id" />
            <TextInput source="username" label="USERNAME" />
            <TextInput source="password" label="PASSWORD" />
            <TextInput source="roles" />
            <DisabledInput source="token" />
            <DisabledInput source="status" />
            <DisabledInput source="createdAt" label="CREATED AT" />
            <DisabledInput source="updatedAt" label="MODIFIED AT" />
            <TextInput source="roles" label="ROLES" />
            <DisabledInput source="_links.self.href" label="URI" />
        </SimpleForm>
    </Edit>
);