import React from 'react';
import { CookiesProvider } from 'react-cookie';
import Paper from '@material-ui/core/Paper';
import RecentArticles from '../../components/recentArticles/RecentArticles.jsx';
import Header from '../../components/header/Header.jsx'

import '../../assets/css/landingPage.css'

const when = require('when');
const client = require('../../components/rest/client');
const follow = require('../../components/rest/follow');
const root = 'http://localhost:8080/api';

class LandingPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { recentBeautyArticles: [], recentFashionArticles: [], recentTravelArticles: [], recentLifestyleArticles: [] };
  }

  loadFromServer() {

    follow(client, root, [
      { rel: 'articles', params: {} }]
    ).then(articleCollection => {

      client({
        method: 'GET',
        path: articleCollection.entity._links.recentBeauty.href
      }).then(recents => {
        return recents.entity._embedded.articleResources.map(article =>
          client({
            method: 'GET',
            path: article._links.self.href
          })
        );
      }).then(articlePromises => {
        return when.all(articlePromises);
      }).done(recentBeautyArticles => {
        this.setState({
          recentBeautyArticles: recentBeautyArticles
        });
      })

      client({
        method: 'GET',
        path: articleCollection.entity._links.recentFashion.href
      }).then(recents => {
        return recents.entity._embedded.articleResources.map(article =>
          client({
            method: 'GET',
            path: article._links.self.href
          })
        );
      }).then(articlePromises => {
        return when.all(articlePromises);
      }).done(recentFashionArticles => {
        this.setState({
          recentFashionArticles: recentFashionArticles
        });
      })

      client({
        method: 'GET',
        path: articleCollection.entity._links.recentTravel.href
      }).then(recents => {
        return recents.entity._embedded.articleResources.map(article =>
          client({
            method: 'GET',
            path: article._links.self.href
          })
        );
      }).then(articlePromises => {
        return when.all(articlePromises);
      }).done(recentTravelArticles => {
        this.setState({
          recentTravelArticles: recentTravelArticles
        });
      })

      client({
        method: 'GET',
        path: articleCollection.entity._links.recentLifestyle.href
      }).then(recents => {
        return recents.entity._embedded.articleResources.map(article =>
          client({
            method: 'GET',
            path: article._links.self.href
          })
        );
      }).then(articlePromises => {
        return when.all(articlePromises);
      }).done(recentLifestyleArticles => {
        this.setState({
          recentLifestyleArticles: recentLifestyleArticles
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
          <div className="root">
          <Paper className="paper">
              <RecentArticles recentArticles={this.state.recentBeautyArticles} />
              <RecentArticles recentArticles={this.state.recentFashionArticles} />
              <RecentArticles recentArticles={this.state.recentTravelArticles} />
              <RecentArticles recentArticles={this.state.recentLifestyleArticles} />
          </Paper>
          </div>
        </div>
      </CookiesProvider >
    );
  }
}

export default LandingPage;