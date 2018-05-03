import React from 'react';
import PropTypes from 'prop-types';
import Counter from './Counter';
import GuestList from './GuestList';
import ConfirmedFilter from './ConfirmedFilter';

const MainContent = props => 
  <div className="main">
    <ConfirmedFilter 
        toggleFilter={props.toggleFilter}
        isFiltered={props.isFiltered} />
    <Counter 
      totalInvited={props.totalInvited}
      numberAttending={props.numberAttending}
      numberUnconfirmed={props.numberUnconfirmed} />
    <GuestList 
      guests={props.guests} 
      toggleConfirmationAt={props.toggleConfirmationAt} 
      toggleEditingAt={props.toggleEditingAt}
      removeGuestAt={props.removeGuestAt}
      setNameAt={props.setNameAt}
      isFiltered={props.isFiltered}
      pendingGuest={props.pendingGuest} />
  </div>

MainContent.propTypes = {
  toggleFilter: PropTypes.func.isRequired,
  isFiltered: PropTypes.bool.isRequired,
  totalInvited: PropTypes.number.isRequired,
  numberAttending: PropTypes.number.isRequired,
  numberUnconfirmed: PropTypes.number.isRequired,
  guests: PropTypes.array.isRequired,
  toggleConfirmationAt: PropTypes.func.isRequired,
  toggleEditingAt: PropTypes.func.isRequired,
  removeGuestAt: PropTypes.func.isRequired,
  setNameAt: PropTypes.func.isRequired,
  pendingGuest: PropTypes.string.isRequired
};

export default MainContent;