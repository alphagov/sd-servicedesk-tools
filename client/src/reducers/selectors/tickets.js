import { createSelector } from 'reselect';
import _ from 'lodash';

// tickets
export const selectTicket = (state) => state.ticket;
// new starts pending
export const selectNewStartTicketsPending = (state) => state.newStartPending;
// new start tickets
export const selectGDSNewStartTickets = (state) => state.gdsStarters;
// events
export const selectWCHEvents = (state) => state.wchEvents;

export const selectNewStartTicketsPendingSorted = createSelector(
  selectNewStartTicketsPending,
  (newstarts) => {
    return _.orderBy(newstarts, 'ticketCustomFields[6].restValue', 'asc');
  }
);

export const selectGDSNewStartTicketsSorted = createSelector(
  selectGDSNewStartTickets,
  (newstarts) => {
    return _.orderBy(
      newstarts.filter(
        (newstart) =>
          newstart.problemtype.id === 7 || newstart.problemtype.id === 8
      ),
      'ticketCustomFields[6].restValue',
      'asc'
    );
  }
);

export const selectContractorNewStartTicketsSorted = createSelector(
  selectGDSNewStartTickets,
  (newstarts) => {
    return _.orderBy(
      newstarts.filter(
        (newstart) =>
          newstart.problemtype.id === 18 || newstart.problemtype.id === 62
      ),
      'ticketCustomFields[6].restValue',
      'asc'
    );
  }
);

export const selectWCHEventsTicketsSorted = createSelector(
  selectWCHEvents,
  (events) => {
    return _.orderBy(events, 'ticketCustomFields[1].restValue', 'asc');
  }
);
