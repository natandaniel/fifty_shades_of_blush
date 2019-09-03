import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import '../../assets/css/components/article/articleCard.css';
import { scrollIt } from '../../tools/scrolling/scrollIt';

const API_URL = 'http://localhost:8080/api';
const when = require('when');

class ArticleCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      article: this.props.article,
      files: [],
      reload: true
    }
  }

  displayArticle= articleUri => {
    axios.get(articleUri).then(article => {
      console.log(article)
      this.props.displayedArticleHandler([article]);
      scrollIt(
        document.querySelector('.articleInfo'),
        1000,
        'easeOutQuad',
        () => console.log(`Just finished scrolling to ${window.pageYOffset}px`)
      );
    })
  }


  loadFromServer() {
    this.getFiles()
  };

  getFiles() {
    axios.get(this.state.article.data._links.files.href)
      .then(result => {
        return result.data._embedded.articleFiles.map(file =>
          axios.get(file._links.self.href)
        )
      }).then(filePromises => {
        return when.all(filePromises)
      }).then(files => {
        this.setState({
          files: files,
        })
      })
  }

  componentDidMount() {
    this.loadFromServer()
  }

  handleDelete = () => {
    if (window.confirm('Are you sure you wish to delete article?')) {
      const articleId = this.state.article.data._links.self.href.split("/").pop();

      axios.delete(
        `${API_URL}/articles/delete/${articleId}`
      ).then(() => {
        this.props.refreshPage()
      }).catch(exc => {
        alert(exc.message)
      })


    }
  }

  handleEdit = () => {
    if (window.confirm('Are you sure you wish to edit this article?')) {
      this.props.history.push({
        pathname: "/admin/edit",
        state: {article: this.state.article.data}
      });
    }
  }

  render() {

    let editButton = <div />
    let deleteButton = <div />

    if (sessionStorage.getItem('isAuth') === 'true') {
      editButton = <Button size="small" color="primary" onClick={this.handleEdit}>Edit</Button>
      deleteButton = <Button size="small" color="secondary" onClick={this.handleDelete}>Delete</Button>
    }

    const mainImg = this.state.files.filter(file => file.data.fileName.includes("main")).map(file => {
      return `data:${file.data.fileType};base64,${file.data.data}`
    }
    );

    return (

      <Card className="card" key={this.state.article.data._links.self.href}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={this.state.article.data.type}
            max-height="200px"
            image={mainImg[0]}
            title={this.state.article.data.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {this.state.article.data.title}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary" component="p">
              {this.state.article.data.subtitle}
            </Typography>
            <Typography component="h6">{new Intl.DateTimeFormat('en-US', {
              year: 'numeric',
              month: 'long',
              day: '2-digit'
            }).format(new Date(this.state.article.data.createdAt))}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={() => this.displayArticle(this.state.article.data._links.article.href)}>
            Read
            </Button>
          {editButton}
          {deleteButton}
        </CardActions>
      </Card>
    );
  }

}

export default withRouter(ArticleCard)