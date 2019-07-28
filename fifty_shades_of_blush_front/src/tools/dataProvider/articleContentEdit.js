import React from 'react';
import {
    Edit,
    SimpleForm,
    TextInput,
    DisabledInput,
} from 'react-admin';

export const ArticleContentEdit = props => (
    <Edit {...props}>
        <SimpleForm>

        <TextInput source="content" label="CONTENT"/>
        <DisabledInput source="createdAt" label="CREATED AT"/>
        <DisabledInput source="updatedAt" label="MODIFIED AT"/>
        <DisabledInput source="_links.self.href" label="URI"/>
        <DisabledInput source="_links.article.href" label="ARTICLE URI"/>

        </SimpleForm>
</Edit>
  );