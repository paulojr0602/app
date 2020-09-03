import { Cliente } from './../../models/cliente';
import { UtilService } from './util.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ContacorrenteService {

  host = this.utilService.obterHostDaApi();
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  $cliente: Cliente;

  constructor(private utilService: UtilService,
              private http: HttpClient,
              private messageService: MessageService) { }

   cadastrar(id: any): Observable<any>{
    return  this.http.post(this.host + '/contacorrente?id=' + id, this.httpOptions).pipe(
      tap(retorno => retorno),
      catchError(this.handleError<any>(`Problema ao tentar abrir nova conta. Tente novamente mais tarde.`))
    );
  }

   consultarHistorico(id: any): Observable<any>{
    return  this.http.get<any>(this.host + '/extrato?id=' + id).pipe(
      tap(retorno => retorno),
      catchError(this.handleError<any>(`Problema ao tentar consultar o extrato. Tente novamente mais tarde.`))
    );
  }

  consultarConta(id: any): Observable<any> {
    return  this.http.get<any>(this.host + '/conta?id=' + id).pipe(
      tap(retorno => retorno),
      catchError(this.handleError<any>(`Não foi possível localizar o cliente. Tente novamente mais tarde.`))
      );
  }

  operacao(dados: any): Observable<any>{
    return  this.http.post(this.host + '/operacao', dados, this.httpOptions).pipe(
      tap(retorno => retorno),
      catchError(this.handleError<any>(`Não foi possível realizar a operação. Tente novamente mais tarde.`))
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


export interface ContaCorreteResponse{
  id: string;
  numero: string;
  saldo: string;
}