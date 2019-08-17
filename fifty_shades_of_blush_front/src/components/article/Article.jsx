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


    const paragraph = this.props.articleParagraphs.map(paragraph => {
    
      return <div key={paragraph.config.url}>
        <Typography>{paragraph.data.content}</Typography>
        <br />
      </div>
    }
    );

    const display = this.props.article.map(article =>
      <div key={article.data._links.self.href}>
        <Paper className="root">
          <Grid container spacing={2}>
            <Grid item md={5} xs={12}>
              <div className="articleInfo">
                <Typography variant="h5" component="h2">
                  {article.data.title}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary" component="p">
                  {article.data.subtitle}
                </Typography>
                <Typography component="h6">{new Intl.DateTimeFormat('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: '2-digit'
                }).format(new Date(article.data.createdAt))}</Typography>
              </div>
            </Grid>
            <Grid item md={7} xs={12}>
              <div className="imgHolder">
                <img className="img" src={require(`../../assets/img/${article.data.imgName}.jpg`)} width="55%" alt="article" />
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
        {display}
      </div>
    );
  }
}

export default Article;