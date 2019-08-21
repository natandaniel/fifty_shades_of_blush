import React from 'react';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import '../../assets/css/components/article/articleCard.css';
import { scrollIt } from '../../tools/scrolling/scrollIt';

const when = require('when');

class ArticleCard extends React.Component {

  constructor(props) {
    super(props);
    this.displayArticle = this.displayArticle.bind(this);
  }

  displayArticle(articleUri) {
    axios.get(articleUri).then(article => {
      axios.get(article.data._links.paragraphs.href).then(paragraphs => {
        console.log(paragraphs)
        return paragraphs.data._embedded.articleContents.map(paragraph =>
          axios.get(paragraph._links.self.href)
        );
      }).then(articleContentPromises => {
        return when.all(articleContentPromises);
      }).then(paragraphs => {
        this.props.displayedArticleHandler(articleUri, [article], paragraphs);
        scrollIt(
          document.querySelector('.articleInfo'),
          1000,
          'easeOutQuad',
          () => console.log(`Just finished scrolling to ${window.pageYOffset}px`)
        );
      })
    })
  }

  render() {
    return (
      <Card className="card" key={this.props.article.data._links.self.href}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={this.props.article.data.type}
            max-height="200px"
            // image={require(`../../assets/img/${this.props.article.data.imgName}.jpg`)}
            title={this.props.article.data.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {this.props.article.data.title}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary" component="p">
              {this.props.article.data.subtitle}
            </Typography>
            <Typography component="h6">{new Intl.DateTimeFormat('en-US', {
              year: 'numeric',
              month: 'long',
              day: '2-digit'
            }).format(new Date(this.props.article.data.createdAt))}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={() => this.displayArticle(this.props.article.config.url)}>
            Read
            </Button>
        </CardActions>
      </Card>
    );
  }

}

export default ArticleCard;