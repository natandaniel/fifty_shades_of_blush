import React from 'react';
import { CookiesProvider } from 'react-cookie';
import RecentArticles from '../../components/recentArticles/RecentArticles.jsx';

const when = require('when');
const client = require('../../components/rest/client');
const follow = require('../../components/rest/follow');
const root = 'http://localhost:8080/api';

class FashionPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { fashionArticles: [] };
  }

  loadFromServer() {

    follow(client, root, [
      { rel: 'articles', params: {} }]
    ).then(articleCollection => {

      client({
        method: 'GET',
        path: articleCollection.entity._links.fashion.href
      }).then(recents => {
        return recents.entity._embedded.articleResources.map(article =>
          client({
            method: 'GET',
            path: article._links.self.href
          })
        );
      }).then(articlePromises => {
        return when.all(articlePromises);
      }).done(fashionArticles => {
        this.setState({
          fashionArticles: fashionArticles
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
        <RecentArticles recentArticles={this.state.fashionArticles} />
      </CookiesProvider >
    );
  }
}

export default FashionPage;