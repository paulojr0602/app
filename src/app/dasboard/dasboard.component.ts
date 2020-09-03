import { HistoricoConta } from './../models/HistoricoConta';
import { ContaCorrente } from './../models/contaCorrente';
import { ContacorrenteService } from './../providers/services/contacorrente.service';
import { Router } from '@angular/router';
import { MessageService } from './../providers/services/message.service';
import { Cliente } from './../models/cliente';
import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormGroup, Validators} from '@angular/forms';



@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.css']
})
export class DasboardComponent implements OnInit {
  movForm: FormGroup;
  conta: IConta;
  cliente: ICliente;
  historico: any;
  extrato: any;
  constructor(private contaService: ContacorrenteService,
              private mensagemService: MessageService,
              private router: Router,
              private fb: FormBuilder) { 
              }

  ngOnInit(): void {
    this.cliente = new Cliente("","","","");
    this.conta = new ContaCorrente("","","");
    this.consultarConta();
    this.createForm();
  }

  createForm() {
    this.movForm = this.fb.group({
      valor: ['', Validators.required]
    });
  }

  consultarConta(): void{
    this.contaService.consultarConta(sessionStorage.getItem('idUsuario'))
    .subscribe(response => {
      if(response){
        this.conta =  response;
        this.cliente = response.cliente;
      }else{ 
        this.mensagemService.add("Não foi possível localizar a conta! Verifique mais tarde!");
      }
    });
  }

  depositar(): void{
    this.historico = new HistoricoConta("","0",Date.now.toString(),this.movForm.value.valor,this.conta.id,this.cliente.cpf);
    this.historico.tipoMovimento= "0"
    this.historico.data =  Date.now.toString()
    this.historico.valor= this.movForm.value.valor;
    this.historico.idConta = this.conta.id 
    this.historico.cpf = this.cliente.cpf
    this.contaService.operacao(this.historico)
      .subscribe(response => {
        if(response){
          this.conta.saldo = response;
        }else{
          this.mensagemService.add("Não foi possível realizar a operação! Tente novamente mais tarde!");
        }
      });
  }

  sacar(): void{
    this.historico.tipoMovimento= "1"
    this.historico.data =  Date.now.toString()
    this.historico.valor= this.movForm.value.valor;
    this.historico.idConta = this.conta.id 
    this.historico.cpf = this.cliente.cpf
    this.contaService.operacao(this.historico)
    .subscribe(response => {
      if(response){
        this.conta.saldo = response;
      }else{
        this.mensagemService.add("Não foi possível realizar a operação! O saldo é insuficiente!");
      }
    });
  }

  consultarHistorico(): void {
    this.contaService.consultarHistorico(this.conta.id)
    .subscribe(response => {
      if(response){
        this.extrato = response;
      }else{
        this.mensagemService.add("Não foi possível consultar o extrato! Tente novamente mais tarde!");
      }
    });
  }

  sair(){
    sessionStorage.clear();
    this.router.navigate(['home']);
  }
  
}

export interface IHistorico{
  id: string,
  tipoMovimento: string,
  data: string,
  valor: string,
  idConta: String,
  cpf: String
}

export interface IConta{
  id: string;
  numero: string;
  saldo: string;
}
export interface ICliente{
  id: string;
  nome: string;
  cpf: string;
}
