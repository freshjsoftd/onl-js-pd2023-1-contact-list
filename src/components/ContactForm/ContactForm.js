import React, { Component } from 'react';
import './ContactForm.css';

export class ContactForm extends Component {

	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		...props.contactForEdit,
	// 	};
	// }

  state = {
    		...this.props.contactForEdit,
    	};

	createEmptyContact() {
		return {
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
		};
	}

	onInputChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

  onClearField = (e) => {
    const sibling = e.target.parentNode.firstChild;
    this.setState({
      [sibling.name]: '',
    })
  }

	onFormSubmit = (e) => {
		e.preventDefault();
		this.props.onSubmit({
			...this.state,
		});
		/* this.setState({
			...this.createEmptyContact(),
		}); */
	};

	onContactDelete = () => {
		this.props.onDelete(this.props.contactForEdit.id);
		this.setState({
			...this.createEmptyContact(),
		});
	};

	render() {
		return (
			<form id='contact-form' onSubmit={this.onFormSubmit}>
				<div className='form-container'>
					<div className='contact-info'>
						<input
							type='text'
							className='text-field'
							placeholder='First name'
							name='firstName'
							value={this.state.firstName}
							onChange={this.onInputChange}
						/>
						<span className='clear' onClick={this.onClearField}>X</span>
					</div>
					<div className='contact-info'>
						<input
							type='text'
							className='text-field'
							name='lastName'
							placeholder='Last name'
							value={this.state.lastName}
							onChange={this.onInputChange}
						/>
						<span className='clear' onClick={this.onClearField}>X</span>
					</div>
					<div className='contact-info'>
						<input
							type='text'
							className='text-field'
							name='email'
							placeholder='Email'
							value={this.state.email}
							onChange={this.onInputChange}
						/>
						<span className='clear' onClick={this.onClearField}>X</span>
					</div>
					<div className='contact-info'>
						<input
							type='text'
							className='text-field'
							name='phone'
							placeholder='Phone'
							value={this.state.phone}
							onChange={this.onInputChange}
						/>
						<span className='clear' onClick={this.onClearField}>X</span>
					</div>
				</div>
				<div className='btns'>
					<button id='save' type='submit'>
						Save
					</button>
					{this.state.id ? (
						<button
							id='delete'
							type='button'
							onClick={this.onContactDelete}>
							Delete
						</button>
					) : (
						''
					)}
				</div>
			</form>
		);
	}
}

export default ContactForm;
