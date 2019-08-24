import React from 'react';
import {
    SimpleForm,
    TextInput,
    Create
} from 'react-admin';

// -- snip --

export const ArticleCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="title" label="TITLE" />
            <TextInput source="subtitle" label="SUBTITLE" />
            <TextInput source="imgName" label="IMAGE" />
        </SimpleForm>
    </Create>
);