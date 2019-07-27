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
    this.state = { travelArticles: [], displayedArticleKey: "", displayedArticle: [], displayedArticleParagraphs: []};
    this.getTravelArticles = this.getTravelArticles.bind(this);
    this.getLatestTravelArticleWithParagraphs = this.getLatestTravelArticleWithParagraphs.bind(this);
    this.updateDisplayedArticle = this.updateDisplayedArticle.bind(this);
  }

  loadFromServer() {

    follow(client, root, [
      { rel: 'articles', params: {} }]
    ).then(articleCollection => {

      this.setState({
        displayedArticleKey: articleCollection.entity._links.latestTravel.href
      });

      this.getTravelArticles(articleCollection.entity._links.travel.href);
      this.getLatestTravelArticleWithParagraphs(articleCollection.entity._links.latestTravel.href)
    });
  }

  getTravelArticles(travelArticlesUri) {
    client({
      method: 'GET',
      path: travelArticlesUri
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
  }

  getLatestTravelArticleWithParagraphs(latestTravelArticleUri) {
    client({
      method: 'GET',
      path: latestTravelArticleUri
    }).then(latestTravelArticleCollection => {
      return latestTravelArticleCollection.entity._embedded.articleResources.map(travelArticle =>
        client({
          method: 'GET',
          path: travelArticle._links.self.href
        })
      );
    }).then(latestTravelArticlePromise => {
      return when.all(latestTravelArticlePromise);
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
        <ArticleCardGrid recentArticles={this.state.travelArticles} displayedArticleHandler={this.updateDisplayedArticle}/>
      </CookiesProvider >
    );
  }
}

export default TravelPage;