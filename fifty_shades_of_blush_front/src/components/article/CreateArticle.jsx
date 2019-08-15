import React from 'react';
import ReactDOM from 'react-dom';
const client = require('../../tools/rest/client');
const follow = require('../../tools/rest/follow');
const root = 'http://localhost:8080/api';

class CreateArticle extends React.Component {

	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onCreate = this.onCreate.bind(this);
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

	handleSubmit(e) {
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

		const inputs = this.props.attributes.map(attribute =>
			<p key={attribute}>
				<input type="text" placeholder={attribute} ref={attribute} className="field" />
			</p>
		);

		return (
			<div>
				<a href="#createArticle">Create</a>

				<div id="createArticle" className="modalDialog">
					<div>
						<a href="#" title="Close" className="close">X</a>

						<h2>Create new article</h2>

						<form>
							{inputs}
							<button onClick={this.handleSubmit}>Create</button>
						</form>
					</div>
				</div>
			</div>
		)
	}

}


export default CreateArticle;