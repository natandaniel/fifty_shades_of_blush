import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
    footer: {
        backgroundColor: theme.palette.background.paper,
        marginTop: theme.spacing(8),
        padding: theme.spacing(6, 0),
    },
}));


export default function Footer() {
    const classes = useStyles();

    return (

        <footer className={classes.footer}>
            <Container maxWidth="lg">
                <Typography variant="h6" align="center" gutterBottom>
                    50 Shades Of Blush
          </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                    Copyright
          </Typography>
            </Container>
        </footer>
    );
}
