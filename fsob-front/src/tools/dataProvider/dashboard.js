import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Title } from 'react-admin';
export default () => (
    <Card>
        <Title title="Welcome to the administration of Fifty Shades Of Blush" />
        <CardContent>Read, Create, Update and Delete resources</CardContent>
    </Card>
);