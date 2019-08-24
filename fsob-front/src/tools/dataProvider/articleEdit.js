import React from 'react';
import {
    Edit,
    SimpleForm,
    TextInput,
    DisabledInput,
} from 'react-admin';

export const ArticleEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="title" label="TITLE" />
            <TextInput source="subtitle" label="SUBTITLE" />
            <TextInput source="imgName" label="IMAGE" />
            <TextInput source="type" label="TYPE" />
            <DisabledInput source="createdAt" label="CREATED AT" />
            <DisabledInput source="updatedAt" label="MODIFIED AT" />
            <DisabledInput source="_links.self.href" label="SELF" />
            <DisabledInput source="_links.article.href" label="ARTICLE" />
            <DisabledInput source="_links.paragraphs.href" label="PARAGRAPHS" />
        </SimpleForm>
    </Edit>
);