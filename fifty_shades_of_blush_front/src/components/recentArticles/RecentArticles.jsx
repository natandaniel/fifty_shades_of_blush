import React from 'react';
import Grid from '@material-ui/core/Grid';
import RecentArticle from './RecentArticle.jsx';

class RecentArticles extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const recentArticles = this.props.recentArticles.map(article =>
            <Grid item xs={6} key={article.entity._links.self.href}>
                <RecentArticle article={article} />
            </Grid>);

        return (
            <Grid container spacing={2}>
                {recentArticles}
            </Grid>
        );
    }

}

export default RecentArticles;