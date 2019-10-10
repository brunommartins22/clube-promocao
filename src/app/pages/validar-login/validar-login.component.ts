import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Credentials, AuthenticationService, StringUtils, HttpUtilService } from 'padrao';
import { Message, MessageService } from 'primeng/components/common/api';

@Component({
  selector: 'app-validar-login',
  templateUrl: './validar-login.component.html'
})
export class validarLoginComponent implements OnInit {

  credentials: Credentials;
  msgs: Message[] = [];

  constructor(
    private auth: AuthenticationService, 
    private router: Router, 
    private util: HttpUtilService, 
    public messageService: MessageService) { }

  ngOnInit() {
    this.credentials = new Credentials();
  }

  logar() {

    this.credentials.login = this.auth.getAuthenticatedUser().login;

    if (StringUtils.isEmpty(this.credentials.password)) {
      this.showError("Senha não informada");
      return;
    }

    this.auth.login(this.credentials).subscribe(
      result => {
        if(result){
          this.util.showLogin = false;
        } else {
          this.showError("Falha na autenticação");  
        }
        
      },
      error => {

        this.showError("Falha na autenticação");

        setTimeout(() => {
          //window.location.reload();
        }, 3000);
      },
    );

  }

  showError(mensagem) {
    this.messageService.add({severity:'error', summary:'Erro', detail:mensagem});
  }

  desLogar() {
    this.auth.logout();
  }
}