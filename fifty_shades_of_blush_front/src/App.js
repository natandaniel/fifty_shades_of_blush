import React from 'react';
import Container from '@material-ui/core/Container';
import Header from './components/Header';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {}
  }

  render() {

    return (
      <div className="App">
        <Container maxWidth="lg">
          <Header></Header>
        </Container>
      </div>
    );
  }
}

export default App;