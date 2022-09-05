import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { Todo } from '../../models/todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, OnDestroy {
  todos: Todo[];

  newTodo: string;
  toasts: string[] = []

  private subs: Subscription[] = [];

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.getList();
  }

  ngOnDestroy(): void {
    this.subs.forEach(e => e.unsubscribe());
  }

  getList() {
    this.todoService.list().subscribe(res => this.todos = res);
  }

  add() {
    if (!this.newTodo) {
      return;
    }
    this.todoService.add({ isCompleted: false, title: this.newTodo }).subscribe(() => {
      this.newTodo = '';
      this.getList();
    });
  }

  onDeleted(event: Todo) {
    this.showToast(event.title);
    this.getList();
  }

  deleteAll() {
    this.todos.forEach(e => {
      if (e.id) {
        this.todoService.delete(e.id)
          .subscribe(() => {
            this.onDeleted(e);
          })
      }
    })
  }

  showToast(title: string) {
    this.toasts.push(`Удален todo: ${title}`);
    setTimeout(() => this.toasts.shift(), 3000);
  }
}
