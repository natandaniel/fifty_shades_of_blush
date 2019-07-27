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
    this.state = { beautyArticles: [], latestBeautyArticleKey: "", latestBeautyArticle: [], latestBeautyArticleParagraphs: []};
  }

  loadFromServer() {

    follow(client, root, [
      { rel: 'articles', params: {} }]
    ).then(articleCollection => {

      this.setState({
        latestBeautyArticleKey: articleCollection.entity._links.latestBeauty.href
      });

      client({
        method: 'GET',
        path: articleCollection.entity._links.beauty.href
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

      client({
        method: 'GET',
        path: articleCollection.entity._links.latestBeauty.href
      }).then(latestBeautyArticleCollection => {
        return latestBeautyArticleCollection.entity._embedded.articleResources.map(beautyArticle =>
          client({
            method: 'GET',
            path: beautyArticle._links.self.href
          })
        );
      }).then(latestBeautyArticlePromise => {
        return when.all(latestBeautyArticlePromise);
      }).done(latestBeautyArticle => {

        this.setState({
          latestBeautyArticle: latestBeautyArticle
        });

        this.state.latestBeautyArticle.map(latestBeautyArticle =>

          client({
            method: 'GET',
            path: latestBeautyArticle.entity._links.paragraphs.href
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
              latestBeautyArticleParagraphs: paragraphs
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
        <Article key={this.state.latestBeautyArticleKey} article={this.state.latestBeautyArticle} articleParagraphs={this.state.latestBeautyArticleParagraphs} />
        <ArticleCardGrid recentArticles={this.state.beautyArticles} />
      </CookiesProvider >
    );
  }
}

export default BeautyPage;