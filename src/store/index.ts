import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import thunk from 'redux-thunk';
import appReducer from './modules/app';
import routeReducer from './modules/route';
import customerReducer from './modules/customer';
import servicesReducer from './modules/services';
import trainersSlice from './modules/trainers';
import bookingPageSlice from './modules/booking';

const reducers = combineReducers({
  app: appReducer,
  route: routeReducer,
  customer: customerReducer,
  //services: servicesReducer,
  trainers: trainersSlice,
  bookingPageSlice: bookingPageSlice,
});

const persistConfig = {
  key: 'react-xs',
  storage,
  // "Whitelist"
  whitelist: ['app', 'route'],
  // Blacklist
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// "Infer the RootState and AppDispatch types from the store itself."
export type RootState = ReturnType<typeof store.getState>;
// "Infer the type: {posts: PostsState, comments: CommentsState, users: UsersState}."
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

export default store;
