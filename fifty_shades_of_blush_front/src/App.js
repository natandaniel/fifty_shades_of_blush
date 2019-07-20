import React from 'react';
import { CookiesProvider } from 'react-cookie';
import Container from '@material-ui/core/Container';
import Header from './components/header/Header';
import RecentArticles from './components/recentArticles/RecentArticles';
import CreateArticle from './components/createArticle/CreateArticle.js'

const when = require('when');
const client = require('./rest/client');
const follow = require('./rest/follow');
const root = 'http://localhost:8080/api';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { articles: [], recentArticles: [], attributes: [], authenticatedUser: {}, page: 1, links: {} };
  }

  loadFromServer() {
    follow(client, root, [
      { rel: 'articles', params: {} }]
    ).then(articleCollections => {
      return client({
        method: 'GET',
        path: articleCollections.entity._links.profile.href,
        headers: { 'Accept': 'application/schema+json' }
      }).then(schema => {
        this.schema = schema.entity;
        this.links = articleCollections.entity._links;
        return articleCollections;
      });
    }).then(articleCollections => {
      this.page = articleCollections.entity.page;
      return articleCollections.entity._embedded.articles.map(article =>
        client({
          method: 'GET',
          path: article._links.self.href
        })
      );
    }).then(articlePromises => {
      return when.all(articlePromises);
    }).done(articles => {
      this.setState({
        page: this.page,
        articles: articles,
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
          <Container maxWidth="lg">
            <Header />
            <RecentArticles articles={this.state.articles} />
            <CreateArticle attributes={this.state.attributes}/>
          </Container>
        </div>
      </CookiesProvider>
    );
  }
}

export default App;