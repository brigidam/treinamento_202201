import { Component, OnInit } from '@angular/core';
import { IConta } from 'src/app/interfaces/conta';
import { ContasService } from 'src/app/services/contas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contas',
  templateUrl: './contas.component.html',
  styleUrls: ['./contas.component.css']
})
export class ContasComponent implements OnInit {

  constructor(private contaService: ContasService) { }
  filterTerm!: string;
  contas: IConta[] = [];

  ngOnInit(): void {
    this.listarTodos();
  }

  listarTodos() {
    this.contaService.listarContas().subscribe((result: IConta[]) => {
      this.contas = result;
      console.log(this.contas);
    });
  }

  confirmar(id: number) {
    Swal.fire({
      title: 'Você está certo disso?',
      text: "Tem certeza que deseja remover esta conta?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Remover',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.contaService.remover(id).subscribe(() => {
          Swal.fire({
            title: 'Removido',
            text: "Conta removida com sucesso!",
            icon: 'success',
          });
          this.listarTodos();
        }, error => {
          console.error(error);
        });
      }
    })
  }
}
