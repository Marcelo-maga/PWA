import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { IProduto } from 'src/model/IProduto.model';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  url = 'http://localhost/PHP_API/produto/';
  constructor(
    private http: HttpClient,
    private toastController: ToastController
    ) { }

  listar(): Observable<IProduto[]> {
    return this.http.get<IProduto[]>(this.url).pipe(
      map(retorno => retorno),
      catchError(erro => this.exibeErro(erro))
    );
  }

  inserir(produto): Observable<any> {
    return this.http.post(this.url + 'inserir/', produto).pipe(
      map(retorno => retorno),
      catchError(erro => this.exibeErro(erro))
    );
  }

  consultar(id): Observable<IProduto>{
    return this.http.get<IProduto>(this.url + id).pipe(
      map(retorno => retorno),
      catchError(erro => this.exibeErro(erro))
    );
  }

  alterar(produto): Observable<any>{
    return this.http.put(this.url + 'alterar/', produto).pipe(
      map(retorno => retorno),
      catchError(erro => this.exibeErro(erro))
    );
  }

  async exibirToast(messagem, cor){
    const toast = await this.toastController.create(
      {
        message: messagem,
        duration: 2000,
        color: cor,
        position: 'bottom'
      }
    );
    toast.present();
  }

  exibeErro(erro): Observable<any>{
    console.log(erro);
    return null;
  }

}
