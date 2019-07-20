import React from 'react';
import Grid from '@material-ui/core/Grid';
import RecentArticle from './RecentArticle.jsx';
import './RecentArticles.css'


class RecentArticles extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const recentArticles = this.props.articles.map(article =>
            <Grid item xs key={article.entity._links.self.href}>
                <RecentArticle article={article} />
            </Grid>);

        return (
            <div className="root">
                <Grid container spacing={3}>
                    {recentArticles}
                </Grid>
            </div>
        );
    }

}

export default RecentArticles;