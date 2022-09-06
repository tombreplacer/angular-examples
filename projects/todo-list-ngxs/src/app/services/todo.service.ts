import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Todo } from '../models/todo';

@Injectable()
export class TodoService {
  private todosUrl = 'http://localhost:8080/todo';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient) { }

  list(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todosUrl)
      .pipe(
        tap(_ => console.log('fetched todos')),
        catchError(this.handleError<Todo[]>('getTodos', []))
      );
  }

  get(id: number): Observable<Todo> {
    const url = `${this.todosUrl}/${id}`;
    return this.http.get<Todo>(url).pipe(
      tap(_ => this.log(`fetched todo id=${id}`)),
      catchError(this.handleError<Todo>(`getTodo id=${id}`))
    );
  }

  add(todo: Todo) {
    return this.http.post<Todo>(this.todosUrl, todo, this.httpOptions).pipe(
      // tap((newTodo: Todo) => this.log(`added todo w/ id=${newTodo.id}`)),
      catchError(this.handleError<Todo>('addTodo'))
    );
  }

  update(todo: Todo) {
    return this.http.put(this.todosUrl, todo, this.httpOptions).pipe(
      tap(_ => this.log(`updated todo id=${todo.id}`)),
      catchError(this.handleError<any>('updateTodo'))
    );
  }

  delete(id: number) {
    const url = `${this.todosUrl}/${id}`;
    return this.http.delete(url).pipe(
      tap(_ => this.log(`deleted todo id=${id}`)),
      catchError(this.handleError<any>('deleteTodo'))
    );
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

