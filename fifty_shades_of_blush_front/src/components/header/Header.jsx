import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import '../../assets/css/components/header.css'

const headerBgImg = require("./header-bg.JPG");

const sections = [
    'HOME',
    'beauty',
    'fashion',
    'travel',
    'lifestyle',
    'about me'
];

function FormRow() {
    return (
        <React.Fragment>
            {sections.map(section => (
                <Grid item xs key={section} className="link"><Link
                    color="inherit"
                    noWrap
                    variant="body2"
                    href={section === 'HOME' ? "/" : "/" + section}
                    className="toolbarLink"
                    to={"/" + section}
                >
                    {section.toUpperCase()}
                </Link></Grid>
            ))}
        </React.Fragment>
    );
}


class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = { navbarWidth: 0 };
    }


    addStickyClass = (navbar, sticky) => {
        if (window.pageYOffset >= sticky) {
            navbar.style.width = this.state.navbarWidth + 'px';
            navbar.style.padding = '0px';
            navbar.classList.add("sticky");
        } else {
            navbar.classList.remove("sticky");
            navbar.style.width = null;
            navbar.style.padding = null;
        }
    }

    componentDidMount() {
        const navbar = document.getElementById("navbar");
        const sticky = navbar.offsetTop;
        console.log(sticky);
        this.setState({ navbarWidth: navbar.offsetWidth });
        window.addEventListener('scroll', () => this.addStickyClass(navbar, sticky));
    }

    render() {
        return (
            <div className="root">
                <Container>
                <img id="banner" className="headerImg" src={headerBgImg} width="55%" alt="banner" />
                    <Toolbar id="navbar" component="nav" variant="dense" className="toolbar">
                        <Grid container item xs={12} spacing={1}>
                            <FormRow />
                        </Grid>
                    </Toolbar>
                </Container>
            </div>
        );
    }
}
export default Header;