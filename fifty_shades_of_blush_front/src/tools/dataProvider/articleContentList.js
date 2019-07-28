import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  DateField,
  UrlField
} from 'react-admin';

export const ArticleContentList = props => (
    <List {...props} >
      <Datagrid rowClick="edit">
        <TextField source="content" label="CONTENT"/>
        <DateField source="createdAt" label="CREATED AT"/>
        <DateField source="updatedAt" label="MODIFIED AT"/>
        <UrlField source="_links.self.href" label="URI"/>
        <UrlField source="_links.article.href" label="ARTICLE URI"/>
      </Datagrid>
    </List>
  );