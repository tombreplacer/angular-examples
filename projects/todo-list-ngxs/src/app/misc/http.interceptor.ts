import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable, tap } from "rxjs"

@Injectable()
export class ExampleInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = req.clone({
      headers: req.headers.set('Session', '123456789'),
    })

    return next.handle(authReq).pipe(
      tap(
        () => console.log("zzzzzzz")
      )
    )
  }
}
