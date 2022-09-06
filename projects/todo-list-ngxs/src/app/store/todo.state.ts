import { Injectable } from "@angular/core";
import { State, StateToken, StateContext, Action, Selector } from '@ngxs/store';
import { Todo } from "projects/todo-list-ngxs/src/app/models/todo";
import { TodoService } from "../services/todo.service";
import { tap, mergeMap } from 'rxjs/operators'
import { append, patch, updateItem } from '@ngxs/store/operators';


// const TODO_STATE_TOKEN = new StateToken<{}>('todo');

export class AddTodo {
  static readonly type = '[Todo] AddTodo';

  constructor(public todo: Todo) { }
}

export class ListTodos {
  static readonly type = '[Todo] ListTodos';

  constructor() { }
}

export class DeleteTodo {
  static readonly type = '[Todo] DeleteTodo';

  constructor(public id: number) { }
}


export class UpdateTodo {
  static readonly type = '[Todo] UpdateTodo';

  constructor(public todo: Todo, public newState: Partial<Todo>) { }
}


export interface TodoStateModel {
  todos: Todo[];
  isLoading: boolean;
}

@State<TodoStateModel>({
  name: 'todo',
  defaults: {
    isLoading: false,
    todos: [] as Todo[]
  }
})


@Injectable()
export class TodoState {
  constructor(private todoService: TodoService) { }

  @Action(AddTodo, { cancelUncompleted: true })
  addTodo(ctx: StateContext<TodoStateModel>, action: AddTodo) {
    ctx.patchState({ isLoading: true })
    return this.todoService.add(action.todo)
      .pipe(
        tap((res) => {
          const state = ctx.getState();
          ctx.patchState({
            isLoading: false,
            todos: [ ...state.todos, action.todo]
          });
        }),
        mergeMap(() => ctx.dispatch([]))
      )
  }

  @Action(UpdateTodo, { cancelUncompleted: true })
  updateTodo(ctx: StateContext<TodoStateModel>, action: UpdateTodo) {
    return this.todoService.update(action.todo)
      .pipe(
        tap((res) => {
          const state = ctx.getState();
          ctx.patchState({
            ...state,
            todos: state.todos.map(item => {
              if(item.id === action.todo.id) {
                return {...item, ...action.newState};
              }
              return item;
            })
          });
        }),
        mergeMap(() => ctx.dispatch([]))
      )
  }


  @Action(ListTodos, { cancelUncompleted: true })
  listTodos(ctx: StateContext<TodoStateModel>, action: ListTodos) {
    return this.todoService.list()
      .pipe(
        tap((res) => {
          const state = ctx.getState();
          ctx.patchState({
            ...state,
            todos: res
          });
        }),
        mergeMap(() => ctx.dispatch([]))
      )
  }

  @Action(DeleteTodo, { cancelUncompleted: true })
  deleteTodo(ctx: StateContext<TodoStateModel>, action: DeleteTodo) {
    return this.todoService.delete(action.id)
      .pipe(
        tap((res) => {
          const state = ctx.getState();
          ctx.patchState({
            ...state,
            todos: state.todos.filter((e)=>e.id != action.id)
          });
        }),
        // mergeMap(() => ctx.dispatch([]))
      )
  }

    // Selectors
    @Selector()
    static todos(state: TodoStateModel): Todo[] {
      return state.todos;
    }

    @Selector()
    static isLoading(state: TodoStateModel): boolean {
      return state.isLoading;
    }
}
