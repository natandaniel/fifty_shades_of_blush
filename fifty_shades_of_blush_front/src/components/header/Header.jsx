import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const headerBgImg = require("./header-bg.JPG");

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    toolbar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbarTitle: {
        flex: 1,
    },
    toolbarSecondary: {
        justifyContent: 'space-between',
        overflowX: 'auto',
    },
    toolbarLink: {
        padding: theme.spacing(1),
        flexShrink: 0,
    },
    headerImg: {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
    }
}));

const sections = [
    'Beauty',
    'Fashion',
    'Travel',
    'Lifestyle'
];

export default function Header() {
    const classes = useStyles();

    return (

        <div className={classes.root}>
            <Toolbar className={classes.toolbar}>
                <Typography
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="center"
                    noWrap
                    className={classes.toolbarTitle}
                >
                    Fifty Shades Of Blush
              </Typography>
            </Toolbar>
            <img className={classes.headerImg} src={headerBgImg} width="700" height="282" alt="banner" />
            <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
                {sections.map(section => (
                    <Link
                        color="inherit"
                        noWrap
                        key={section}
                        variant="body2"
                        href={"/" + section}
                        className={classes.toolbarLink}
                        to={"/" + section}
                    >
                        {section}
                    </Link>
                ))}
            </Toolbar>

        </div>
    );
}
