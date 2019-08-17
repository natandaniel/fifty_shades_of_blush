import React from 'react';

import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';

import Header from '../../components/header/Header.jsx'
import Footer from '../../components/footer/Footer.jsx'
import ArticleCardGrid from '../../components/article/ArticleCardGrid.jsx';
import Article from '../../components/article/Article.jsx';

import '../../assets/css/views/landingPage.css'
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import CreateArticle from '../../components/article/CreateArticle.jsx';

const when = require('when');
const client = require('../../tools/rest/client');
const follow = require('../../tools/rest/follow');
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
    this.state = { authenticatedUser: {}, isAuthenticated: false, articleAttributes: [], latestArticle: [], latestArticleKey: "", latestArticleParagraphs: [], recentBeautyArticles: [], recentFashionArticles: [], recentTravelArticles: [], recentLifestyleArticles: [] };
    this.updateDisplayedArticle = this.updateDisplayedArticle.bind(this);
  }

  loadFromServer() {

    follow(client, root, [
      { rel: 'articles', params: {} }]
    ).then(articleCollection => {


      this.setState({
        latestArticleKey: articleCollection.entity._links.latest.href
      });

      this.getArticleAttributes(articleCollection);
      this.getLatestArticle(articleCollection);
      this.getRecentBeautyArticles(articleCollection);
      this.getRecentFashionArticles(articleCollection);
      this.getRecentTravelArticles(articleCollection);
      this.getRecentLifestyleArticles(articleCollection);
    });
  }

  getArticleAttributes(articleCollection) {
    client({
      method: 'GET',
      path: articleCollection.entity._links.profile.href,
      headers: { 'Accept': 'application/schema+json' }
    }).done(schema => {
      this.setState({ articleAttributes: Object.keys(schema.entity.properties) });
    });
  }

  getLatestArticle(articleCollection) {

    client({
      method: 'GET',
      path: articleCollection.entity._links.latest.href
    }).then(latest => {
      return latest.entity._embedded.articleResources.map(article =>
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

      this.getLatestArticleParagraphs(latestArticle);
    })

  }

  getLatestArticleParagraphs(latestArticle) {
    latestArticle.map(latestArticle =>

      client({
        method: 'GET',
        path: latestArticle.entity._links.paragraphs.href
      }).then(result => {
        return result.entity._embedded.articleContents.map(articleContent =>
          client({
            method: 'GET',
            path: articleContent._links.self.href
          })
        );
      }).then(articleContentPromises => {
        return when.all(articleContentPromises);
      }).done(paragraphs => {
        this.setState({
          latestArticleParagraphs: paragraphs
        });
      }));
  }

  getRecentBeautyArticles(articleCollection) {
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

  }

  getRecentFashionArticles(articleCollection) {
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
  }

  getRecentTravelArticles(articleCollection) {

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
  }

  getRecentLifestyleArticles(articleCollection) {
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
  }

  logout = () =>{
    client({
      method: 'POST',
      path: root + '/perform-logout',
    });

    this.setState({isAuthenticated: false});
  }

  updateDisplayedArticle(displayedArticleKey, displayedArticle, displayedArticleParagraphs) {
    this.setState({
      latestArticleKey: displayedArticleKey,
      latestArticle: displayedArticle,
      latestArticleParagraphs: displayedArticleParagraphs
    });
  }

  getAuthenticatedUser(){
		client({
			method: 'GET',
			path: root +'/authenticatedUser'
		}).done(response => {
			this.setState({
				authenticatedUser: response.entity
      });
      console.log(this.state.authenticatedUser)
		});
	}

  componentDidMount() {
    this.loadFromServer();
    this.getAuthenticatedUser();
  }

  render() {

    let createArticleDialog = <Grid item lg={12} />;
    let logout = <Grid item lg={12} />

    if (this.state.isAuthenticated) {
      createArticleDialog = <Grid item lg={12}> <CreateArticle authenticatedUser={this.state.authenticatedUser} /></Grid>
      logout = <Grid item lg={12}><Button variant="contained" color="secondary" onClick={this.logout}>
        Exit Admin Mode
    </Button> </Grid>
    }

    const articleSections = sections.map(section => (
      <Grid key={section} className="section" container spacing={2} item md={12}>
        <Grid item md={4} xs={1}></Grid>
        <Grid item md={4} xs={10}>
          <div className="linkBlock">
            <Typography className="link">  {"recent " + section + " articles"}</Typography>
            <Link
              color="inherit"
              href={"/" + section}
              to={"/" + section}
              classes={{ textDecoration: 'muiLink' }}
            >
              <Typography className="link">  {"all articles here"}</Typography>
            </Link>
          </div>
        </Grid>
        <Grid item md={4} xs={1}></Grid>
        <Grid item md={12}>
          <ArticleCardGrid displayedArticleHandler={this.updateDisplayedArticle} recentArticles={section === 'beauty' ? this.state.recentBeautyArticles : (
            section === 'fashion' ? this.state.recentFashionArticles : (section === 'travel' ? this.state.recentTravelArticles : this.state.recentLifestyleArticles))} />
        </Grid>
      </Grid>
    ));

    return (
      <div>
        <Header />
        <Container>
          <Grid key="mainGrid" className="" container spacing={2}>
            {logout}
            {createArticleDialog}
            <Grid item lg={12}> <Article key={this.state.latestArticleKey} article={this.state.latestArticle} articleParagraphs={this.state.latestArticleParagraphs} /></Grid>
            {articleSections}
          </Grid>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default LandingPage;