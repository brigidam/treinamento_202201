import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IConta } from '../interfaces/conta';
import { Isaque } from '../interfaces/saque';
import { Ideposito } from '../interfaces/deposito';
import { Itransferencia } from '../interfaces/transferencia';

@Injectable({
  providedIn: 'root'
})
export class ContasService {
  api = environment.api;
  endpoint = 'contas';
  constructor(private http: HttpClient) { }

  listarContas() {
    return this.http.get<IConta[]>(`${this.api}/${this.endpoint}/`);
  }

  buscarPorId(id: number): Observable<IConta> {
    return this.http.get<IConta>(`${this.api}/${this.endpoint}/${id}`);
  }

  sacar(saque: Isaque) {
    return this.http.put(`${this.api}/${this.endpoint}/saque`, saque);
  }

  depositar(deposito: Ideposito) {
    return this.http.put(`${this.api}/${this.endpoint}/deposito`, deposito);
  }

  transferir(transferencia: Itransferencia) {
    return this.http.put(`${this.api}/${this.endpoint}/transferencia`, transferencia);
  }

  salvar(conta: IConta) {
    return this.http.post(`${this.api}/${this.endpoint}/`, conta);
  }

  remover(id: number) {
    return this.http.delete(`${this.api}/${this.endpoint}/${id}`);
  }

}
