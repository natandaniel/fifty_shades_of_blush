import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  DateField,
  UrlField
} from 'react-admin';

export const ArticleContentList = props => (
<List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="content" />
            <DateField source="createdAt" />
            <DateField source="updatedAt" />
            <UrlField  source="_links.self.href" />
            <TextField source="id" />
        </Datagrid>
    </List>
  );