import { createSelector } from 'reselect';
import { TApplicationState } from '../../../shared/types/redux';
import { todosSelectors, TTodosState } from './todosSlice';

export const selectTodos = createSelector(
  (state: TApplicationState) => state,
  (state) => todosSelectors.selectAll(state)
);

export const selectTodosState = (state: TApplicationState): TTodosState =>
  state.todos;

export const selectTodosOffset = createSelector(
  selectTodosState,
  (todosState) => todosState.todos.offset
);

export const selectTodosIsReachEndOfList = createSelector(
  selectTodosState,
  (todosState) => todosState.todos.isReachEndOfList
);
