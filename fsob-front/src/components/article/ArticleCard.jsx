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
    this.state = {
      files: []
    }
  }

  displayArticle(articleUri) {
    axios.get(articleUri).then(article => {
      this.props.displayedArticleHandler([article]);
      scrollIt(
        document.querySelector('.articleInfo'),
        1000,
        'easeOutQuad',
        () => console.log(`Just finished scrolling to ${window.pageYOffset}px`)
      );
    })
  }


  loadFromServer(){
    this.getFiles()
  };

  getFiles(){
    axios.get(this.props.article.data._links.files.href)
      .then(result => {
        return result.data._embedded.articleFiles.map(file =>
          axios.get(file._links.self.href)
        )
      }).then(filePromises => {
        return when.all(filePromises)
      }).then(files => {
        this.setState({
          files: files,
          updateState: false
        })
      })
  }

  componentDidMount() {
    this.loadFromServer()
  }

  render() {
    const mainImg = this.state.files.filter(file => file.data.fileName.includes("main")).map(file => {
      return `data:${file.data.fileType};base64,${file.data.data}`
    }
    );

    console.log(this.state.files)

    return (
      <Card className="card" key={this.props.article.data._links.self.href}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={this.props.article.data.type}
            max-height="200px"
            image={mainImg[0]}
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
            <Button size="small" color="primary">
            Edit
            </Button>
            <Button size="small" color="secondary">
            Delete
            </Button>
        </CardActions>
      </Card>
    );
  }

}

export default ArticleCard;