import React from 'react';
import axios from 'axios';

import { Container, Typography, Paper, Input, Button, TextField } from '@material-ui/core';

import Header from '../../components/header/Header.jsx'
import Footer from '../../components/footer/Footer.jsx'

import '../../assets/css/components/article/createArticle.css'

const API_URL = 'http://localhost:8080/api';


class CreateArticle extends React.Component {

	constructor(props) {
		super(props);
		this.state = { title: "", subtitle: "", category: "", body: "", mainCardImage: [], optImgs: [] }
	}

	onCreate(newArticle) {

		axios.post(
			`${API_URL}/articles/create`,
			newArticle,
			{ headers: { 'Content-Type': 'multipart/form-data' } }
		).then(response => {
			console.log(response)
		})
			.catch(exc => {
				console.log(exc)
			})
	}

	handleSubmit = (e) => {
		e.preventDefault();
		console.log(this.state)
		const newArticle = new FormData();
		newArticle.append("title", this.state.title);
		newArticle.append("subtitle", this.state.subtitle);
		newArticle.append("category", this.state.category);
		newArticle.append("body", this.state.body);
		newArticle.append("mainCardImage", this.state.mainCardImage);
		newArticle.append("optImgs", this.state.optImgs);
		this.onCreate(newArticle);
	}

	handleChange = event => {
		console.log(event.target.name);
		this.setState(
			{
				[event.target.name]
					: event.target.value
			}
		)
	}

	handleFileChange = event => {
		console.log(event.target.name);
		this.setState(
			{
				[event.target.name]
					: event.target.files[0]
			}
		)
	}

	handleFilessChange = event => {
		console.log(event.target.name);
		this.setState(
			{
				[event.target.name]
					: event.target.files
			}
		)
	}

	render() {
		console.log(this.state);
		return (
			<div>
				<Header />
				<Container>
					<Paper className="root">
						<Typography component="h1" variant="h5">
							New article
         		</Typography>
						<form onSubmit={this.handleSubmit}>
							<TextField
								id="title"
								label="Article Title"
								placeholder="Write title here ..."
								className="textField"
								margin="normal"
								name="title"
								onChange={this.handleChange}
							/>
							<TextField
								id="subtitle"
								label="Article Subtitle"
								placeholder="Write subtitle here ..."
								className="textField"
								margin="normal"
								name="subtitle"
								onChange={this.handleChange}
							/>
							<TextField
								id="category"
								className="articleCategory"
								placeholder="Article Category : BEAUTY, FASHION, TRAVEL or LIFESTYLE..."
								className="textField"
								margin="normal"
								name="category"
								onChange={this.handleChange}
							/>
							<TextField
								id="body"
								label="Article Body"
								placeholder="Write article here ..."
								multiline
								className="textField"
								margin="normal"
								name="body"
								onChange={this.handleChange}
							/>
							<TextField
								id="mainCardImage"
								label="Main Card Image"
								placeholder="Main Card Image"
								className="textField"
								margin="normal"
								type="file"
								name="mainCardImage"
								onChange={this.handleFileChange}
							/>
							<Input
								id="optImages"
								label="Optional Images"
								placeholder="Optional Images"
								className="textField"
								margin="normal"
								type="file"
								inputProps={{ multiple: true }}
								name="optImgs"
								onChange={this.handleFilesChange}
							/>
							<Button
								type="submit"
								variant="contained"
								color="secondary"
								className="submit"
							>
								Submit
            		</Button>
						</form>
					</Paper>
				</Container>
				<Footer />
			</div>
		)
	}

}


export default CreateArticle;