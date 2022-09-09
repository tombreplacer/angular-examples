import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, from, BehaviorSubject, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Todo } from '../models/todo';

@Injectable()
export class TodoService {
  private todosUrl = 'http://localhost:8080/api/todo';  // URL to web api

  todos$: BehaviorSubject<Todo[]> = new BehaviorSubject([] as Todo[]);
  loadedTodo$ :Subject<Todo> = new Subject();

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient) { }

  list(): Observable<Todo[]> {
    const obs = this.http.get<Todo[]>(this.todosUrl)
      .pipe(
        tap(_ => console.log('fetched todos')),
        catchError(this.handleError<Todo[]>('getTodos', []))
      );
      obs.subscribe((res)=>this.todos$.next(res));
    return obs;
  }

  get(id: number): Observable<Todo> {
    const url = `${this.todosUrl}/${id}`;
    const obs = this.http.get<Todo>(url).pipe(
      tap(_ => this.log(`fetched todo id=${id}`)),
      catchError(this.handleError<Todo>(`getTodo id=${id}`))
    );
    obs.subscribe(res => this.loadedTodo$.next(res))
    return obs;
  }

  add(todo: Todo) {
    const obs = this.http.post<Todo>(this.todosUrl, todo, this.httpOptions).pipe(
      tap((newTodo: Todo) => this.log(`added todo w/ id=${newTodo.id}`)),
      catchError(this.handleError<Todo>('addTodo'))
    );
    return obs;
  }

  update(todo: Todo) {
    const obs = this.http.put(this.todosUrl, todo, this.httpOptions).pipe(
      tap(_ => this.log(`updated todo id=${todo.id}`)),
      catchError(this.handleError<any>('updateTodo'))
    );
    obs.subscribe(res => res);
    return obs;
  }

  delete(id: number) {
    const url = `${this.todosUrl}/${id}`;
    const obs = this.http.delete(url).pipe(
      tap(_ => this.log(`deleted todo id=${id}`)),
      catchError(this.handleError<any>('updateTodo'))
    );
    obs.subscribe(res => res);
    return obs;
  }


  private log(message: string) {
    console.log(`TodoService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

