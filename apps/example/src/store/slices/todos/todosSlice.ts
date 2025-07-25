import {
  createEntityAdapter,
  createSlice,
  EntityState,
} from '@reduxjs/toolkit';
import { EReducerNames, TToDo } from '../../../shared/types';
import { todosEndpoints } from '../../api/todos/todos';
import { ETodosQueries } from '../../api/todos/queries';
import { DEFAULT_PAGE_SIZE } from '../../../shared/constants';
import { TApplicationState } from '../../../shared/types/redux';

export type TTodosState = {
  todos: EntityState<TToDo, number> & {
    offset: number;
    totalElements: number;
    isReachEndOfList: boolean;
  };
};

const todosAdapter = createEntityAdapter<TToDo>();

const initialState: TTodosState = {
  todos: todosAdapter.getInitialState({
    offset: 0,
    totalElements: 0,
    isReachEndOfList: false,
  }),
};

const todosSlice = createSlice({
  name: EReducerNames.TODOS,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      todosEndpoints[ETodosQueries.GET_TODOS].matchFulfilled,
      (state, { payload }) => {
        const isRefresh = payload.skip === 0;
        state.todos.offset = payload.skip;
        state.todos.isReachEndOfList = DEFAULT_PAGE_SIZE > payload.todos.length;
        state.todos.totalElements = payload.total;

        if (isRefresh) {
          todosAdapter.setAll(state.todos, payload.todos);
        } else {
          todosAdapter.addMany(state.todos, payload.todos);
        }
      }
    );
    builder.addMatcher(
      todosEndpoints[ETodosQueries.UPDATE_TODO_STATUS].matchFulfilled,
      (state, { payload }) => {
        todosAdapter.updateOne(state.todos, {
          id: payload.id,
          changes: { completed: payload.completed },
        });
      }
    );
  },
});

export const todosSelectors = todosAdapter.getSelectors(
  (state: TApplicationState) => state.todos.todos
);

export default todosSlice.reducer;
