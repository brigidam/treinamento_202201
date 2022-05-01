import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ContasComponent } from './pages/contas/contas.component';
import { HttpClientModule } from '@angular/common/http';
import { ClientesCadastrarEditarComponent } from './pages/clientes/clientes-cadastrar-editar/clientes-cadastrar-editar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContasCadastrarEditarComponent } from './pages/contas/contas-cadastrar-editar/contas-cadastrar-editar.component';
import { ContasSacarComponent } from './pages/contas/contas-sacar/contas-sacar.component';
import { ContasDepositarComponent } from './pages/contas/contas-depositar/contas-depositar.component';
import { AgenciaComponent } from './pages/agencia/agencia.component';
import { ContasTransferirComponent } from './pages/contas/contas-transferir/contas-transferir.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ClientesComponent,
    ContasComponent,
    ClientesCadastrarEditarComponent,
    ContasCadastrarEditarComponent,
    ContasSacarComponent,
    ContasDepositarComponent,
    AgenciaComponent,
    ContasTransferirComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, 
    Ng2SearchPipeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
