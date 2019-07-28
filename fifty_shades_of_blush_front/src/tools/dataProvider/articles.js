import React from 'react';
import {
  List,
  Datagrid,
  TextField
} from 'react-admin';

export const ArticleList = props => (
    <List {...props} >
      <Datagrid rowClick="edit">
        <TextField source="title" />
        <TextField source="subtitle" />
        <TextField source="imgName" />
        <TextField source="type" />
      </Datagrid>
    </List>
  );