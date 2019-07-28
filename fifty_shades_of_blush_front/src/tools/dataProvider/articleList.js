import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  DateField,
  UrlField
} from 'react-admin';

export const ArticleList = props => (
    <List {...props} >
      <Datagrid rowClick="edit">
        <TextField source="title" label="TITLE"/>
        <TextField source="subtitle" label="SUBTITLE"/>
        <TextField source="imgName" label="IMAGE"/>
        <DateField source="createdAt" label="CREATED AT"/>
        <DateField source="updatedAt" label="MODIFIED AT"/>
        <UrlField source="_links.self.href" label="URI"/>
        <UrlField source="_links.paragraphs.href" label="CONTENT URI"/>
      </Datagrid>
    </List>
  );