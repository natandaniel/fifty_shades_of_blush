import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { scrollIt } from '../../tools/scrolling/scrollIt';

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
                <Button size="small" color="inherit" onClick={() => scrollIt(
                    document.querySelector('.root'),
                    1000,
                    'easeOutQuad',
                    () => console.log(`Just finished scrolling to ${window.pageYOffset}px`)
                )}>
                    50 Shades Of Blush
          </Button>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                    ©Copyright 2019 
          </Typography>
            </Container>
        </footer>
    );
}
