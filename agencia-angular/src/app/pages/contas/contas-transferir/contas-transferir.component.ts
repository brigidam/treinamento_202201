import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IConta } from 'src/app/interfaces/conta';
import { Itransferencia } from 'src/app/interfaces/transferencia';
import { ContasService } from 'src/app/services/contas.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-contas-transferir',
  templateUrl: './contas-transferir.component.html',
  styleUrls: ['./contas-transferir.component.css']
})
export class ContasTransferirComponent implements OnInit {

  emptyConta: IConta = {
    id: 0,
    agencia: '',
    numero: '',
    saldo: 0,
    cliente: {
      id: 0,
      nome: '',
      cpf: '',
      email: '',
      observacoes: '',
      ativo: true
    }
  }

  formConta: FormGroup = this.preencheFormGroup(this.emptyConta);

  constructor(
    private contasService: ContasService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (id) {
      this.contasService.buscarPorId(id).subscribe((result: IConta) => {
        this.formConta = this.preencheFormGroup(result);
      }, error => {
        console.error(error);
      });
    }
  }

  preencheFormGroup(conta: IConta): FormGroup {
    return new FormGroup({
      agenciaOrigem: new FormControl(conta.agencia),
      numeroContaOrigem: new FormControl(conta.numero),
      saldo: new FormControl(conta.saldo),
      agenciaDestino: new FormControl(),
      numeroContaDestino: new FormControl(),
      valor: new FormControl(0.0)
    });
  }

  transferir() {
    const transferencia: Itransferencia = {
      agenciaOrigem: this.formConta.controls['agenciaOrigem'].value,
      numeroContaOrigem: this.formConta.controls['numeroContaOrigem'].value,
      agenciaDestino: this.formConta.controls['agenciaDestino'].value,
      numeroContaDestino: this.formConta.controls['numeroContaDestino'].value,
      valor: this.formConta.controls['valor'].value,
      
    }
   this.contasService.transferir(transferencia).subscribe((result) => {
     Swal.fire('Sucesso', 'Transferência feita com sucesso!', 'success');
     this.router.navigate(['/contas']);
   });
 }
}
