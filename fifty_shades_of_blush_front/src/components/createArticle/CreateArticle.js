import React from 'react';
import ReactDOM from 'react-dom';
import { withCookies } from 'react-cookie';
const client = require('../../rest/client');
const follow = require('../../rest/follow');
const root = 'http://localhost:8080/api';

class CreateArticle extends React.Component {

    state = {};

	constructor(props) {
        super(props);
        const {cookies} = props;
        this.state.csrfToken = cookies.get('XSRF-TOKEN');
        console.log(cookies.get('XSRF-TOKEN'));
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onCreate = this.onCreate.bind(this);
    }
    
    onCreate(newArticle) {
    
        follow(client, root, ['articles']).done(response => {
          client({
            method: 'POST',
            path: response.entity._links.self.href,
            entity: newArticle,
            headers: { 'Content-Type': 'application/json', 'X-XSRF-TOKEN': this.state.csrfToken }
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

		// clear out the dialog's inputs
		this.props.attributes.forEach(attribute => {
			ReactDOM.findDOMNode(this.refs[attribute]).value = '';
		});

		// Navigate away from the dialog to hide it.
		window.location = "#";
	}

	render() {

		const inputs = this.props.attributes.map(attribute =>
			<p key={attribute}>
				<input type="text" placeholder={attribute} ref={attribute} className="field"/>
			</p>
		);

		return (
			<div>
				<a href="#createEmployee">Create</a>

				<div id="createEmployee" className="modalDialog">
					<div>
						<a href="#" title="Close" className="close">X</a>

						<h2>Create new aticle</h2>

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


export default withCookies(CreateArticle);