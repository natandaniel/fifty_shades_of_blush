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
    this.state = { fashionArticles: [], latestFashionArticleKey: "", latestFashionArticle: [], latestFashionArticleParagraphs: []};
  }

  loadFromServer() {

    follow(client, root, [
      { rel: 'articles', params: {} }]
    ).then(articleCollection => {

      this.setState({
        latestFashionArticleKey: articleCollection.entity._links.latestFashion.href
      });

      client({
        method: 'GET',
        path: articleCollection.entity._links.fashion.href
      }).then(beautyArticleCollection => {
        return beautyArticleCollection.entity._embedded.articleResources.map(beautyArticle =>
          client({
            method: 'GET',
            path: beautyArticle._links.self.href
          })
        );
      }).then(fashionArticlePromises => {
        return when.all(fashionArticlePromises);
      }).done(fashionArticles => {
        this.setState({
          fashionArticles: fashionArticles
        });
      })

      client({
        method: 'GET',
        path: articleCollection.entity._links.latestFashion.href
      }).then(latestFashionArticleCollection => {
        return latestFashionArticleCollection.entity._embedded.articleResources.map(fashionArticle =>
          client({
            method: 'GET',
            path: fashionArticle._links.self.href
          })
        );
      }).then(latestFashionArticlePromise => {
        return when.all(latestFashionArticlePromise);
      }).done(latestFashionArticle => {

        this.setState({
          latestFashionArticle: latestFashionArticle
        });

        this.state.latestFashionArticle.map(latestFashionArticle =>

          client({
            method: 'GET',
            path: latestFashionArticle.entity._links.paragraphs.href
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
              latestFashionArticleParagraphs: paragraphs
            });
          }));;
      })



    });
  }

  componentDidMount() {
    this.loadFromServer();
  }

  render() {

    return (
      <CookiesProvider>
        <Article key={this.state.latestFashionArticleKey} article={this.state.latestFashionArticle} articleParagraphs={this.state.latestFashionArticleParagraphs} />
        <ArticleCardGrid recentArticles={this.state.fashionArticles.slice(1)} />
      </CookiesProvider >
    );
  }
}

export default FashionPage;