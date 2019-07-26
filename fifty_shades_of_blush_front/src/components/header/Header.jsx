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


    addStickyClass = (navbar, sticky, width) => {
        if (window.pageYOffset >= sticky) {
            navbar.classList.add("sticky")
            console.log(width)
            navbar.style.width = '77%';
        } else {
            navbar.classList.remove("sticky");
            navbar.style.width = null;
        }
    }

    componentDidMount() {
        const navbar = document.getElementById("navbar");
        const sticky = navbar.offsetTop;
        const width = navbar.offsetWidth;
        window.addEventListener('scroll', () => this.addStickyClass(navbar, sticky, width));
    }

    render() {

        return (
            <div className="root">
                <img className="headerImg" src={headerBgImg} width="700" height="282" alt="banner" />
                <Container>
                    <Toolbar id="navbar" component="nav" variant="dense" className="toolbar">
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