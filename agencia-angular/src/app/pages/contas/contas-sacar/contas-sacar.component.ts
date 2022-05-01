import { Component, OnInit } from '@angular/core';
import { ContasService } from 'src/app/services/contas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IConta } from 'src/app/interfaces/conta';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { Isaque } from 'src/app/interfaces/saque';

@Component({
  selector: 'app-contas-sacar',
  templateUrl: './contas-sacar.component.html',
  styleUrls: ['./contas-sacar.component.css']
})
export class ContasSacarComponent implements OnInit {

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
      saldo: new FormControl(conta.saldo),
      valor: new FormControl(0.0)
    });
  }

  sacar() {
     const saque: Isaque = {
        agencia: this.formConta.controls['agencia'].value,
        numeroConta: this.formConta.controls['numero'].value,
        valor: this.formConta.controls['valor'].value,
     }
    this.contasService.sacar(saque).subscribe((result) => {
      Swal.fire('Sucesso', 'Saque com sucesso!', 'success');
      this.router.navigate(['/contas']);
    });
  }
}





