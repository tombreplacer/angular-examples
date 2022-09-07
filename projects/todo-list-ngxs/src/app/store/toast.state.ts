import { Injectable } from "@angular/core";
import { State, StateToken, StateContext, Action, Selector, Store } from '@ngxs/store';
import { tap, mergeMap, debounceTime, auditTime } from 'rxjs/operators'
import { append, patch, updateItem } from '@ngxs/store/operators';
import { of } from "rxjs";
import { Toast } from "../models/toast";


export class AddToast {
  static readonly type = '[Toast] AddToast';

  constructor(public toast: Toast) { }
}

export class DeleteFirstToast {
  static readonly type = '[Toast] DeleteFirstToast';

  constructor() { }
}

export interface ToastStateModel {
  toasts: Toast[];
}

@State<ToastStateModel>({
  name: 'toast',
  defaults: {
    toasts: [] as Toast[]
  }
})


@Injectable()
export class ToastState {
  constructor(private store: Store) { }

  @Action(AddToast, { cancelUncompleted: false })
  addToast(ctx: StateContext<ToastStateModel>, action: AddToast) {
    const state = ctx.getState();
    ctx.patchState({ toasts: [...state.toasts, action.toast] });
    return of(state.toasts)
      .pipe(
        auditTime(3000),
        mergeMap(() => ctx.dispatch([new DeleteFirstToast()]))
      )
  }

  @Action(DeleteFirstToast, { cancelUncompleted: false })
  deleteFirstToast(ctx: StateContext<ToastStateModel>, action: DeleteFirstToast) {
    const state = ctx.getState();

    const [firstElement, ...restArr] = state.toasts;
    ctx.patchState({ toasts: restArr });
    return of(state.toasts)
      .pipe(
        // mergeMap(() => ctx.dispatch([]))
      )
  }

  // Selectors
  @Selector()
  static toasts(state: ToastStateModel): Toast[] {
    return state.toasts;
  }
}
