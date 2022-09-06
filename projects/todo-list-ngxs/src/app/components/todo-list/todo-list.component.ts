import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { Todo } from '../../models/todo';
import { TodoService } from '../../services/todo.service';
import { AddTodo, DeleteTodo, ListTodos, TodoState } from '../../store/todo.state';
import { Select, Store } from '@ngxs/store';
import { Observable, forkJoin, tap, mergeMap, switchMap, mergeAll, from, of, map, debounce, debounceTime } from 'rxjs';
import { AddToast, ToastState } from '../../store/toast.state';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, OnDestroy {

  @Select(TodoState.todos)
  public todos$!: Observable<Todo[]>;

  @Select(TodoState.isLoading)
  public isLoading$!: Observable<boolean>;

  @Select(ToastState.toasts)
  public toasts$!: Observable<string>;

  todos: Todo[];

  newTodo: string;

  private subs: Subscription[] = [];

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new ListTodos());
    const sub1 = this.todos$.subscribe(r=> {
      this.todos = r;
      console.log(this.todos)
    })
    this.subs.push(sub1);
  }

  ngOnDestroy(): void {
    this.subs.forEach(e => e.unsubscribe());
  }

  add() {
    if (!this.newTodo) {
      return;
    }
    this.store.dispatch(new AddTodo({id: 0, isCompleted: false, title: this.newTodo }));
    this.newTodo = '';
  }

  deleteAll() {
    console.log(this.todos);
    this.todos.forEach(e => {
      if (e.id) {
        // this.store.dispatch(new AddToast(e.title));
        this.store.dispatch(new DeleteTodo(e.id));

        // this.store.dispatch(new DeleteTodo(e.id)).subscribe({
        //   next: () => this.store.dispatch(new AddToast(e.title))
        // });
      }
    });
  }
}
