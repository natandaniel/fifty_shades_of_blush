import React from 'react';
import { Container, Typography } from '@material-ui/core/';

import Header from '../../components/header/Header.jsx'
import Footer from '../../components/footer/Footer.jsx'


class AboutMePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    return (
      <div>
        <Header />
        <Container>
          <Typography variant="h5" component="h3" align="center">
            About me
        </Typography>
          <br />
          <Typography component="p" align="center">
            Hi ! I'm Julia Fernandez
        </Typography>
          <Typography component="p" align="center">
            I am mostly passionate about beauty, fashion and home design
        </Typography>
          <Typography component="p" align="center">
            I also enjoy travelling
        </Typography>
          <Typography component="p" align="center">
            With this blog, I wish to share my opinions and thoughts on beauty, fashion, travel and lifestyle
        </Typography>
          <Typography component="p" align="center">
            Thanks for reading me
        </Typography>
          <Typography component="p" align="center">
            I hope you will enjoy
        </Typography>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default AboutMePage;