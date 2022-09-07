import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from '../../models/todo';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { TodoService } from '../../services/todo.service';
import { Store } from '@ngxs/store';
import { DeleteTodo, UpdateTodo } from '../../store/todo.state';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  faTrash = faTrash;

  @Input()
  todo: Todo;

  constructor(private store: Store) { }

  ngOnInit(): void {

  }

  toggleCompleted(event: any) {
    this.todo.isCompleted = event.target.checked;
    this.store.dispatch(new UpdateTodo(this.todo, { isCompleted: this.todo.isCompleted }))
  }

  delete() {
    this.store.dispatch(new DeleteTodo(this.todo));
  }
}
