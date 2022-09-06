import { Injectable } from "@angular/core";
import { State, StateToken, StateContext, Action, Selector } from '@ngxs/store';
import { tap, mergeMap } from 'rxjs/operators'
import { append, patch, updateItem } from '@ngxs/store/operators';
import { of } from "rxjs";


export class AddToast {
  static readonly type = '[Toast] AddToast';

  constructor(public toast: string) { }
}

export interface ToastStateModel {
  toasts: string[];
}

@State<ToastStateModel>({
  name: 'toast',
  defaults: {
    toasts: [] as string[]
  }
})


@Injectable()
export class ToastState {
  constructor() { }

  @Action(AddToast, { cancelUncompleted: true })
  addToast(ctx: StateContext<ToastStateModel>, action: AddToast) {
    const state = ctx.getState();
    ctx.patchState({toasts: [...state.toasts, action.toast]});
    return of(state.toasts)
      .pipe(
        mergeMap(() => ctx.dispatch([]))
      )
  }

  // Selectors
  @Selector()
  static toasts(state: ToastStateModel): string[] {
    return state.toasts;
  }
}
