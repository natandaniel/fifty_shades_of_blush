import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  DateField,
  UrlField
} from 'react-admin';

export const ArticleList = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="title" />
      <TextField source="subtitle" />
      <TextField source="imgName" />
      <TextField source="type" />
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
      <UrlField  source="_links.self.href" />
      <TextField source="id" />
    </Datagrid>
  </List>
);