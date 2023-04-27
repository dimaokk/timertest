import {configureStore} from '@reduxjs/toolkit';
import eventsReducer from './events';

const store = configureStore({
  reducer: {
    events: eventsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;


// const myinterval = setInterval(() => {
//   dispatch(fetchEventsAsyncAsync());
//   console.warn('done')
// }, 10000);

// useEffect(() => {
//   myinterval;
// }, [dispatch]);

// const stopCounter = () => {
//   clearInterval(myinterval);
// };

// useEffect(() => {
//   navigation.addListener('focus', () => {
//     dispatch(fetchEventsAsyncAsync());
//   });
// }, [dispatch, navigation]);

// useEffect(() => {
//   dispatch(fetchEventsAsyncAsync());
// }, [dispatch]);

// useEffect(() => {
//   setInterval(() => {
//     dispatch(fetchEventsAsyncAsync());
//   }, 10000);
//   // return () => {
//   //   clearInterval(timeout);
//   // };
// }, [dispatch]);

// useFocusEffect(
//   useCallback(() => {
//     dispatch(fetchEventsAsyncAsync());
//     // dispatch(togle())
//     // console.warn('focus pokus');
//   }, []),
// );

// const handleRefresh = () => {
//   setRefreshing(true);
//   dispatch(fetchEventsAsyncAsync());
//   setRefreshing(false);
//   // clearInterval(interval);
// };
