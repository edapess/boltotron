import { TToDo } from '../../../shared/types';
import { baseApi } from '../../toolkitServices';
import { ETodosQueries } from './queries';
import { TTodosRequest, TTodosResponse } from './types';

const todosApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    [ETodosQueries.GET_TODOS]: builder.query<TTodosResponse, TTodosRequest>({
      query: (params) => ({
        url: 'todos',
        method: 'GET',
        params,
      }),
    }),
    [ETodosQueries.UPDATE_TODO_STATUS]: builder.mutation<
      TToDo,
      {
        id: number;
        completed: boolean;
      }
    >({
      query: ({ id, completed }) => ({
        url: `todos/${id}`,
        method: 'PUT',
        data: { completed },
      }),
    }),
  }),
});

export const {
  useLazyGetTodosQuery,
  useUpdateTodoStatusMutation,
  endpoints: todosEndpoints,
} = todosApi;
