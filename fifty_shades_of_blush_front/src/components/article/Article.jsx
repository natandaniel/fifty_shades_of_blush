import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import '../../assets/css/components/article/article.css';

class Article extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {


    const paragraph = this.props.articleParagraphs.map(paragraph =>
      <div>
        <Typography key={paragraph.entity._links.self.href}>{paragraph.entity.content}</Typography>
        <br />
      </div>
    );

    const latest = this.props.article.map(article =>
      <div key={article.entity._links.self.href}>
        <Paper className="root">
          <Grid container spacing={2}>
            <Grid item md={5} xs={12}>
              <div className="articleInfo">
                <Typography variant="h5" component="h2">
                  {article.entity.title}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary" component="p">
                  {article.entity.subtitle}
                </Typography>
                <Typography component="h6">{new Intl.DateTimeFormat('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: '2-digit'
                }).format(new Date(article.entity.createdAt))}</Typography>
              </div>
            </Grid>
            <Grid item md={7} xs={12}>
              <div className="imgHolder">
                <img className="img" src={require(`../../assets/img/${article.entity.imgName}.jpg`)} width="55%" alt="article" />
              </div>
            </Grid>
            <Grid item >
              <div className="article">
                {paragraph}
              </div>
            </Grid>
          </Grid>
        </Paper>
      </div>);

    return (
      <div>
        {latest}
      </div>
    );
  }
}

export default Article;