import React from 'react';
import { CookiesProvider } from 'react-cookie';

import ArticleCardGrid from '../../components/article/ArticleCardGrid.jsx';
import Article from '../../components/article/Article.jsx';

const when = require('when');
const client = require('../../components/rest/client');
const follow = require('../../components/rest/follow');
const root = 'http://localhost:8080/api';

class TravelPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { travelArticles: [], latestTravelArticleKey: "", latestTravelArticle: [], latestTravelArticleParagraphs: []};
  }

  loadFromServer() {

    follow(client, root, [
      { rel: 'articles', params: {} }]
    ).then(articleCollection => {

      this.setState({
        latestTravelArticleKey: articleCollection.entity._links.latestTravel.href
      });

      client({
        method: 'GET',
        path: articleCollection.entity._links.travel.href
      }).then(travelArticleCollection => {
        return travelArticleCollection.entity._embedded.articleResources.map(travelArticle =>
          client({
            method: 'GET',
            path: travelArticle._links.self.href
          })
        );
      }).then(travelArticlePromises => {
        return when.all(travelArticlePromises);
      }).done(travelArticles => {
        this.setState({
          travelArticles: travelArticles
        });
      })

      client({
        method: 'GET',
        path: articleCollection.entity._links.latestTravel.href
      }).then(latestTravelArticleCollection => {
        return latestTravelArticleCollection.entity._embedded.articleResources.map(travelArticle =>
          client({
            method: 'GET',
            path: travelArticle._links.self.href
          })
        );
      }).then(latestTravelArticlePromise => {
        return when.all(latestTravelArticlePromise);
      }).done(latestTravelArticle => {

        this.setState({
          latestTravelArticle: latestTravelArticle
        });

        this.state.latestTravelArticle.map(latestTravelArticle =>

          client({
            method: 'GET',
            path: latestTravelArticle.entity._links.paragraphs.href
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
              latestTravelArticleParagraphs: paragraphs
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
        <Article key={this.state.latestTravelArticleKey} article={this.state.latestTravelArticle} articleParagraphs={this.state.latestTravelArticleParagraphs} />
        <ArticleCardGrid recentArticles={this.state.travelArticles.slice(1)} />
      </CookiesProvider >
    );
  }
}

export default TravelPage;