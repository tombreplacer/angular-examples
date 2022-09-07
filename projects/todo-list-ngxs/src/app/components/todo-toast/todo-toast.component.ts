import { Component, Input, OnInit } from '@angular/core';
import { Toast, ToastType } from '../../models/toast';

@Component({
  selector: 'app-todo-toast',
  templateUrl: './todo-toast.component.html',
  styleUrls: ['./todo-toast.component.scss']
})
export class TodoToastComponent implements OnInit {

  @Input()
  message: Toast;

  textCssClass: string;
  bgCssClass: string;

  constructor() { }

  ngOnInit(): void {
    this.textCssClass = this.getTextCssClassByType(this.message.type);
    this.bgCssClass = this.getBgCssClassByType(this.message.type);
    console.log(this.textCssClass)
    console.log(this.bgCssClass)
  }

  getTextCssClassByType(toastType: ToastType): string {
    switch (toastType) {
      case ToastType.Create:
        return 'text-primary'
        break;

      case ToastType.Update:
        return 'text-warning'
        break;

      case ToastType.Delete:
        return 'text-danger'
        break;

      default:
        return 'text-primary'
        break;
    }
  }

  getBgCssClassByType(toastType: ToastType) {
    switch (toastType) {
      case ToastType.Create:
        return 'bg-dark'
        break;

      case ToastType.Update:
        return 'bg-dark'
        break;

      case ToastType.Delete:
        return 'bg-dark'
        break;

      default:
        return 'bg-secondary'
        break;
    }
  }
}
