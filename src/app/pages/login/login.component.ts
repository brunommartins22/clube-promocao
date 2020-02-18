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
  primeiroAcesso: boolean;
  cnpj: string;
  loading: boolean = false;

  constructor(private auth: AuthenticationService, private router: Router) {

    this.loading = true;
    this.processando = false;

    this.loadPrimeiroAcesso();
  }

  ngOnInit() {

    this.credentials = new Credentials();

  }

  private loadPrimeiroAcesso() {
    this.auth.isPrimeiroAcesso().subscribe(data => {
      this.primeiroAcesso = data.json();
      let idFocus = "";
      if (!this.primeiroAcesso) {
        idFocus = "login";
      } else {
        this.cnpj = null;
        idFocus = "cnpj_id"
      }
      setTimeout(() => {
        document.getElementById(idFocus).focus();
        this.loading = false;
      }, 100);

    })
  }


  private validationPrimeiroAcesso(objeto: string) {
    this.loading = true;
    this.auth.validarPrimeiroAcesso(objeto).subscribe(data => {
      this.loading = false;
      if (data.json().hasOwnProperty('errorCode')) {
        this.showError(data.text());
      } else {
        let resp = data.json();
        if (resp) {
          this.primeiroAcesso = false;
          setTimeout(() => {
            document.getElementById("login").focus();
          }, 100);
          this.msgs.push({ severity: 'success', summary: '', detail: 'Empresa autorizada com sucesso.' })
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        } else {
          this.showError("Empresa não autorizada para uso do sistema.");
        }
      }

    }, erro => {
      this.loading = false;
      this.showError(erro.message);
    })
  }


  logar() {
    this.msgs = [];
    if (!this.primeiroAcesso) {
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
      
      this.loading = true;

      this.processando = true;
      this.auth.login(this.credentials).subscribe(
        result => {
          this.loading = false;
          this.processando = false;
          if (result) {
            this.router.navigate(['/sys']);
          } else {
            this.showError("Falha na autenticação");

            setTimeout(() => {
              document.getElementById("login").focus();
            }, 100);

          }
        },
        error => {
          this.loading = false;
          this.processando = false;
          this.showError("Falha na autenticação");


          setTimeout(() => {
            document.getElementById("login").focus();
          }, 100);


        },
      );
    } else {
      if (StringUtils.isEmpty(this.cnpj)) {
        this.showError("CNPJ não informado.");
        return;
      }

      this.validationPrimeiroAcesso(this.cnpj);
    }
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
