import { UtilService } from './util.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  host = this.utilService.obterHostDaApi();
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private router: Router,
              private utilService: UtilService,
              private  http: HttpClient,
              private messageService: MessageService) { }

  cadastrar(cliente: ClienteResponse): Observable<ClienteResponse>{
    return this.http.post<ClienteResponse>(this.host + '/cliente', cliente, this.httpOptions).pipe(
      tap((newCliente: ClienteResponse) => newCliente),
      catchError(this.handleError<ClienteResponse>('cadastrar cliente'))     
    );
  }

  consultar(id: any): Observable<any> {
    return this.http.get<any>(this.host + '/cliente/?id=' + id).pipe(
    tap(retorno => retorno),
    catchError(this.handleError<any>(`consultar cliente`))
  );
}

  login(cpf: any): Observable<any> {
    return this.http.get<any>(this.host + '/login?cpf=' + cpf).pipe(
    tap(retorno => retorno),
    catchError(this.handleError<any>(`login`))
    );
  }

  /** Log a clienteService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`clienteService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
  
}

export interface ClienteResponse {
  id: string;
  nome: string;
  cpf: string;
  senha: string;
}