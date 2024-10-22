import React from 'react';
import axios from 'axios';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import Header from '../../components/header/Header.jsx'
import Footer from '../../components/footer/Footer.jsx'
import ArticleCardGrid from '../../components/article/ArticleCardGrid.jsx';
import Article from '../../components/article/Article.jsx';
import Logout from '../../components/logout/Logout.jsx';

import '../../assets/css/views/landingPage.css'

import ArticlesService from '../../tools/dataProvider/ArticlesService';

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
      isAuth: false,
      latestArticle: [],
      recentBeautyArticles: [],
      recentFashionArticles: [],
      recentTravelArticles: [],
      recentLifestyleArticles: []
    };

  }

  loadFromServer() {
    this.getLatestArticle();
    this.getRecentBeautyArticles();
    this.getRecentFashionArticles();
    this.getRecentTravelArticles();
    this.getRecentLifestyleArticles();
  };

  getLatestArticle() {
    ArticlesService.getLatestArticleEntity().then(latestArticleEntity => {
      if (latestArticleEntity.data._embedded) {
        return latestArticleEntity.data._embedded.articleResources.map(article =>
          axios.get(article._links.self.href)
        )
      } else {
        return []
      }
    }).then(articlePromises => {
      return when.all(articlePromises)
    }).then(latestArticleArray => {
      this.setState({ latestArticle: latestArticleArray })
    })
  }

  getRecentBeautyArticles() {
    ArticlesService.getRecentBFTLArticlesEntity("beauty").then(recentBeautyArticlesEntity => {
      if (recentBeautyArticlesEntity.data._embedded) {
        return recentBeautyArticlesEntity.data._embedded.articleResources.map(article =>
          axios.get(article._links.self.href)
        )
      } else {
        return []
      }
    }).then(articlePromises => {
      return when.all(articlePromises)
    }).then(recentBeautyArticlesArray => {
      this.setState({
        recentBeautyArticles: recentBeautyArticlesArray
      })
    })
  }

  getRecentFashionArticles() {
    ArticlesService.getRecentBFTLArticlesEntity("fashion").then(recentFashionArticlesEntity => {
      if (recentFashionArticlesEntity.data._embedded) {
        return recentFashionArticlesEntity.data._embedded.articleResources.map(article =>
          axios.get(article._links.self.href)
        )
      } else {
        return []
      }
    }).then(articlePromises => {
      return when.all(articlePromises)
    }).then(recentFashionArticlesArray => {
      this.setState({
        recentFashionArticles: recentFashionArticlesArray
      })
    })
  }

  getRecentTravelArticles() {
    ArticlesService.getRecentBFTLArticlesEntity("travel").then(recentTravelArticlesEntity => {
      if (recentTravelArticlesEntity.data._embedded) {
        return recentTravelArticlesEntity.data._embedded.articleResources.map(article =>
          axios.get(article._links.self.href)
        )
      } else {
        return []
      }
    }).then(articlePromises => {
      return when.all(articlePromises)
    }).then(recentTravelArticlesArray => {
      this.setState({
        recentTravelArticles: recentTravelArticlesArray
      })
    })
  }

  getRecentLifestyleArticles() {
    ArticlesService.getRecentBFTLArticlesEntity("lifestyle").then(recentLifestyleArticlesEntity => {
      if (recentLifestyleArticlesEntity.data._embedded) {
        return recentLifestyleArticlesEntity.data._embedded.articleResources.map(article =>
          axios.get(article._links.self.href)
        )
      } else {
        return []
      }
    }).then(articlePromises => {
      return when.all(articlePromises)
    }).then(recentLifestyleArticlesArray => {
      this.setState({
        recentLifestyleArticles: recentLifestyleArticlesArray
      })
    })
  }

  updateDisplayedArticle = (displayedArticle) => {
    this.setState({
      latestArticle: displayedArticle,
    });
  }

  updateIsAuthenticated = () => {
    this.setState({ isAuth: !this.state.isAuth });
  }

  componentDidMount() {
    this.loadFromServer();
  }

  refreshPage = () => {
    this.loadFromServer();
  }

  render() {

    let logout = <Grid item xs />
    let createArticle = <Grid item />

    if (sessionStorage.getItem('isAuth') === 'true') {
      logout = <Logout isAuthenticatedHandler={this.updateIsAuthenticated} />
      createArticle = <Grid item><Button variant="contained" color="primary" href="/admin/create">CREATE ARTICLE</Button></Grid>
    }

    const articleSections = sections.map(section => (
      <Grid key={section} className="section" container spacing={2} item md={12}>
        <Grid item md={12}>
          <ArticleCardGrid displayedArticleHandler={this.updateDisplayedArticle} recentArticles={section === 'beauty' ? this.state.recentBeautyArticles : (
            section === 'fashion' ? this.state.recentFashionArticles : (section === 'travel' ? this.state.recentTravelArticles : this.state.recentLifestyleArticles))} refreshPage={this.refreshPage} />
        </Grid>
      </Grid>
    ));

    return (
      <div>
        <Header />
        <Container>
          <Grid key="mainGrid" container spacing={2}>
            {logout}
            {createArticle}
            <Grid item lg={12}> <Article key="latestArticle" article={this.state.latestArticle} /></Grid>
            {articleSections}
          </Grid>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default LandingPage;