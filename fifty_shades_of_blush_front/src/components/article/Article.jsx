import React from 'react';
import axios from 'axios';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import '../../assets/css/components/article/article.css';

const when = require('when');

class Article extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      paragraphs: [],
      files: [],
      updateState: true
    }
  }

  loadFromServer = () => {
    this.getFilesAndParagraphs()
    console.log(this.state)
  };

  getFilesAndParagraphs = () => {
    this.props.article.map(article => {

      axios.get(article.data._links.files.href)
        .then(result => {
          return result.data._embedded.articleFiles.map(file =>
            axios.get(file._links.self.href)
          )
        }).then(filePromises => {
          return when.all(filePromises)
        }).then(files => {

          axios.get(article.data._links.paragraphs.href)
            .then(result => {
              return result.data._embedded.articleParagraphs.map(paragraph =>
                axios.get(paragraph._links.self.href)
              )
            }).then(paragraphPromises => {
              return when.all(paragraphPromises)
            }).then(paragraphs => {
              this.setState({
                files: files,
                paragraphs: paragraphs,
                updateState: false
              })
            })
        })
    })
  }

  componentDidUpdate() {
    if (this.state.updateState) {
      this.loadFromServer()
    }
  }

  render() {
    console.log(this.state)
    const paragraphs = this.state.paragraphs.map(paragraph => {
      return <div key={paragraph.config.url}>
        <Typography>{paragraph.data.content}</Typography>
        <br />
      </div>
    }
    );

    const mainImg =  this.state.files.filter(file => file.data.fileName.includes("main")).map(file => {
      console.log(`${file.data.fileName}`)
      return <img className="img" src={`data:${file.data.fileType};base64,${file.data.data}`} width="55%" alt="article" />
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
                {/* <img className="img" src={require(`../../assets/img/${article.data.imgName}.jpg`)} width="55%" alt="article" /> */}
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