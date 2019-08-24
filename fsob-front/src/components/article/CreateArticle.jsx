import React from 'react';
import axios from 'axios';

import { Container, Grid, MenuItem, Button, TextField } from '@material-ui/core';

import Header from '../../components/header/Header.jsx'
import Footer from '../../components/footer/Footer.jsx'

import '../../assets/css/components/article/createArticle.css'

const API_URL = 'http://localhost:8080/api';

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

class CreateArticle extends React.Component {

	constructor(props) {
		super(props);
		this.state = { title: "", subtitle: "", category: "", body: "", mainCardImage: []}
	}

	onCreate(newArticle) {

		axios.post(
			`${API_URL}/articles/create`,
			newArticle,
			{ headers: { 'Content-Type': 'multipart/form-data' } }
		).then(response => {
			document.getElementById("articleCreationForm").reset()
		})
			.catch(exc => {
				alert(exc.message)
			})
	}

	handleSubmit = (e) => {
		e.preventDefault();
		if(window.confirm('Are you sure you wish to submit article?')){
			const newArticle = new FormData();
			newArticle.append("title", this.state.title);
			newArticle.append("subtitle", this.state.subtitle);
			newArticle.append("category", this.state.category);
			newArticle.append("body", this.state.body);
			newArticle.append("mainCardImage", this.state.mainCardImage);
			this.onCreate(newArticle);
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

		return (
			<div>
				<Header />
				<Container>
					<form id="articleCreationForm" onSubmit={this.handleSubmit}>
						<Grid container spacing={2}>

							<Grid item md={4}>
								<TextField
									id="title"
									label="Article Title"
									className="textField"
									name="title"
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
									rows="10"
									className="textField"
									margin="normal"
									name="body"
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
				</Container>
				<Footer />
			</div>
		)
	}

}


export default CreateArticle;