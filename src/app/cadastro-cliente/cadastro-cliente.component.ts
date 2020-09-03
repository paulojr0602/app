import { MessageService } from './../providers/services/message.service';
import { ClienteService } from '../providers/services/cliente.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css']
})
export class CadastroClienteComponent implements OnInit {
  CadClienteForm: FormGroup;
  public cliente: iCliente;
  constructor(private fb: FormBuilder,
              private router : Router,
              private clienteService : ClienteService,
              public messageService:  MessageService ) {
              
                this.createForm();
               }

  ngOnInit(): void {
  }

  createForm() {
    this.CadClienteForm = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required ],
      senha: ['', Validators.required ]
    });
  }

  cadastrar(): void {
      if (!this.CadClienteForm) { return; }
      this.clienteService.cadastrar(this.CadClienteForm.value)
        .subscribe(newCliente => {
          if(!newCliente){ return; }
          sessionStorage.setItem('idUsuario', newCliente.id);
          sessionStorage.setItem('nome', newCliente.nome);
          sessionStorage.setItem('cpf', newCliente.cpf);
          this.cliente = newCliente;
          this.router.navigate(['aberturaDeCC']);
        });
    }
}
export interface iCliente {
  id: string;
  nome: string;
  cpf: string;
  senha: string;
}