import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from '../../models/todo';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  faTrash = faTrash;

  @Input()
  todo: Todo;

  @Output()
  todoRemoved: EventEmitter<Todo> = new EventEmitter<Todo>(false);

  constructor(private todoService: TodoService) {

  }

  ngOnInit(): void {

  }

  toggleCompleted(event: any) {
    this.todo.isCompleted = event.target.checked;
    this.todoService.update(this.todo).subscribe();
  }

  delete() {
    if(this.todo.id) {
      this.todoService.delete(this.todo.id).subscribe(r => {
        this.todoRemoved.emit(this.todo);
       });
    }
  }
}
