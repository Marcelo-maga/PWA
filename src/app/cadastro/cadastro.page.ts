import { Component, OnInit } from '@angular/core';
import { IProduto } from 'src/model/IProduto.model';
import { ProdutoService } from '../services/produto.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  produto: IProduto = {
    descricao: '',
    preco: 0,
    validade: null
  };

  id = 0;

  constructor(
    private produtoService: ProdutoService,
    private router: Router,
    private activateRoute: ActivatedRoute
    ) { }

  ngOnInit() {
    this.id = Number(this.activateRoute.snapshot.paramMap.get('id'));
    console.log(this.id);
    if(this.id !== 0){
      this.produtoService.consultar(this.id).subscribe(
        retorno => {
          this.produto = retorno;
        }
      );
    }
  }

  salvar(){
    console.log(this.produto);
    if(this.validarCampos()){
      if(this.id === 0){
        this.inserir();
      }else{
        this.alterar();
      }
      this.router.navigate(['/home']);
    }
  }

  inserir(){
    this.produtoService.inserir(this.produto).subscribe(
      retorno => {
        this.produtoService.exibirToast(retorno.messagem, 'medium');
      }
    );
  }

  alterar(){
    this.produtoService.alterar(this.produto).subscribe(
      retorno => {
        this.produtoService.exibirToast(retorno.messagem, 'medium');
      }
    );
  }

  validarCampos(): boolean {
    if(this.produto.descricao === ''){
      this.produtoService.exibirToast('O campo descrição é obrigatorio!', 'danger');
      return false;
    }
    if(this.produto.preco <= 0){
      this.produtoService.exibirToast('É de graça?', 'danger');
      return false;
    }
    if(this.produto.validade == null){
      this.produtoService.exibirToast('O campo validade é obrigatorio!', 'danger');
      return false;
    }
    return true;
  }

}
