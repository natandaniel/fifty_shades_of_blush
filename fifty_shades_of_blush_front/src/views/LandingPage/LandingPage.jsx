import React from 'react';
import axios from 'axios';

import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';

import Header from '../../components/header/Header.jsx'
import Footer from '../../components/footer/Footer.jsx'
import ArticleCardGrid from '../../components/article/ArticleCardGrid.jsx';
import Article from '../../components/article/Article.jsx';
import Logout from '../../components/logout/Logout.jsx';

import '../../assets/css/views/landingPage.css'
import { Typography } from '@material-ui/core';

import CreateArticle from '../../components/article/CreateArticle.jsx';

import ArticlesService from '../../tools/dataProvider/ArticlesService';

const API_URL = 'http://localhost:8080/api';
const when = require('when');

const sections = [
  'beauty',
  'fashion',
  'travel',
  'lifestyle'
];

class LandingPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      isAuthenticated: false, 
      latestArticle: [], 
      latestArticleParagraphs: [], 
      recentBeautyArticles: [], 
      recentFashionArticles: [], 
      recentTravelArticles: [], 
      recentLifestyleArticles: [] };

  }

  loadFromServer() {
    this.getLatestArticle();
    // this.getRecentBeautyArticles();
    // this.getRecentFashionArticles();
    // this.getRecentTravelArticles();
    // this.getRecentLifestyleArticles();
  };

  getLatestArticle() {
    ArticlesService.getLatestArticleEntity().then(latestArticleEntity => {
      return latestArticleEntity.data._embedded.articleResources.map(article =>
        axios.get(article._links.self.href)
      )
    }).then(articlePromises => {
      return when.all(articlePromises);
    }).then(latestArticleArray => {
        this.setState({latestArticle: latestArticleArray})
      })
  }

  getRecentBeautyArticles() {
    ArticlesService.getRecentBeautyArticlesEntity().then(recentBeautyArticlesEntity => {
      return recentBeautyArticlesEntity.data._embedded.articleResources.map(article =>
        axios.get(article._links.self.href)
      );
    }).then(articlePromises => {
      return when.all(articlePromises);
    }).then(recentBeautyArticlesArray => {
      this.setState({
        recentBeautyArticles: recentBeautyArticlesArray
      });
    })
  }

  getRecentFashionArticles() {
    ArticlesService.getRecentBeautyArticlesEntity().then(recentFashionArticlesEntity => {
      return recentFashionArticlesEntity.data._embedded.articleResources.map(article =>
        axios.get(article._links.self.href)
      );
    }).then(articlePromises => {
      return when.all(articlePromises);
    }).then(recentFashionArticlesArray => {
      this.setState({
        recentFashionArticles: recentFashionArticlesArray
      });
    })
  }

  getRecentTravelArticles() {
    ArticlesService.getRecentTravelArticlesEntity().then(recentTravelArticlesEntity => {
      return recentTravelArticlesEntity.data._embedded.articleResources.map(article =>
        axios.get(article._links.self.href)
      );
    }).then(articlePromises => {
      return when.all(articlePromises);
    }).then(recentTravelArticlesArray => {
      this.setState({
        recentTravelArticles: recentTravelArticlesArray
      });
    })
  }

  getRecentLifestyleArticles() {
    ArticlesService.getRecentLifestyleArticlesEntity().then(recentLifestyleArticlesEntity => {
      return recentLifestyleArticlesEntity.data._embedded.articleResources.map(article =>
        axios.get(article._links.self.href)
      );
    }).then(articlePromises => {
      return when.all(articlePromises);
    }).then(recentLifestyleArticlesArray => {
      this.setState({
        recentLifestyleArticles: recentLifestyleArticlesArray
      });
    })
  }

  updateDisplayedArticle = (displayedArticleKey, displayedArticle, displayedArticleParagraphs) => {
    this.setState({
      latestArticleKey: displayedArticleKey,
      latestArticle: displayedArticle,
      latestArticleParagraphs: displayedArticleParagraphs
    });
  }

  updateIsAuthenticated = (boolean) => {
    this.setState({isAuthenticated: boolean});
  }

  componentDidMount() {
    this.loadFromServer();
  }

  render() {

    let createArticleDialog = <Grid item lg={12} />;
    let logout = <Grid item lg={12} />

    if (sessionStorage.getItem('isLoggedIn') === 'true') {
      createArticleDialog = <Grid item lg={12}> <CreateArticle /></Grid>
      logout = <Logout isAuthenticatedHandler={this.updateIsAuthenticated}/>
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
            {/* {createArticleDialog} */}
            <Grid item lg={12}> <Article key="latestArticle" article={this.state.latestArticle} /></Grid>
            {/* {articleSections} */}
          </Grid>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default LandingPage;