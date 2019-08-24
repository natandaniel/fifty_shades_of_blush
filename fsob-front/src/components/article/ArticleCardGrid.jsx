import React from 'react';
import Grid from '@material-ui/core/Grid';
import ArticleCard from './ArticleCard.jsx';

class ArticleCardGrid extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const recentArticles = this.props.recentArticles.map(article =>
            <Grid item md={6} xs={12} key={article.config.url}>
                <ArticleCard article={article} displayedArticleHandler={this.props.displayedArticleHandler} refreshPage={this.props.refreshPage}/>
            </Grid>);

        return (
            <Grid container spacing={2}>
                {recentArticles}
            </Grid>
        );
    }

}

export default ArticleCardGrid;