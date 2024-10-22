import React from 'react';
import axios from 'axios';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import '../../assets/css/components/article/article.css';

const when = require('when');
const API_URL = '/api';

class Article extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      paragraphs: [],
      fileMetadata: []
    }
  }

  loadFromServer = () => {
    this.getFilesAndParagraphs()
  };

  getFilesAndParagraphs = () => {
    console.log("getting")
    this.props.article.map(article => {
      return axios.get(article.data._links.files.href)
        .then(result => {
          return result.data._embedded.articleFiles.map(file =>
            axios.get(file._links.self.href)
          )
        }).then(filePromises => {
          return when.all(filePromises)
        }).then(fileMetadata => {

          axios.get(article.data._links.paragraphs.href)
            .then(result => {
              return result.data._embedded.articleParagraphs.map(paragraph =>
                axios.get(paragraph._links.self.href)
              )
            }).then(paragraphPromises => {
              return when.all(paragraphPromises)
            }).then(paragraphs => {
              this.setState({
                fileMetadata: fileMetadata,
                paragraphs: paragraphs
              })
            })
        })
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.article !== this.props.article) {
      this.loadFromServer()
    }
  }

  render() {
    const paragraphs = this.state.paragraphs.map(paragraph => {
      return <div key={paragraph.config.url}>
        <Typography>{paragraph.data.content}</Typography>
        <br />
      </div>
    }
    );

    const mainImg = this.state.fileMetadata.filter(file => file.data.fileName.includes("main")).map(file => {
      return <img key={file.data.fileName} className="img" src={`${API_URL}/articles/downloadFile/${file.data.fileName}`} width="55%" alt="article" />
    }
    );

    const display = this.props.article.map(article => {
      let dates = <div />

      if (article.data.createdAt === article.data.updatedAt) {
        dates =
          <div>
            <Typography component="h6">{new Intl.DateTimeFormat('en-US', {
              year: 'numeric',
              month: 'long',
              day: '2-digit'
            }).format(new Date(article.data.createdAt))}</Typography></div>
      } else {
        dates = <div><Typography component="h6">{new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'long',
          day: '2-digit'
        }).format(new Date(article.data.createdAt))}</Typography>
          <Typography component="h6">Last modified {new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: '2-digit'
          }).format(new Date(article.data.updatedAt))}</Typography></div>
      }

      return <div key={article.data._links.self.href}>
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
                {dates}
              </div>
            </Grid>
            <Grid item md={7} xs={12}>
              <div className="imgHolder">
                {mainImg}
              </div>
            </Grid>
            <Grid item >
              <div className="article">
                {paragraphs}
              </div>
            </Grid>
          </Grid>
        </Paper>
      </div>
    });

    return (
      <div>
        {display}
      </div >
    );
  }
}

export default Article;