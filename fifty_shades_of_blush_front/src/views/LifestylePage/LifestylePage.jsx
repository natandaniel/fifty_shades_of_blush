import React from 'react';
import { CookiesProvider } from 'react-cookie';
import Header from '../../components/header/Header.jsx'

const when = require('when');
const client = require('../../components/rest/client');
const follow = require('../../components/rest/follow');
const root = 'http://localhost:8080/api';

class LifestylePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { lifestyleArticles: []};
  }

  loadFromServer() {

    follow(client, root, [
      { rel: 'articles', params: {} }]
    ).then(articleCollection => {

      client({
        method: 'GET',
        path: articleCollection.entity._links.lifestyle.href
      }).then(recents => {
        return recents.entity._embedded.articleResources.map(article =>
          client({
            method: 'GET',
            path: article._links.self.href
          })
        );
      }).then(articlePromises => {
        return when.all(articlePromises);
      }).done(lifestyleArticles => {
        this.setState({
          lifestyleArticles: lifestyleArticles
        });
      })
    });
  }

  componentDidMount() {
    this.loadFromServer();
  }

  render() {

    return (
      <CookiesProvider>
        <div className="App">
          <Header />
        </div>
      </CookiesProvider >
    );
  }
}

export default LifestylePage;