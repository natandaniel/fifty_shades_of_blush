import React from 'react';
import { CookiesProvider } from 'react-cookie';

import ArticleCardGrid from '../../components/article/ArticleCardGrid.jsx';
import Article from '../../components/article/Article.jsx';

const when = require('when');
const client = require('../../components/rest/client');
const follow = require('../../components/rest/follow');
const root = 'http://localhost:8080/api';

class FashionPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { fashionArticles: [], displayedArticleKey: "", displayedArticle: [], displayedArticleParagraphs: []};
    this.getFashionArticles = this.getFashionArticles.bind(this);
    this.getLatestFashionArticleWithParagraphs = this.getLatestFashionArticleWithParagraphs.bind(this);
    this.updateDisplayedArticle = this.updateDisplayedArticle.bind(this);
  }

  loadFromServer() {

    follow(client, root, [
      { rel: 'articles', params: {} }]
    ).then(articleCollection => {

      this.setState({
        displayedArticleKey: articleCollection.entity._links.latestFashion.href
      });

      this.getFashionArticles(articleCollection.entity._links.fashion.href);
      this.getLatestFashionArticleWithParagraphs(articleCollection.entity._links.latestFashion.href);
    });
  }

  getFashionArticles(fashionUri) {
    client({
      method: 'GET',
      path: fashionUri
    }).then(fashionArticleCollection => {
      return fashionArticleCollection.entity._embedded.articleResources.map(fashionArticle =>
        client({
          method: 'GET',
          path: fashionArticle._links.self.href
        })
      );
    }).then(fashionArticlePromises => {
      return when.all(fashionArticlePromises);
    }).done(fashionArticles => {
      this.setState({
        fashionArticles: fashionArticles
      });
    })
  }

  getLatestFashionArticleWithParagraphs(latestFashionUri) {
    client({
      method: 'GET',
      path: latestFashionUri
    }).then(latestFashionArticleCollection => {
      return latestFashionArticleCollection.entity._embedded.articleResources.map(fashionArticle =>
        client({
          method: 'GET',
          path: fashionArticle._links.self.href
        })
      );
    }).then(latestFashionArticlePromise => {
      return when.all(latestFashionArticlePromise);
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
        <Article id="displayedArticle" key={this.state.displayedArticleKey} article={this.state.displayedArticle} articleParagraphs={this.state.displayedArticleParagraphs} />
        <ArticleCardGrid recentArticles={this.state.fashionArticles} displayedArticleHandler={this.updateDisplayedArticle}/>
      </CookiesProvider >
    );
  }
}

export default FashionPage;