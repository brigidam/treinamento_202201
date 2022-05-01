import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IConta } from 'src/app/interfaces/conta';
import { Ideposito } from 'src/app/interfaces/deposito';
import { ContasService } from 'src/app/services/contas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contas-depositar',
  templateUrl: './contas-depositar.component.html',
  styleUrls: ['./contas-depositar.component.css']
})
export class ContasDepositarComponent implements OnInit {

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
      agencia: new FormControl(conta.agencia),
      numero: new FormControl(conta.numero),
      valor: new FormControl(0.0)
    });
  }

  confirmar() {
    const deposito: Ideposito = {
      agencia: this.formConta.controls['agencia'].value,
      numeroConta: this.formConta.controls['numero'].value,
      valor: this.formConta.controls['valor'].value,
   }
    this.contasService.depositar(deposito).subscribe((result) => {
      Swal.fire('Sucesso', 'Depositado com sucesso!', 'success');
      this.router.navigate(['/contas']);
    });
  }
}
