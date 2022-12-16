import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoService } from './services/todo.service';
import { TodoToastComponent } from './components/todo-toast/todo-toast.component';
import { TodoState } from './store/todo.state';
import { NgxsModule } from '@ngxs/store'
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { environment } from '../environments/environment';
import { ToastState } from './store/toast.state';
import { ExampleInterceptor } from './misc/http.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    TodoItemComponent,
    TodoListComponent,
    TodoToastComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    NgxsModule.forRoot(),
    NgxsModule.forFeature([TodoState]),
    NgxsModule.forFeature([ToastState]),
    NgxsReduxDevtoolsPluginModule.forRoot()
  ],
  providers: [
    TodoService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ExampleInterceptor,
      multi: true,
    },],
  bootstrap: [AppComponent]
})
export class AppModule { }
