import React from 'react';
import ReactDOM from 'react-dom';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
		this.state = {}
	}

	onCreate(newArticle) {

		follow(client, root, ['articles']).done(response => {
			client({
				method: 'POST',
				path: response.entity._links.self.href,
				entity: newArticle,
				headers: { 'Content-Type': 'application/json', 'X-XSRF-TOKEN': this.state.csrfToken, 'Authorization': 'natandaniel:1565132107267:f8efa9db74214a4423494df4facf2bec' }
			})
		})
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const newArticle = {};
		this.props.attributes.forEach(attribute => {
			newArticle[attribute] = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
		});
		this.onCreate(newArticle);

		this.props.attributes.forEach(attribute => {
			ReactDOM.findDOMNode(this.refs[attribute]).value = '';
		});

		window.location = "#";
	}

	render() {

		return (
			<div>

				<form onSubmit={this.handleSubmit}>
					<TextField
						id="title"
						label="Article Title"
						placeholder="Write title here ..."
						className="articleTitle"
						margin="normal"
					/>
					<TextField
						id="subtitle"
						label="Article Subtitle"
						placeholder="Write subtitle here ..."
						className="articleSubtitle"
						margin="normal"
					/>
					<TextField
						id="category"
						select
						className="articleCategory"
						SelectProps={{
							native: true,
						}}
						helperText="Choose article category"
						margin="normal"
					>
						{categories.map(option => (
							<option key={option} value={option}>
								{option}
							</option>
						))}
					</TextField>
					<TextField
						id="standard-textarea"
						label="Article Body"
						placeholder="Write article here ..."
						multiline
						className="articleBody"
						margin="normal"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className="submit"
					>
						Submit
            		</Button>
				</form>

			</div>
		)
	}

}


export default CreateArticle;