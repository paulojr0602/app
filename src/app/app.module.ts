import { UtilService } from './providers/services/util.service';
import { ClienteService } from './providers/services/cliente.service';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroClienteComponent } from './cadastro-cliente/cadastro-cliente.component';
import { ContaCorrenteComponent } from './conta-corrente/conta-corrente.component';
import { DasboardComponent } from './dasboard/dasboard.component';
import { HomeComponent } from './views/home/home.component';
import { MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import { MessagesComponent } from './messages/messages.component';


@NgModule({
  declarations: [
    AppComponent,
    CadastroClienteComponent,
    ContaCorrenteComponent,
    DasboardComponent,
    HomeComponent,
    MessagesComponent   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatToolbarModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    MatCardModule
  ],
  providers: [ClienteService, UtilService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
