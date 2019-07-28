import React from 'react';
import { CookiesProvider } from 'react-cookie';

import Container from '@material-ui/core/Container';
import Header from '../../components/header/Header.jsx'
import Footer from '../../components/footer/Footer.jsx'
import ArticleCardGrid from '../../components/article/ArticleCardGrid.jsx';
import Article from '../../components/article/Article.jsx';

const when = require('when');
const client = require('../../tools/rest/client');
const follow = require('../../tools/rest/follow');
const root = 'http://localhost:8080/api';

class LifestylePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { lifestyleArticles: [], displayedArticleKey: "", displayedArticle: [], displayedArticleParagraphs: [] };
    this.getLifestyleArticles = this.getLifestyleArticles.bind(this);
    this.getLatestLifestyleArticleWithParagraphs = this.getLatestLifestyleArticleWithParagraphs.bind(this);
    this.updateDisplayedArticle = this.updateDisplayedArticle.bind(this);
  }

  loadFromServer() {

    follow(client, root, [
      { rel: 'articles', params: {} }]
    ).then(articleCollection => {

      this.setState({
        displayedArticleKey: articleCollection.entity._links.latestLifestyle.href
      });

      this.getLifestyleArticles(articleCollection.entity._links.lifestyle.href);
      this.getLatestLifestyleArticleWithParagraphs(articleCollection.entity._links.latestLifestyle.href);
    });
  }

  getLifestyleArticles(lifestyleUri) {
    client({
      method: 'GET',
      path: lifestyleUri
    }).then(lifestyleArticleCollection => {
      return lifestyleArticleCollection.entity._embedded.articleResources.map(lifestyleArticle =>
        client({
          method: 'GET',
          path: lifestyleArticle._links.self.href
        })
      );
    }).then(lifestyleArticlePromises => {
      return when.all(lifestyleArticlePromises);
    }).done(lifestyleArticles => {
      this.setState({
        lifestyleArticles: lifestyleArticles
      });
    })
  }

  getLatestLifestyleArticleWithParagraphs(latestLifestyleUri) {
    client({
      method: 'GET',
      path: latestLifestyleUri
    }).then(latestLifestyleArticleCollection => {
      return latestLifestyleArticleCollection.entity._embedded.articleResources.map(lifestyleArticle =>
        client({
          method: 'GET',
          path: lifestyleArticle._links.self.href
        })
      );
    }).then(latestLifestyleArticlePromise => {
      return when.all(latestLifestyleArticlePromise);
    }).done(displayedArticle => {

      this.setState({
        displayedArticle: displayedArticle
      });

      this.state.displayedArticle.map(displayedArticle =>

        client({
          method: 'GET',
          path: displayedArticle.entity._links.paragraphs.href
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
            displayedArticleParagraphs: paragraphs
          });
        }));;
    })
  }

  updateDisplayedArticle(displayedArticleKey, displayedArticle, displayedArticleParagraphs) {
    this.setState({
      displayedArticleKey: displayedArticleKey,
      displayedArticle: displayedArticle,
      displayedArticleParagraphs: displayedArticleParagraphs
    });
  }

  componentDidMount() {
    this.loadFromServer();
  }

  render() {

    return (
      <CookiesProvider>
        <Container className="mainContainer" maxWidth="lg">
          <Header />
          <Article key={this.state.displayedArticleKey} article={this.state.displayedArticle} articleParagraphs={this.state.displayedArticleParagraphs} />
          <ArticleCardGrid recentArticles={this.state.lifestyleArticles} displayedArticleHandler={this.updateDisplayedArticle} />
          <Footer />
        </Container>
      </CookiesProvider >
    );
  }
}

export default LifestylePage;