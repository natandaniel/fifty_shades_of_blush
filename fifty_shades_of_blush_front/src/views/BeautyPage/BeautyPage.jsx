import React from 'react';
import { CookiesProvider } from 'react-cookie';

import ArticleCardGrid from '../../components/article/ArticleCardGrid.jsx';
import Article from '../../components/article/Article.jsx';

const when = require('when');
const client = require('../../components/rest/client');
const follow = require('../../components/rest/follow');
const root = 'http://localhost:8080/api';

class BeautyPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { beautyArticles: [], displayedArticleKey: "", displayedArticle: [], displayedArticleParagraphs: [] };
    this.getBeautyArticles = this.getBeautyArticles.bind(this);
    this.getLatestBeautyArticleWithParagraphs = this.getLatestBeautyArticleWithParagraphs.bind(this);
    this.updateDisplayedArticle = this.updateDisplayedArticle.bind(this);
  }

  loadFromServer() {

    follow(client, root, [
      { rel: 'articles', params: {} }]
    ).then(articleCollection => {

      this.setState({
        displayedArticleKey: articleCollection.entity._links.latestBeauty.href
      });

      this.getBeautyArticles(articleCollection.entity._links.beauty.href);
      this.getLatestBeautyArticleWithParagraphs(articleCollection.entity._links.latestBeauty.href);
    });
  }

  getBeautyArticles(beautyUri) {
    client({
      method: 'GET',
      path: beautyUri
    }).then(beautyArticleCollection => {
      return beautyArticleCollection.entity._embedded.articleResources.map(beautyArticle =>
        client({
          method: 'GET',
          path: beautyArticle._links.self.href
        })
      );
    }).then(beautyArticlePromises => {
      return when.all(beautyArticlePromises);
    }).done(beautyArticles => {
      this.setState({
        beautyArticles: beautyArticles
      });
    })
  }

  getLatestBeautyArticleWithParagraphs(latestBeautyUri) {
    client({
      method: 'GET',
      path: latestBeautyUri
    }).then(latestBeautyArticleCollection => {
      return latestBeautyArticleCollection.entity._embedded.articleResources.map(beautyArticle =>
        client({
          method: 'GET',
          path: beautyArticle._links.self.href
        })
      );
    }).then(latestBeautyArticlePromise => {
      return when.all(latestBeautyArticlePromise);
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
        <Article key={this.state.displayedArticleKey} article={this.state.displayedArticle} articleParagraphs={this.state.displayedArticleParagraphs} />
        <ArticleCardGrid recentArticles={this.state.beautyArticles.slice(1)} displayedArticleHandler={this.updateDisplayedArticle} />
      </CookiesProvider >
    );
  }
}

export default BeautyPage;