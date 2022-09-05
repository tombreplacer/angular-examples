import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-toast',
  templateUrl: './todo-toast.component.html',
  styleUrls: ['./todo-toast.component.scss']
})
export class TodoToastComponent implements OnInit {

  @Input()
  message: string;

  constructor() { }

  ngOnInit(): void {
  }

}
