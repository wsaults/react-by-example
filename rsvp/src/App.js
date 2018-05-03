import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import MainContent from './MainContent';

class App extends Component {

  state = {
    isFiltered: false,
    pendingGuest: "",
    guests: [
      {
        name: 'Will',
        isConfirmed: false,
        isEditing: false
      },
      {
        name: 'Johnny',
        isConfirmed: true,
        isEditing: false
      },
      {
        name: 'Tim',
        isConfirmed: false,
        isEditing: true
      }
    ]
  }

  toggleGuestPropertyAt = (property, indexToChange) => 
    this.setState({
      guests: this.state.guests.map((guest, index) => {
        if (index === indexToChange) {
          return {
            ...guest, // The spread operator transfers the keys and props from one obj to another
            [property]: !guest[property]
          }
        }

        return guest; // Returns the untouched object if there is no change.
      })
    });

  toggleConfirmationAt = index =>
    this.toggleGuestPropertyAt("isConfirmed", index);

  removeGuestAt = index =>
    this.setState({
      guests: [
        ...this.state.guests.slice(0, index),
        ...this.state.guests.slice(index + 1)
      ]
    })

  toggleEditingAt = index =>
    this.toggleGuestPropertyAt("isEditing", index);

  setNameAt = (name, indexToChange) => 
    this.setState({
      guests: this.state.guests.map((guest, index) => {
        if (index === indexToChange) {
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
    this.setState({ 
      guests: [
        {
          name: this.state.pendingGuest,
          isConfirmed: false,
          isEditing: false
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
        toggleConfirmationAt={this.toggleConfirmationAt}
        toggleEditingAt={this.toggleEditingAt}
        removeGuestAt={this.removeGuestAt}
        setNameAt={this.setNameAt}
        pendingGuest={this.state.pendingGuest} />
    </div>
    );
  }
}

export default App;
