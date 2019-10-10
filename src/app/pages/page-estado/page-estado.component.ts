import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MessageService } from 'primeng/components/common/messageservice';
import { PageCidadeComponent } from '../page-cidade/page-cidade.component';
import { environment } from 'src/environments/environment';
import { CrudComponent } from 'padrao';


@Component({
  selector: 'app-page-estado',
  templateUrl: './page-estado.component.html'

})
export class PageEstadoComponent extends CrudComponent {

  public pageCidade: PageCidadeComponent;
  public listaCidade: any;

  ngOnInit() {
    super.iniciar("/clientes");
  }

  carregarCidadeByEstado(){

  }



}
