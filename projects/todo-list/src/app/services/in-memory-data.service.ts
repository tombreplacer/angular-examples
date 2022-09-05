import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Todo } from '../models/todo'

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const todos: Todo[] = [
      { id: 1, isCompleted: false, title: 'Купить хлеб' },
      { id: 2, isCompleted: false, title: 'Купить помидоры' },
      { id: 3, isCompleted: true, title: 'Купить сыр' },
      { id: 4, isCompleted: false, title: 'Выгулять пса' },
      { id: 5, isCompleted: false, title: 'Покормить кота' },
    ];
    return {todos: todos};
  }

  genId(todos: Todo[]): number {
    return todos.length > 0 ? Math.max(...todos.map(todo => todo.id??0)) + 1 : 0;
  }
}
