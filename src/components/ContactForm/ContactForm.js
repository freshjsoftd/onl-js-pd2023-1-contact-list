import React, { Component } from 'react';
import './ContactForm.css';

export class ContactForm extends Component {
	onInputChange = (e) => {
		const { name, value } = e.target;
		this.props.onChange({
			[name]: value,
		});
	};

	onClearField = (e) => {
		const sibling = e.target.parentNode.firstChild;
		sibling.value = '';
	};

	onFormSubmit = (e) => {
		e.preventDefault();
		this.props.onSubmit({
			...this.props.contactForEdit,
		});
	};

	onContactDelete = () => {
		this.props.onDelete(this.props.contactForEdit.id);
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
							value={this.props.contactForEdit.firstName}
							onChange={this.onInputChange}
						/>
						<span className='clear' onClick={this.onClearField}>
							X
						</span>
					</div>
					<div className='contact-info'>
						<input
							type='text'
							className='text-field'
							name='lastName'
							placeholder='Last name'
							value={this.props.contactForEdit.lastName}
							onChange={this.onInputChange}
						/>
						<span className='clear' onClick={this.onClearField}>
							X
						</span>
					</div>
					<div className='contact-info'>
						<input
							type='email'
							className='text-field'
							name='email'
							placeholder='Email'
							value={this.props.contactForEdit.email}
							onChange={this.onInputChange}
						/>
						<span className='clear' onClick={this.onClearField}>
							X
						</span>
					</div>
					<div className='contact-info'>
						<input
							type='text'
							className='text-field'
							name='phone'
							placeholder='Phone'
							value={this.props.contactForEdit.phone}
							onChange={this.onInputChange}
						/>
						<span className='clear' onClick={this.onClearField}>
							X
						</span>
					</div>
				</div>
				<div className='btns'>
					<button id='save' type='submit'>
						Save
					</button>
					{this.props.contactForEdit.id ? (
						<button
							id='delete'
							type='button'
							onClick={this.onContactDelete}
						>
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
