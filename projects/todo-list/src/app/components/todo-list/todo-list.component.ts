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

  private subs: Subscription[] = [];

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.subs.push(this.todoService
      .getTodos()
      .subscribe(res => this.todos = res));
  }

  ngOnDestroy(): void {
    this.subs.forEach(e => e.unsubscribe());
  }

  add() {
    this.todoService.addTodo({ isCompleted: false, title: this.newTodo }).subscribe(result => {
      this.todos.push(result)
    });
  }
}
