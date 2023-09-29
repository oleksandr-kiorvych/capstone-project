import { createActionGroup, props } from '@ngrx/store';

import {
  ITodo,
  TAddTodoRequest,
} from '../../../shared/utils/models/todo.model';

export const TodosActions = createActionGroup({
  source: 'todos',
  events: {
    get_todos: props<{ userId?: number }>(),
    get_todos_success: props<{ todos: ITodo[] }>(),
    get_todos_error: props<{ error: string }>(),

    add_todo: props<{ todo: TAddTodoRequest }>(),
    add_todo_success: props<{ todo: ITodo }>(),
    add_todo_error: props<{ error: string }>(),

    edit_todo: props<{ todo: ITodo }>(),
    edit_todo_success: props<{ todo: ITodo }>(),
    edit_todo_error: props<{ error: string }>(),

    delete_todo: props<{ todoId: number }>(),
    delete_todo_success: props<{ todoId: number }>(),
    delete_todo_error: props<{ error: string }>(),

    get_single_todo: props<{ todoId: number }>(),
    get_single_todo_success: props<{ todo: ITodo }>(),
    get_single_todo_failure: props<{ error: string }>(),
  },
});
