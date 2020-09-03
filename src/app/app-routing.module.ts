import { ContaCorrenteComponent } from './conta-corrente/conta-corrente.component';
import { HomeComponent } from './views/home/home.component';
import { CadastroClienteComponent } from './cadastro-cliente/cadastro-cliente.component';
import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DasboardComponent } from './dasboard/dasboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home' , component: HomeComponent
  },
  {
     path: 'dashboard', component: DasboardComponent 
  },
  {
    path: 'cadastroCliente',  component: CadastroClienteComponent
  },
  {
    path: 'aberturaDeCC', component: ContaCorrenteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
