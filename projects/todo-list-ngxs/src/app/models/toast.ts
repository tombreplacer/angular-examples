export class Toast {
  constructor(public title: string, public type: ToastType) {

  }
}

export enum ToastType {
  Delete,
  Update,
  Create,
}
