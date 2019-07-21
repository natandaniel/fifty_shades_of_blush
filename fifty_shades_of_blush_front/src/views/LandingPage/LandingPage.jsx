import React from 'react';
import { CookiesProvider } from 'react-cookie';
import RecentArticles from '../components/recentArticles/RecentArticles.jsx';
import CreateArticle from '../components/createArticle/CreateArticle.jsx';
import Header from '../components/header/Header.jsx'

const when = require('when');
const client = require('../components/rest/client');
const follow = require('../components/rest/follow');
const root = 'http://localhost:8080/api';

class LandingPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { articles: [], recentArticles: [], attributes: [], authenticatedUser: {}, page: {}, links: {} };
  }

  loadFromServer() {
    follow(client, root, [
      { rel: 'articles', params: {} }]
    ).then(articleCollection => {
      return client({
        method: 'GET',
        path: articleCollection.entity._links.profile.href,
        headers: { 'Accept': 'application/schema+json' }
      }).then(schema => {
        this.schema = schema.entity;
        this.links = articleCollection.entity._links;
        return articleCollection;
      });
    }).then(articleCollection => {
      this.page = articleCollection.entity.page;
      return client({
        method: 'GET',
        path: articleCollection.entity._links.recent.href
      }).then(recents => {
        return recents.entity._embedded.articleResources.map(article =>
          client({
            method: 'GET',
            path: article._links.self.href
          })
        );
      });
    }).then(articlePromises => {
      return when.all(articlePromises);
    }).done(recentArticles => {
      this.setState({
        page: this.page,
        recentArticles: recentArticles,
        attributes: Object.keys(this.schema.properties),
        links: this.links
      });
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

          <RecentArticles articles={this.state.recentArticles} />
          <CreateArticle attributes={this.state.attributes} />

        </div>
      </CookiesProvider >
    );
  }
}

export default LandingPage;