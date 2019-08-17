import React from 'react';
import axios from 'axios';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Typography, Paper } from '@material-ui/core';

import '../../assets/css/components/article/createArticle.css'

const API_URL = 'http://localhost:8080/api';


class CreateArticle extends React.Component {

	constructor(props) {
		super(props);
		this.state = { title: "", subtitle: "", category: "", body: "", image: "" }
	}

	onCreate(newArticle) {

		axios.post(`${API_URL}/articles/create`, {
            newArticle
        })
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const newArticle = { "title": this.state.title, "subtitle": this.state.subtitle, "category": this.state.category, "body": this.state.body, "image": this.state.image };
		this.onCreate(newArticle);
	}

	handleChange = event => {
		this.setState(
		  {
			[event.target.name]
			  : event.target.value
		  }
		)
	  }

	render() {
		return (
			<div>
				<Paper className="root">
					<Typography component="h1" variant="h5">
						Write new article
         		</Typography>
					<form onSubmit={this.handleSubmit}>
						<TextField
							id="title"
							label="Article Title"
							placeholder="Write title here ..."
							className="textField"
							margin="normal"
							onChange={this.handleChange}
						/>
						<TextField
							id="subtitle"
							label="Article Subtitle"
							placeholder="Write subtitle here ..."
							className="textField"
							margin="normal"
							onChange={this.handleChange}
						/>
						<TextField
							id="category"
							className="articleCategory"
							placeholder="BEAUTY, FASHION, TRAVEL or LIFESTYLE..."
							className="textField"
							margin="normal"
							onChange={this.handleChange}
						/>
						<TextField
							id="body"
							label="Article Body"
							placeholder="Write article here ..."
							multiline
							className="textField"
							margin="normal"
							onChange={this.handleChange}
						/>
						<TextField
							id="image"
							className="textField"
							type="file"
							accept="image/*"
							margin="normal"
							onChange={this.handleChange}
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
			</div>
		)
	}

}


export default CreateArticle;