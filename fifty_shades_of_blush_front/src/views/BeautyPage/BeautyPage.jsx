import React from 'react';
import axios from 'axios';

import Container from '@material-ui/core/Container';
import Header from '../../components/header/Header.jsx'
import Footer from '../../components/footer/Footer.jsx'
import ArticleCardGrid from '../../components/article/ArticleCardGrid.jsx';
import Article from '../../components/article/Article.jsx';

import ArticlesService from '../../tools/dataProvider/ArticlesService';

const when = require('when');

class BeautyPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      beautyArticles: [],
      displayedArticle: []
    };
  }

  loadFromServer() {
    this.getBeautyArticles()
    this.getLatestBeautyArticle()
  }

  getLatestBeautyArticle() {
    ArticlesService.getLatestBeautyArticleEntity().then(latestArticleEntity => {
      if (latestArticleEntity.data._embedded) {
        return latestArticleEntity.data._embedded.articleResources.map(article =>
          axios.get(article._links.self.href)
        )
      } else {
        return new Array()
      }
    }).then(articlePromises => {
      return when.all(articlePromises)
    }).then(latestArticleArray => {
      this.setState({ displayedArticle: latestArticleArray })
    })
  }

  getBeautyArticles() {
    ArticlesService.getBeautyArticlesEntity().then(beautyArticlesEntity => {
      if (beautyArticlesEntity.data._embedded) {
        return beautyArticlesEntity.data._embedded.articleResources.map(article =>
          axios.get(article._links.self.href)
        )
      } else {
        return new Array()
      }
    }).then(articlePromises => {
      return when.all(articlePromises)
    }).then(beautyArticlesEntityArray => {
      this.setState({
        beautyArticles: beautyArticlesEntityArray
      })
    })
  }

  updateDisplayedArticle = (displayedArticle) => {
    this.setState({
      displayedArticle: displayedArticle,
    });
  }

  componentDidMount() {
    this.loadFromServer();
  }

  render() {

    return (
      <Container className="mainContainer" maxWidth="lg">
        <Header />
        <Article key="displayedArticle" article={this.state.displayedArticle} />
        <ArticleCardGrid recentArticles={this.state.beautyArticles} displayedArticleHandler={this.updateDisplayedArticle} />
        <Footer />
      </Container>
    );
  }
}

export default BeautyPage;