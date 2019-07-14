import React from 'react';
import Container from '@material-ui/core/Container';
import Header from './components/Header';

const sections = [
  {
    title: 'Beauty',
    description: 'My tips and personal creations',
    url: 'localhost:3000/50sob/beauty',
    id: 0
  },
  {
    title: 'Fashion',
    description: 'Everything about fashion an style',
    url: 'localhost:3000/50sob/fashion',
    id: 1
  },
  {
    title: 'Travel',
    description: 'My journey around the world',
    url: 'localhost:3000/50sob/travel',
    id: 2
  },
  {
    title: 'Lifestyle',
    description: 'How I style my life',
    url: 'localhost:3000/50sob/lifestyle',
    id: 3
  }

]

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      sections, // equivalent to sections: sections,
    }

    this.goToSection = this.goToSection.bind();
  }

  goToSection(url) {
    console.log("Going to " + url);
  }

  render() {

    const title = 'Fifty Shades Of Blush';

    return (
      <div className="App">
        <Container maxWidth="lg">
          <Header></Header>
          <h2>{title}</h2>
          {this.state.sections.map((item) =>
            <div key={item.id}>
              <span>
                <a href={item.url}>{item.title}</a>
              </span>
              <p>{item.description}</p>
              <button onClick={() => this.goToSection(item.url)}>Go</button>
            </div>
          )
          }
        </Container>
      </div>
    );
  }
}

export default App;