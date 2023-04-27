import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchEventsAPI, GithubEvent} from '../api/github';

interface EventsState {
  data: GithubEvent[];
  isLoading: boolean;
  lastUpdated: number;
  isTime: boolean;
}

const initialState: EventsState = {
  data: [],
  isLoading: false,
  lastUpdated: 0,
  isTime: true,
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
    togle: state => {
      state.isTime = !state.isTime;
      console.error('reduce ' + state.isTime);
    },
  },
});

export const {startLoading, eventsReceived, togle} = eventsSlice.actions;

export const fetchEventsAsync = () => async (dispatch: any) => {
  dispatch(startLoading());
  const response = await fetchEventsAPI();
  dispatch(eventsReceived(response));
};

export default eventsSlice.reducer;
