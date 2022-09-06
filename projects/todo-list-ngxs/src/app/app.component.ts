import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { TodoState } from './store/todo.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @Select(TodoState.isLoading)
  public isLoading$!: Observable<boolean>;

  copyrightYear = new Date().getFullYear();

  constructor(private store: Store) {
  }
}
