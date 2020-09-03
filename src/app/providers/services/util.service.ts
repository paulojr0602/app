import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {

  constructor(
  ) { }

  public obterHostDaApi(): string {
    return "http://localhost:8080/api";
   }

  public isJson(json: string): boolean {
    try {
      JSON.parse(json);
    } catch (e) {
      return false;
    }

    return true;
  }

  removerAcentos(str) {
    let com_acento = "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ";
    let sem_acento = "AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr";
    let novastr="";
    for(let i=0; i<str.length; i++) {
      let troca=false;
      for (let a=0; a<com_acento.length; a++) {
        if (str.substr(i,1)==com_acento.substr(a,1)) {
          novastr+=sem_acento.substr(a,1);
          troca=true;
          break;
        }
      }
      if (troca==false) {
        novastr+=str.substr(i,1);
      }
    }
    return novastr;
  }	

  
}