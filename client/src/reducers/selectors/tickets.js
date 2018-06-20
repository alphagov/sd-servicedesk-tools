import { createSelector } from 'reselect';
import _ from 'lodash';

export const selectTicket = state => state.ticket;

export const selectNewStartTicketsPending = state => state.newStartPending;

export const selectNewStartTicketsPendingSorted = createSelector(
  selectNewStartTicketsPending,
  newstarts => {
    return _.orderBy(newstarts, 'ticketCustomFields[6].restValue', 'asc');
  }
);

export const selectGDSNewStartTickets = state => state.gdsStarters;

export const selectGDSNewStartTicketsSorted = createSelector(
  selectGDSNewStartTickets,
  newstarts => {
    return _.orderBy(
      newstarts.filter(
        newstart =>
          newstart.problemtype.id === 7 || newstart.problemtype.id === 8
      ),
      'ticketCustomFields[6].restValue',
      'asc'
    );
  }
);

export const selectContractorNewStartTicketsSorted = createSelector(
  selectGDSNewStartTickets,
  newstarts => {
    return _.orderBy(
      newstarts.filter(
        newstart =>
          newstart.problemtype.id === 18 || newstart.problemtype.id === 62
      ),
      'ticketCustomFields[6].restValue',
      'asc'
    );
  }
);
