import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpUtilService, AuthenticationService } from 'padrao';

@Component({
  selector: 'app-liberacao',
  templateUrl: './liberacao.component.html'
})
export class liberacaoComponent implements OnInit {

  constructor(private http: HttpUtilService, private auth: AuthenticationService, private router: Router) { }

  documento;

  ngOnInit() {
    
  }

  getLib(){
    this.auth.getLiberacao(this.documento).subscribe(res =>{
    
    });
  }

  // teste(){
  //   this.http.post('http://interagese.com.br/validacaojson/index.php', [{"login":"WEBSERV", "senha":"webservice", "documento":"14.592.78/0001-10"}])
  //   .subscribe(res => {
  
  //   });
  // }

}
