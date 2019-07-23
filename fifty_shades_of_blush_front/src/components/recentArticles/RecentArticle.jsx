import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import '../../assets/css/recentArticle.css';

class RecentArticle extends React.Component {

    constructor(props) {
        super(props);
      }

  render() {

    return (
        <Card className="card" key={this.props.article.entity._links.self.href}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt={this.props.article.entity.type}
              height="280"
              image={require("../../assets/img/header-bg.JPG")}
              title={this.props.article.entity.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
              {this.props.article.entity.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
              {this.props.article.entity.subtitle}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Read more
            </Button>
          </CardActions>
        </Card>
      );
  }

}

export default RecentArticle;