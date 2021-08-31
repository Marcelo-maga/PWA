import { Component } from '@angular/core';
import { ContarService } from '../services/contar.service';
import { ProdutoService } from '../services/produto.service';
import { Observable } from 'rxjs';
import { IProduto } from 'src/model/IProduto.model';
import { delay } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  quantidade = 0;
  listaProduto: Observable<IProduto[]>;
  constructor(
    private contarService: ContarService,
    private produtoService: ProdutoService,
    private router: Router
    ) {
    this.contarService.contar().subscribe(
      (dados) => {
        this.quantidade = dados.quantidade;
        console.log('Quantidade', this.quantidade);
      }
    );
    this.atualizar();
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  mostraAdd = true;

  onDrag(event){
    this.mostraAdd = !(event.detail.ratio > 0.5);
  }

  mostrarBotao(){
    this.mostraAdd = true;
  }

  atualizar(){
    this.listaProduto = this.produtoService.listar().pipe(delay(1000));
  }

  editar(id){
    this.router.navigate(['/cadastro/' + id]);
    this.atualizar();
    this.mostrarBotao();
  }
}
