import { MessageService } from './../../providers/services/message.service';
import { ClienteService } from './../../providers/services/cliente.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ngOnInit(): void {
  }

  homeForm: FormGroup;
  usuario:  iCliente;

  constructor(private fb: FormBuilder,
              private router: Router,
              private clienteService: ClienteService,
              private messageService: MessageService) {
    this.createForm();
  }

  createForm() {
    this.homeForm = this.fb.group({
      cpf: ['', Validators.required ],
      senha: ['', Validators.required ]
    });
  }

  login(): void {
    if(!this.homeForm.value.cpf) { return; }
    this.usuario = this.homeForm.value;
    this.clienteService.login(this.homeForm.value.cpf)
    .subscribe(cliente => {
      if(cliente){
        if(cliente.senha == this.usuario.senha){
          sessionStorage.setItem('idUsuario', cliente.id);
          sessionStorage.setItem('nome', cliente.nome);
          sessionStorage.setItem('cpf', cliente.cpf);
          this.router.navigate(['dashboard']);
        }else {
          this.messageService.add("Autenticaoção falhou. CPF ou senha inválidos!");
        }
      }else {
        this.messageService.add("Autenticaoção falhou. CPF ou senha inválidos!");
      }
   });
 }

  cadastrar(){
    sessionStorage.clear();
    this.router.navigate(['cadastroCliente']);
  }

}
export interface iCliente {
  id: string;
  nome: string;
  cpf: string;
  senha: string;
}
