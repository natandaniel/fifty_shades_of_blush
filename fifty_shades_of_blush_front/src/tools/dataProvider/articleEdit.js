import React from 'react';
import {
    ArrayInput,
    Edit,
    SimpleForm,
    TextInput,
    DisabledInput,
    BooleanInput,
    DateInput
} from 'react-admin';

export const ArticleEdit = props => (
    <Edit {...props}>
        <SimpleForm>
        <TextInput source="title" label="TITLE"/>
        <TextInput source="subtitle" label="SUBTITLE"/>
        <TextInput source="imgName" label="IMAGE"/>
        <DisabledInput source="createdAt" label="CREATED AT"/>
        <DisabledInput source="updatedAt" label="MODIFIED AT"/>
        <DisabledInput source="_links.self.href" label="URI"/>
        <DisabledInput source="_links.paragraphs.href" label="CONTENT URI"/>
        </SimpleForm>
</Edit>
  );