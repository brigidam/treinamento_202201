import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICliente } from 'src/app/interfaces/cliente';
import { IConta } from 'src/app/interfaces/conta';
import { ClientesService } from 'src/app/services/clientes.service';
import { ContasService } from 'src/app/services/contas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contas-cadastrar-editar',
  templateUrl: './contas-cadastrar-editar.component.html',
  styleUrls: ['./contas-cadastrar-editar.component.css']
})
export class ContasCadastrarEditarComponent implements OnInit {
 
  constructor(private clienteService: ClientesService,
              private contaService: ContasService,
              private router: Router,
              private activatedRoute: ActivatedRoute ) {}

  formConta: FormGroup = this.preencheFormGroup();

  clientes: ICliente[] = [];

  ngOnInit(): void {
    this.listarTodos()
  }

  listarTodos() {
    this.clienteService.listarTodosClientes().subscribe((result: ICliente[]) => {
      this.clientes = result;
    });
  }

  preencheFormGroup(): FormGroup {
    return new FormGroup({
      id: new FormControl(''),
      agencia: new FormControl(''),
      numero: new FormControl(''),
      saldo: new FormControl(),
      idCliente: new FormControl()
    });
  }

  enviar() {
      const conta: IConta = {
      id: 0,
      agencia: this.formConta.controls['agencia'].value,
      numero: this.formConta.controls['numero'].value,
      saldo: this.formConta.controls['saldo'].value,
      cliente: { id: this.formConta.controls['idCliente'].value } as ICliente
    }
    console.log(conta)
    this.contaService.salvar(conta).subscribe((result) => {
      Swal.fire('Conta Cadastrada', 'Cadastrada com sucesso!', 'success');
      this.router.navigate(['/contas']);
    });
  }
} 

