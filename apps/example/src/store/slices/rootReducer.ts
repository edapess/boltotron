import { combineReducers } from '@reduxjs/toolkit';
import todosReducer from './todos/todosSlice';
import { EReducerNames } from '../../shared/types';
import { baseApi } from '../toolkitServices';

export const combinedReducers = {
  [EReducerNames.TODOS]: todosReducer,
  [baseApi.reducerPath]: baseApi.reducer,
};

const rootReducer = combineReducers(combinedReducers);
export default rootReducer;
