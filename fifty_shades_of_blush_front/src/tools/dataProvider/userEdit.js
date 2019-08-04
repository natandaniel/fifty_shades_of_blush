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
            <DisabledInput source="createdAt" label="CREATED AT" />
            <DisabledInput source="updatedAt" label="MODIFIED AT" />
            <TextInput source="roles" label="ROLES" />
            <DisabledInput source="_links.self.href" label="URI" />
        </SimpleForm>
    </Edit>
);