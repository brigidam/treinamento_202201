import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesCadastrarEditarComponent } from './pages/clientes/clientes-cadastrar-editar/clientes-cadastrar-editar.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ContasComponent } from './pages/contas/contas.component';
import { ContasCadastrarEditarComponent } from './pages/contas/contas-cadastrar-editar/contas-cadastrar-editar.component';
import { ContasSacarComponent } from './pages/contas/contas-sacar/contas-sacar.component';
import { ContasDepositarComponent } from './pages/contas/contas-depositar/contas-depositar.component';
import { AgenciaComponent } from './pages/agencia/agencia.component';
import { ContasTransferirComponent } from './pages/contas/contas-transferir/contas-transferir.component';

const routes: Routes = [
  { path: 'clientes', component: ClientesComponent },
  { path: 'contas', component: ContasComponent },
  { path: 'clientes/cadastrar', component: ClientesCadastrarEditarComponent },
  { path: 'clientes/editar/:id', component: ClientesCadastrarEditarComponent },
  { path: 'contas/cadastrar', component: ContasCadastrarEditarComponent },
  { path: 'contas/editar/:id', component: ContasCadastrarEditarComponent},
  { path: 'agencia/contas/cadastrar', component: ContasCadastrarEditarComponent },
  { path: 'agencia/clientes/cadastrar', component: ClientesCadastrarEditarComponent },
  { path: 'contas/sacar/:id', component: ContasSacarComponent },
  { path: 'contas/depositar/:id', component: ContasDepositarComponent },
  { path: 'agencia', component: AgenciaComponent },
  { path: 'contas/transferir/:id', component: ContasTransferirComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
