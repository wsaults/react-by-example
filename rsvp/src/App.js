import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import MainContent from './MainContent';

class App extends Component {

  state = {
    isFiltered: false,
    pendingGuest: "",
    guests: []
  }

  lastGuestId = 0;

  newGuestId = () => {
    const id = this.lastGuestId;
    this.lastGuestId += 1;
    return id;
  };

  toggleGuestProperty = (property, id) => 
    this.setState({
      guests: this.state.guests.map(guest => {
        if (id === guest.id) {
          return {
            ...guest, // The spread operator transfers the keys and props from one obj to another
            [property]: !guest[property]
          }
        }

        return guest; // Returns the untouched object if there is no change.
      })
    });

  toggleConfirmation = id =>
    this.toggleGuestProperty("isConfirmed", id);

  removeGuest = id =>
    this.setState({
      guests: this.state.guests.filter(guest => id !== guest.id)
    });

  toggleEditing = id =>
    this.toggleGuestProperty("isEditing", id);

  setName = (name, id) => 
    this.setState({
      guests: this.state.guests.map(guest => {
        if (id === guest.id) {
          return {
            ...guest, // The spread operator transfers the keys and props from one obj to another
            name
          }
        }

        return guest; // Returns the untouched object if there is no change.
      })
    });

  toggleFilter = () =>
    this.setState({ isFiltered: !this.state.isFiltered });

  handleNameInput = e => 
    this.setState({ pendingGuest: e.target.value });

  newGuestSubmitHandler = e => {
    e.preventDefault();
    const id= this.newGuestId();
    this.setState({ 
      guests: [
        {
          name: this.state.pendingGuest,
          isConfirmed: false,
          isEditing: false,
          id
        },
        ...this.state.guests
      ],
      pendingGuest: ''
    });
  }

  getTotalInvited = () => this.state.guests.length;
  getAttendingGuests = () =>
    this.state.guests.reduce(
      (total, guest) => guest.isConfirmed ? total + 1 : total, 
    0); // 0 sets the intial total.

  render() {
    const totalInvited = this.getTotalInvited();
    const numberAttending = this.getAttendingGuests();
    const numberUnconfirmed = totalInvited - numberAttending;
    return (
      <div className="App">
      <Header 
        handleSubmit={this.newGuestSubmitHandler}
        handleNameInput={this.handleNameInput}
        pendingGuest={this.state.pendingGuest} />
      <MainContent 
        toggleFilter={this.toggleFilter}
        isFiltered={this.state.isFiltered}
        totalInvited={totalInvited}
        numberAttending={numberAttending}
        numberUnconfirmed={numberUnconfirmed}
        guests={this.state.guests}
        toggleConfirmation={this.toggleConfirmation}
        toggleEditing={this.toggleEditing}
        removeGuest={this.removeGuest}
        setName={this.setName}
        pendingGuest={this.state.pendingGuest} />
    </div>
    );
  }
}

export default App;
