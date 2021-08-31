import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContarService {

  url = 'http://localhost/PHP_API/contar';

  constructor(
    private http: HttpClient,
    private toastController: ToastController,
    private alertController: AlertController
  ) { }

  contar(): Observable<any> {
    console.log('Contar');
    return this.http.get(this.url).pipe(
      map(retorno => retorno),
      catchError(error => this.exibirErro(error))
    );
  }

  async exibirErroAlerta(erro){
    const alert = await this.alertController.create(
      {
        cssClass: 'my-custom-class',
        header: 'Erro',
        message: 'Erro ao consultar a API' + erro,
        buttons: ['Ok']
      }
    );
    await alert.present();
  }

  async exibirErroToast(erro){
    console.log('Erro', erro);
      const toast = await this.toastController.create(
        {
          message: 'Erro ao consultar a API <br>' + erro.message,
          duration: 2000,
          color: 'danger',
          position: 'bottom'
        }
      );
      toast.present();
  }

  exibirErro(erro){
    console.log('Error => ', erro);
    return null;
  }

}
