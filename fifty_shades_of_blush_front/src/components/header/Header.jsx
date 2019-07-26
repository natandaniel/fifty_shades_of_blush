import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import '../../assets/css/components/header.css'

const headerBgImg = require("./header-bg.JPG");

const sections = [
    'beauty',
    'fashion',
    'travel',
    'lifestyle'
];


class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        return (
            <div className="root">
                <img className="headerImg" src={headerBgImg} width="700" height="282" alt="banner" />
                <Container>
                    <Toolbar component="nav" variant="dense" className="toolbar">
                        {sections.map(section => (
                            <Link
                                color="inherit"
                                noWrap
                                key={section}
                                variant="body2"
                                href={"/" + section}
                                className="toolbarLink"
                                to={"/" + section}
                            >
                                {section.toUpperCase()}
                            </Link>
                        ))}
                    </Toolbar>
                </Container>
            </div>
        );
    }
}

export default Header;