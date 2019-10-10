import { Injectable } from '@angular/core';
import { HttpUtilService, AuthenticationService } from 'padrao';
import { stringify } from 'querystring';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private httpUtilService: HttpUtilService, private authenticationService: AuthenticationService) { }

  public tipoMenu: string;
  public tipoLayout: string;

  informarTipoMenu(tipoMenu: string) {
    let idUsuario = this.authenticationService.authUser.id;
    this.httpUtilService.get("/usuarios/informarTipoMenu/" + idUsuario + "/" + tipoMenu)
      .subscribe(data => { });
  }

  informarTipoLayout(tipoLayout: string) {
    let idUsuario = this.authenticationService.authUser.id;
    this.httpUtilService.get("/usuarios/informarTipoLayout/" + idUsuario + "/" + tipoLayout)
      .subscribe(data => { });
  }


}
