import { ContaCorrente } from './contaCorrente';
export class HistoricoConta {
    public constructor(
        id: string,
        tipoMovimento: string,
        valor: string,
        data: string,
        idConta: String,
        cpf: String
    ){
        if(tipoMovimento){
            if(tipoMovimento == "0"){
                tipoMovimento = "Deposito";
            } else {
                tipoMovimento = "Saque";
            }
        }
    }
}