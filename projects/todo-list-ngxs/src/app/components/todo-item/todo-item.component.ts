import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from '../../models/todo';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { TodoService } from '../../services/todo.service';
import { Store } from '@ngxs/store';
import { DeleteTodo } from '../../store/todo.state';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  faTrash = faTrash;

  @Input()
  todo: Todo;

  constructor(private todoService: TodoService, private store: Store) { }

  ngOnInit(): void {

  }

  toggleCompleted(event: any) {
    this.todo.isCompleted = event.target.checked;
    this.todoService.update(this.todo).subscribe();
  }

  delete() {
    this.store.dispatch(new DeleteTodo(this.todo.id));
  }
}
