import { Component, ViewChild, ElementRef } from '@angular/core';
import { CrudComponent, DominioEstadoTela } from 'padrao';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-cenario-regra-ncm',
  templateUrl: './cenario-regra-ncm.component.html'

})
export class CenarioRegraNcmComponent extends CrudComponent {

  listaCenarios: SelectItem[];

  // sobrescrito
  instance() {
    this.objetoSelecionado = new Object();
    this.objetoSelecionado.id = new Object();
    this.objetoSelecionado.tributoFederal = new Object();
  }

  carregarCenarios() {
    return this.httpUtilService.get("/cenario").subscribe(data => {

      let lista: any[] = data.json();

      lista.forEach(o => {
        this.listaCenarios.push({ label: o.nomeCenario, value: o.id });
      })

      // this.listaCenarios = data.json();

    });
  }

  ngOnInit() {
    this.listaCenarios = [];
    this.carregarCenarios();
    this.iniciar("/cenario-ncm");
    this.filtroPadrao = false;

    // this.cols = [
    //   { field: 'id', header: 'NCM', width: '150px' },
    //   { field: 'regraNcmLucroPresumido', subfield: 'id', subsubfield: 'id', header: 'CST PIS Ent. L.P.', width: '100px' },
    //   { field: 'regraNcmLucroReal', subfield: 'id', subsubfield: 'id', header: 'CST PIS Ent. L.R', width: '100px' },
    //   { field: 'regraNcmSimplesNacional', subfield: 'id', subsubfield: 'id', header: 'CST PIS Ent. S.N.', width: '100px' },
    // ];

    this.cols = [
      { field: 'id', header: 'NCM', width: '150px' },
      { field: 'situacaoLucroPresumido', header: 'CST PIS L.P.', width: '100px' },
      { field: 'situacaoLucroReal', header: 'CST PIS L.R', width: '100px' },
      { field: 'situacaoSimplesNacional', header: 'CST PIS S.N.', width: '100px' },
    ];

    // for (let item in DominioncmTributario) {
    //   if (isNaN(Number(item))) {

    //   }
    // }

    if (this.config.data.property != undefined){
      // alert(JSON.stringify(this.config.data.property));
      this.objetoSelecionado = this.config.data.property;
    }

    if (this.config.data != undefined && this.config.data.acao != '') {
      
      switch (this.config.data.acao) {
        case 'INSERIR': {
          this.estadoTela = DominioEstadoTela.INSERIR;
          break;
        }
        case 'ALTERAR': {
          this.estadoTela = DominioEstadoTela.ALTERAR;
          break;
        }
        case 'REMOVER': {
          this.estadoTela = DominioEstadoTela.EXCLUIR;
          break;
        }
      }
    }
  }

  getLista() {

    let options: any = {};

    if (this.campoFiltro != undefined && this.campoFiltro !== ('')) {
      options.campoFiltro = this.campoFiltro;
    }

    // if (this.filtroRegimeConfigurado != undefined && this.filtroRegimeConfigurado !== ('')) {
    //   options.filtroRegimeConfigurado = this.filtroRegimeConfigurado;
    // }

    // if (this.filtroRegimeNaoConfigurado != undefined && this.filtroRegimeNaoConfigurado !== ('')) {
    //   options.filtroRegimeNaoConfigurado = this.filtroRegimeNaoConfigurado;
    // }

    this.loading = true;

    let payload = JSON.stringify(options);

    if (payload == undefined) {
      payload = '{}';
    }

    this.httpUtilService.post(this.urlControler + "/" + this.posicaoInicial + '/' +
      this.registrosPorPagina, payload).subscribe(data => {
        this.dados = data.json();
        this.loading = false;
      });

  }

  getQuantidadeRegistros() {
    let options: any = {};

    if (this.campoFiltro != undefined && this.campoFiltro !== ('')) {
      options.campoFiltro = this.campoFiltro;
    }

    // if (this.filtroRegimeConfigurado != undefined && this.filtroRegimeConfigurado !== ('')) {
    //   options.filtroRegimeConfigurado = this.filtroRegimeConfigurado;
    // }

    // if (this.filtroRegimeNaoConfigurado != undefined && this.filtroRegimeNaoConfigurado !== ('')) {
    //   options.filtroRegimeNaoConfigurado = this.filtroRegimeNaoConfigurado;
    // }

    let payload = JSON.stringify(options);

    if(payload == undefined){
      payload = '{}';
    }

    this.httpUtilService.post(this.urlControler + '/count', payload).subscribe(data => {
      this.quantidadeRegistros = data.text();
    });

  }

  // sobrescrever quando o objeto nao tiver id
  findByPrimakey(id) {   
    this.httpUtilService.post(this.urlControler + "/findById/" ,id).subscribe(data => {
        this.objetoSelecionado = data.json();
    });
}

}
