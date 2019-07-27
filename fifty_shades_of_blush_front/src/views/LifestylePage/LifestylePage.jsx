import React from 'react';
import { CookiesProvider } from 'react-cookie';

import ArticleCardGrid from '../../components/article/ArticleCardGrid.jsx';
import Article from '../../components/article/Article.jsx';

const when = require('when');
const client = require('../../components/rest/client');
const follow = require('../../components/rest/follow');
const root = 'http://localhost:8080/api';

class LifestylePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { lifestyleArticles: [], latestLifestyleArticleKey: "", latestLifestyleArticle: [], latestLifestyleArticleParagraphs: [] };
  }

  loadFromServer() {

    follow(client, root, [
      { rel: 'articles', params: {} }]
    ).then(articleCollection => {

      this.setState({
        latestLifestyleArticleKey: articleCollection.entity._links.latestLifestyle.href
      });

      client({
        method: 'GET',
        path: articleCollection.entity._links.lifestyle.href
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

      client({
        method: 'GET',
        path: articleCollection.entity._links.latestLifestyle.href
      }).then(latestLifestyleArticleCollection => {
        return latestLifestyleArticleCollection.entity._embedded.articleResources.map(lifestyleArticle =>
          client({
            method: 'GET',
            path: lifestyleArticle._links.self.href
          })
        );
      }).then(latestLifestyleArticlePromise => {
        return when.all(latestLifestyleArticlePromise);
      }).done(latestLifestyleArticle => {

        this.setState({
          latestLifestyleArticle: latestLifestyleArticle
        });

        this.state.latestLifestyleArticle.map(latestLifestyleArticle =>

          client({
            method: 'GET',
            path: latestLifestyleArticle.entity._links.paragraphs.href
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
              latestLifestyleArticleParagraphs: paragraphs
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
        <Article key={this.state.latestLifestyleArticleKey} article={this.state.latestLifestyleArticle} articleParagraphs={this.state.latestLifestyleArticleParagraphs} />
        <ArticleCardGrid recentArticles={this.state.lifestyleArticles.slice(1)} />
      </CookiesProvider >
    );
  }
}

export default LifestylePage;