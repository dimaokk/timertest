import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchEventsAPI, GithubEvent} from '../api/github';

interface EventsState {
  data: GithubEvent[];
  isLoading: boolean;
  lastUpdated: number;
}

const initialState: EventsState = {
  data: [],
  isLoading: false,
  lastUpdated: 0,
};

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    startLoading: state => {
      state.isLoading = true;
    },
    eventsReceived: (state, action: PayloadAction<GithubEvent[]>) => {
      state.data = action.payload;
      state.isLoading = false;
      state.lastUpdated = Date.now();
    },
  },
});

export const {startLoading, eventsReceived} = eventsSlice.actions;

export const fetchEventsAsync = () => async (dispatch: any) => {
  dispatch(startLoading());
  const response = await fetchEventsAPI();
  dispatch(eventsReceived(response));
};

export default eventsSlice.reducer;
