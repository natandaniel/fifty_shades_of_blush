import React from 'react';
import Container from '@material-ui/core/Container';
import Header from './components/header/Header';
import RecentArticles from './components/recentArticles/RecentArticles';

const when = require('when');
const client = require('./rest/client');
const follow = require('./rest/follow');
const root = 'http://localhost:8080/api';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { articles: [], pageSize: 5 };
  } 

  loadFromServer(pageSize) {
    follow(client, root, [
      { rel: 'articles', params: { size: pageSize } }]
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
        pageSize: pageSize,
        links: this.links
      });
    });
  }
 
  componentDidMount() {
		this.loadFromServer(this.state.pageSize);
	}

  render() {

    return (
      <div className="App">
        <Container maxWidth="lg">
          <Header />
          <RecentArticles articles={this.state.articles} />
        </Container>
      </div>
    );
  }
}

export default App;