import { Component } from '@angular/core';

import { StringUtils, CrudComponent } from 'padrao';


@Component({
  selector: 'app-page-cidade',
  templateUrl: './page-cidade.component.html'

})
export class PageCidadeComponent extends CrudComponent {
    componente: any;
  listaEstados: any;
  content: any;
  idFiltro: any;
  xmunFiltro: any;
  cuFFiltro: any;


    // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {

    this.campoSelecionadoOrdenacao = 'id';
    this.camposOrdenacao.push({ label: 'Código', value: 'id' });
    this.camposOrdenacao.push({ label: 'Nome', value: 'xmun' });
    this.camposOrdenacao.push({ label: 'Estado', value: 'cuF.uf' });

    super.iniciar('/cidades');
    this.carregarEstados();
    this.cols = [
      { field: 'id', header: 'ID', width: '120px' },
      { field: 'xmun', header: 'Cidade', width: '400px' },
      { field: 'cuF', subfield: 'uf', header: 'Estado', width: '400px' }
    ];
  }

    filtrar() {

        this.filtroParametro.clear();

        if (!StringUtils.isEmpty(this.idFiltro)) {
            this.filtroParametro.addItem('id', this.idFiltro);
        }

        if (this.xmunFiltro != null) {
            this.filtroParametro.addItem('xmun', this.xmunFiltro.toString());
        }

        if (this.cuFFiltro != null) {
            this.filtroParametro.addItem('cuF', this.cuFFiltro.toString());
        }

        super.filtrar();
    }

  validar() {

    const eleme = document.getElementById('xmun_input');
    console.log('eleme ' + eleme);


    if (StringUtils.isEmpty(this.objetoSelecionado.xmun)) {
      this.showError('Nome da Cidade não informado');
      this.setarFocus('xmun_input');
      return false;
    }

    return true;
  }


  carregarEstados() {
    this.httpUtilService.get('/estados').subscribe(data => {

      this.listaEstados = data.json();

    });
  }

  acaoInserir() {

    super.acaoInserir();

    setTimeout(() => {
      this.setarFocus('xmun_input');
    }, 100);


  }

  acaoAlterar(objeto?: any) {
    super.acaoAlterar(objeto);

    setTimeout(() => {
      this.setarFocus('xmun_input');
    }, 100);
  }

}
