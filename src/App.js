import React, { Component } from 'react';
import { CircleLoader} from 'react-spinners';
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import './App.css';
import Wrapper from './components/Wrapper/Wrapper';

export class App extends Component {
	state = {
		contacts: [],
		contactForEdit: null,
	};

	createEmptyContact() {
		return {
			id: '',
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
		};
	}

	changeForm = (changes) => {
		this.setState({
			contactForEdit: {
				...this.state.contactForEdit,
				...changes,
			}
		})
	}
	saveState(contacts) {
		localStorage.setItem('contacts', JSON.stringify(contacts));
	}

	restoreState(){
		const data = localStorage.getItem('contacts');
		return data ? JSON.parse(data) : [];
	}

	componentDidMount() {
		this.setState({
			contacts: this.restoreState(),
		});
	}

	/* componentDidUpdate() {
		localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
	} */

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
	deleteContact = (id) =>{
		this.setState((state) => {
			const contacts = state.contacts.filter((contact) => contact.id !== id);
			
			this.saveState(contacts);
			return {
				contacts,
				contactForEdit: this.createEmptyContact(),
			};
		});
	}

	createContact(contact) {
		contact.id = Date.now();
		this.setState((state) => {
			const contacts = [...state.contacts, contact];
			this.saveState(contacts);
			return {
				contacts,
				contactForEdit: this.createEmptyContact(),
			};
		});
	}
	updateContact(contact) {
		this.setState((state) => {
			const contacts = state.contacts.map((item) =>
				item.id === contact.id ? contact : item
			);
			this.saveState(contacts);
			return {
				contacts,
				contactForEdit: contact,
			};
		});
	}

	/* renderList = () => {
		return (
			<ContactList
				contacts={this.state.contacts}
				onDelete={this.deleteContact}
				onAddContact={this.addNewContact}
				onEditContact={this.selectContact}
			/>
		);
	} */

	render() {
		// console.log(this.state.contactForEdit);
		// console.log(this.state.contacts);
		return (
			<div className='container'>
				<h1 className='header'>Contact List</h1>
				<div className='main'>
					{/* <Wrapper getContent={this.renderList}/> */}
					<Wrapper>
						<ContactList
							contacts={this.state.contacts}
							onDelete={this.deleteContact}
							onAddContact={this.addNewContact}
							onEditContact={this.selectContact}
						/>
					</Wrapper>
					<Wrapper>
						{this.state.contactForEdit ? (
						<ContactForm
							// key={this.state.contactForEdit.id}
							contactForEdit={this.state.contactForEdit}
							onSubmit={this.saveContact}
							onDelete={this.deleteContact}
							onChange={this.changeForm}
						/>
					) : (
						<CircleLoader color='#36d7b7' size={200} />
					)}
					</Wrapper>
					
				</div>
			</div>
		);
	}
}

export default App;
