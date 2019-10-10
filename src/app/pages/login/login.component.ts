import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Credentials, AuthenticationService, StringUtils } from 'padrao';
import { Cookie } from 'ng2-cookies';
import { Message } from 'primeng/components/common/api';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  credentials: Credentials;
  msgs: Message[] = [];
  processando: boolean;

  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.credentials = new Credentials();
    this.processando = false;
    document.getElementById("login").focus();
  }

  logar() {


    if (StringUtils.isEmpty(this.credentials.login)) {
      this.showError("Usuário não informado");
      document.getElementById("login").focus();
      return;
    }

    if (StringUtils.isEmpty(this.credentials.password)) {
      this.showError("Senha não informada");
      document.getElementById("password").focus();
      return;
    }

    this.credentials.password = this.credentials.password.toUpperCase();

    this.processando = true;
    this.auth.login(this.credentials).subscribe(
      result => {
        this.processando = false;
        this.router.navigate(['/sys']);
      },
      error => {
        this.processando = false;
        this.showError("Falha na autenticação");


        setTimeout(() => {
          document.getElementById("login").focus();
        }, 100);


      },
    );


  }

  logarCookie() {
    let cookies = Cookie.getAll();
    let sessionId: string = cookies.sessionId;

    if (sessionId != null && sessionId.length > 0) {
      this.auth.loginWithCookie(sessionId).subscribe(e => {
        if (e) {
          this.router.navigate(['/sys']);
        } else {
          this.router.navigate(['/login']);
        }
      });
    }
  }

  showError(mensagem) {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'Erro: ', detail: mensagem });
  }
}
