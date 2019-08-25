import React from 'react';
import axios from 'axios';

import Container from '@material-ui/core/Container';
import Header from '../../components/header/Header.jsx'
import Footer from '../../components/footer/Footer.jsx'
import ArticleCardGrid from '../../components/article/ArticleCardGrid.jsx';
import Article from '../../components/article/Article.jsx';

import ArticlesService from '../../tools/dataProvider/ArticlesService';

const when = require('when');

class BFTLPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      displayedArticle: [],
      refresh: false
    };
  }

  loadFromServer() {
    this.getBFTLArticles()
    this.getLatestBFTLArticle()
  }

  getLatestBFTLArticle() {
    ArticlesService.getLatestBFTLArticleEntity(this.props.page).then(latestArticleEntity => {
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
      this.setState({ displayedArticle: latestArticleArray })
    })
  }

  getBFTLArticles() {
    ArticlesService.getBFTLArticlesEntity(this.props.page).then(bftlArticlesEntity => {
      if (bftlArticlesEntity.data._embedded) {
        return bftlArticlesEntity.data._embedded.articleResources.map(article =>
          axios.get(article._links.self.href)
        )
      } else {
        return []
      }
    }).then(articlePromises => {
      return when.all(articlePromises)
    }).then(bftlArticlesEntityArray => {
      this.setState({
        articles: bftlArticlesEntityArray
      })
    })
  }

  updateDisplayedArticle = (displayedArticle) => {
    this.setState({
      displayedArticle: displayedArticle,
    });
  }

  refreshPage = () => {
    this.loadFromServer();
  }

  componentDidMount() {
    this.loadFromServer();
  }

  render() {

    return (
      <div>
        <Header />
        <Container className="mainContainer" maxWidth="lg">
          <Article key="displayedArticle" article={this.state.displayedArticle} />
          <ArticleCardGrid recentArticles={this.state.articles} displayedArticleHandler={this.updateDisplayedArticle} refreshPage={this.refreshPage}/>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default BFTLPage;