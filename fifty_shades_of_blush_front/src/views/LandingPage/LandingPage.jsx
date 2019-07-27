import React from 'react';
import { CookiesProvider } from 'react-cookie';

import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Toolbar from '@material-ui/core/Toolbar';

import RecentArticles from '../../components/recentArticles/RecentArticles.jsx';
import LatestArticle from '../../components/recentArticles/LatestArticle.jsx';

import '../../assets/css/landingPage.css'
import { Typography } from '@material-ui/core';

const when = require('when');
const client = require('../../components/rest/client');
const follow = require('../../components/rest/follow');
const root = 'http://localhost:8080/api';

const sections = [
  'beauty',
  'fashion',
  'travel',
  'lifestyle'
];

class LandingPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { latestArticle: [], recentBeautyArticles: [], recentFashionArticles: [], recentTravelArticles: [], recentLifestyleArticles: [] };
  }

  loadFromServer() {

    follow(client, root, [
      { rel: 'articles', params: {} }]
    ).then(articleCollection => {

      client({
        method: 'GET',
        path: articleCollection.entity._links.latest.href
      }).then(recents => {
        return recents.entity._embedded.articleResources.map(article =>
          client({
            method: 'GET',
            path: article._links.self.href
          })
        );
      }).then(articlePromises => {
        return when.all(articlePromises);
      }).done(latestArticle => {
        this.setState({
          latestArticle: latestArticle
        });
      })

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

    const blocks = sections.map(section => (
      <Grid className="section" container spacing={2} item md={12}>
        <Grid item md={4} xs={1}></Grid>
        <Grid item md={4} xs={10}>
          <div className="linkBlock">
            <Link
              color="inherit"
              href={"/" + section}
              to={"/" + section}
              classes={{ textDecoration: 'muiLink' }}
            >
              <Typography className="link">  {"latest " + section + " articles"}</Typography>
            </Link>
          </div>
        </Grid>
        <Grid item md={4} xs={1}></Grid>
        <Grid item md={12}>
          <RecentArticles recentArticles={section === 'beauty' ? this.state.recentBeautyArticles : (
            section === 'fashion' ? this.state.recentFashionArticles : (section === 'travel' ? this.state.recentTravelArticles : this.state.recentLifestyleArticles))} />
        </Grid>
      </Grid>
    ));

    return (
      <CookiesProvider>
        <LatestArticle latestArticle={this.state.latestArticle} />
        {blocks}
      </CookiesProvider >
    );
  }
}

export default LandingPage;