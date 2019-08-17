import React from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Typography, Paper } from '@material-ui/core';

import '../../assets/css/components/article/createArticle.css'

const client = require('../../tools/rest/client');
const follow = require('../../tools/rest/follow');
const root = 'http://localhost:8080/api';

const categories = [
	'beauty',
	'fashion',
	'travel',
	'lifestyle'
];

class CreateArticle extends React.Component {

	constructor(props) {
		super(props);
		this.state = { title: "", subtitle: "", category: "", body: "", image: "" }
	}

	onCreate(newArticle) {

		follow(client, root, ['articles']).done(response => {
			client({
				method: 'POST',
				path: response.entity._links.create.href,
				entity: newArticle,
				headers: { 'Content-Type': 'application/json', 'Authorization': this.props.authenticatedUser.token }
			}).done(response => console.log(response));
		})
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const newArticle = { "title": this.state.title, "subtitle": this.state.subtitle, "category": this.state.category, "body": this.state.body, "image": this.state.image };
		this.onCreate(newArticle);
	}

	setTitle = event => {
		this.setState({ title: event.target.value });
	};

	setSubtitle = event => {
		this.setState({ subtitle: event.target.value });
	};

	setCategory = event => {
		this.setState({ category: event.target.value });
	};

	setBody = event => {
		this.setState({ body: event.target.value });
	};

	setImage = event => {
		this.setState({ image: event.target.value });
	};

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
							onChange={this.setTitle}
						/>
						<TextField
							id="subtitle"
							label="Article Subtitle"
							placeholder="Write subtitle here ..."
							className="textField"
							margin="normal"
							onChange={this.setSubtitle}
						/>
						<TextField
							id="category"
							className="articleCategory"
							placeholder="BEAUTY, FASHION, TRAVEL or LIFESTYLE..."
							className="textField"
							margin="normal"
							onChange={this.setCategory}
						/>
						<TextField
							id="body"
							label="Article Body"
							placeholder="Write article here ..."
							multiline
							className="textField"
							margin="normal"
							onChange={this.setBody}
						/>
						<TextField
							id="image"
							className="textField"
							type="file"
							accept="image/*"
							margin="normal"
							onChange={this.setImage}
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