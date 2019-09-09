import React from 'react';
import axios from 'axios';

import { Container, Grid, MenuItem, Button, TextField, Typography } from '@material-ui/core';

import Header from '../header/Header.jsx'
import Footer from '../footer/Footer.jsx'

import '../../assets/css/components/article/createArticle.css'

const when = require('when');
const API_URL = '/api';

const categories = [
	{
		value: 'BEAUTY',
	},
	{
		value: 'FASHION',
	},
	{
		value: 'TRAVEL',
	},
	{
		value: 'LIFESTYLE',
	},
];

class EditArticle extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			articleData: this.props.location.state.article,
			title: this.props.location.state.article.title,
			subtitle: this.props.location.state.article.subtitle,
			category: this.props.location.state.article.category,
			body: "",
			mainCardImage: [],
			files: [],
			paragraphs: []

		}
	}

	componentDidMount() {
		this.loadFromServer()
	}

	loadFromServer = () => {
		this.getFilesAndParagraphs()
	};

	getFilesAndParagraphs = () => {

		axios.get(this.state.articleData._links.files.href)
			.then(result => {
				return result.data._embedded.articleFiles.map(file =>
					axios.get(file._links.self.href)
				)
			}).then(filePromises => {
				return when.all(filePromises)
			}).then(files => {

				axios.get(this.state.articleData._links.paragraphs.href)
					.then(result => {
						return result.data._embedded.articleParagraphs.map(paragraph =>
							axios.get(paragraph._links.self.href)
						)
					}).then(paragraphPromises => {
						return when.all(paragraphPromises)
					}).then(paragraphs => {

						paragraphs.map(paragraph => {
							return this.setState({ body: this.state.body + paragraph.data.content + "\n\n" })
						})

						this.setState({
							files: files,
							paragraphs: paragraphs,
						})
					})
			})
	}

	onEdit(editedArticleId, editedArticle) {

		axios.put(
			`${API_URL}/articles/edit/${editedArticleId}`,
			editedArticle,
			{ headers: { 'Content-Type': 'multipart/form-data' } }
		).then(response => {
			alert("Article successfully edited !")
		}).catch(exc => {
			alert("Failed editing article")
		})
	}

	handleSubmit = (e) => {
		e.preventDefault();
		if (window.confirm('Are you sure you wish to edit article?')) {
			const editedArticle = new FormData();
			editedArticle.append("title", this.state.title);
			editedArticle.append("subtitle", this.state.subtitle);
			editedArticle.append("category", this.state.category);
			editedArticle.append("body", this.state.body);
			editedArticle.append("mainCardImage", this.state.mainCardImage);
			this.onEdit(this.state.articleData._links.self.href.split("/").pop(), editedArticle);
		}
	}

	handleChange = event => {
		this.setState(
			{
				[event.target.name]
					: event.target.value
			}
		)
	}

	handleFileChange = event => {
		this.setState(
			{
				[event.target.name]
					: event.target.files[0]
			}
		)
	}

	render() {

		console.log(this.state)

		const mainImg = this.state.files.filter(file => file.data.fileName.includes("main")).map(file => {
			return <img key={file.data.fileName} className="img" src={`data:${file.data.fileType};base64,${file.data.data}`} width="700px" alt="article" />
		}
		);

		return (
			<div>
				<Header />
				<Container>
					<Grid container spacing={2}>
						<Grid item md={6}>
							{mainImg}
						</Grid>
						<Grid item md={6}>
							<Typography>Current Main Card Image</Typography>
						</Grid>
						<Grid container item>
							<form id="articleEditionForm" onSubmit={this.handleSubmit}>
								<Grid item container spacing={2}>

									<Grid item md={4}>
										<TextField
											id="title"
											label="Article Title"
											className="textField"
											name="title"
											value={this.state.title}
											variant="outlined"
											required
											onChange={this.handleChange}
										/>
									</Grid>
									<Grid item md={4}>
										<TextField
											id="subtitle"
											label="Article Subtitle"
											className="textField"
											name="subtitle"
											value={this.state.subtitle}
											variant="outlined"
											required
											onChange={this.handleChange}
										/>
									</Grid>
									<Grid item md={4}>
										<TextField
											id="category"
											label="Article Category"
											className="textField"
											name="category"
											variant="outlined"
											required
											select
											value={this.state.category}
											onChange={this.handleChange}
										>
											{categories.map(option => (
												<MenuItem key={option.value} value={option.value}>
													{option.value}
												</MenuItem>
											))}</TextField>
									</Grid>
									<Grid item md={12}>
										<TextField
											id="body"
											label="Article Body"
											multiline
											rows="25"
											className="textField"
											margin="normal"
											name="body"
											value={this.state.body}
											variant="outlined"
											required
											onChange={this.handleChange}
										/>
									</Grid>
									<Grid item md={12}>
										<TextField
											id="mainCardImage"
											className="textField"
											margin="normal"
											type="file"
											name="mainCardImage"
											variant="outlined"
											onChange={this.handleFileChange}
										/>
									</Grid>
									<Grid item md={6}>
										<Button
											type="submit"
											variant="contained"
											color="secondary"
											className="submit"
										>
											Submit
            					</Button>
									</Grid>
								</Grid>
							</form>
						</Grid>

					</Grid>

				</Container>
				<Footer />
			</div>
		)
	}

}


export default EditArticle;