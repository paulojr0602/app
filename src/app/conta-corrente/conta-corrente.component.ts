import { Cliente } from './../models/cliente';
import { ContacorrenteService } from './../providers/services/contacorrente.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conta-corrente',
  templateUrl: './conta-corrente.component.html',
  styleUrls: ['./conta-corrente.component.css']
})
export class ContaCorrenteComponent implements OnInit {

  contaCorrente: any;
  cliente = new Cliente(sessionStorage.getItem('idUsuario'), sessionStorage.getItem('nome'), sessionStorage.getItem('cpf'),"");

  constructor(private router: Router,
              private contacorrenteService: ContacorrenteService ) { }

  ngOnInit(): void {
  }

  cadastrar(): void {
    this.contaCorrente = this.contacorrenteService.cadastrar(sessionStorage.getItem('idUsuario'))
    .subscribe(response => {
      if(response){
        this.router.navigate(['dashboard']);
      }
    });
  }

  sair(): void{
    sessionStorage.clear();
    this.router.navigate(['home']); 
  }

}


