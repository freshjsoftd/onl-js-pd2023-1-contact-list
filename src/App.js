import React, { Component } from 'react';
import './App.css';
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';

export class App extends Component {
	state = {
		contacts: [],
		contactForEdit: this.createEmptyContact(),
	};

	createEmptyContact() {
		return {
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
		};
	}

	componentDidMount() {
		const contacts = JSON.parse(localStorage.getItem('contacts'));
		if (!contacts) {
			this.setState({
				contacts: [],
			});
		} else {
			this.setState({
				contacts: [...contacts],
			});
		}
	}

	componentDidUpdate() {
		localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
	}

	deleteContact = (id) => {
		this.setState({
			contacts: [
				...this.state.contacts.filter((contact) => contact.id !== id),
			],
		});
	};

	saveContact = (contact) => {
		if (!contact.id) {
			this.createContact(contact);
		} else {
			this.updateContact(contact);
		}
	};

	addNewContact = () => {
		this.setState({
			contactForEdit: this.createEmptyContact(),
		});
	};

	selectContact = (contact) => {
		this.setState({
			contactForEdit: contact,
		});
	};

	createContact(contact) {
		contact.id = Date.now();
		this.setState({
			contacts: [...this.state.contacts, contact],
			contactForEdit: this.createEmptyContact(),
		});
	}
	updateContact(contact) {
		this.setState((state) => {
			const contacts = state.contacts.map((item) =>
				item.id === contact.id ? contact : item
			);
			return {
				contacts,
				contactForEdit: contact,
			};
		});
	}

	render() {
		// console.log(this.state.contactForEdit);
		// console.log(this.state.contacts);
		return (
			<div className='container'>
				<h1 className='header'>Contact List</h1>
				<div className='main'>
					<ContactList
						contacts={this.state.contacts}
						onDelete={this.deleteContact}
						onAddContact={this.addNewContact}
						onEditContact={this.selectContact}
					/>
					<ContactForm
						key={this.state.contactForEdit.id}
						contactForEdit={this.state.contactForEdit}
						onSubmit={this.saveContact}
						onDelete={this.deleteContact}
					/>
				</div>
			</div>
		);
	}
}

export default App;
