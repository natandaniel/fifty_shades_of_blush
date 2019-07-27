import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import '../../assets/css/components/latestArticle.css';

class LatestArticle extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const latest = this.props.latestArticle.map(article =>
      <div key={article.entity._links.self.href}>
        <Paper className="root" key={article.entity._links.self.href}>
          <div className="header">
            <img className="img" src={require(`../../assets/img/${article.entity.imgName}.jpg`)} width="55%" alt="banner" />
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
          </div>
          <div>
            <Typography>{article.entity.body} </Typography>
          </div>

        </Paper></div>);

    return (<div>{latest}</div>);
  }
}

export default LatestArticle;