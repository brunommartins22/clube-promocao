import { Component } from '@angular/core';
import { CrudComponent, DominioEstadoTela } from 'padrao';

@Component({
  selector: 'app-cenario-regra-regime',
  templateUrl: './cenario-regra-regime.component.html'

})
export class CenarioRegraRegimeComponent extends CrudComponent {

  listaCenarios = [];

  ngOnInit() {
    this.iniciar("/cenario-regime");
    this.carregarCenarios();

    if (this.config.data.property != undefined){
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

  // sobrescrito
  instance() {
    this.objetoSelecionado = new Object();
    this.objetoSelecionado.tributoFederal = new Object();
  }

  acaoInserir() {
    super.acaoInserir();

    // this.objetoSelecionado.id = {regimeTributarioId: this.config.data.regimeTributarioId, cenarioId: null};
    // this.objetoSelecionado.tributoFederal = new Object();

    this.objetoSelecionado = this.config.data.property;
    // alert(JSON.stringify(this.config.data.property));
  }

  acaoAlterar(objeto?) {

    this.limparMensagem();
    if (objeto === undefined) {
      objeto = this.objetoSelecionado;
    }

    if (objeto.id !== undefined) {
      this.findByPrimakey(objeto.id);
      this.renderizarListagem = false;

      this.estadoTela = DominioEstadoTela.ALTERAR;
      this.nomeTela = this.estadoTela;
    } else {
      this.showWarn('Nenhum registro selecionado');
    }

  }

  carregarCenarios() {
    this.httpUtilService.get("/cenario").subscribe(data => {

      let lista: any[] = data.json();

      lista.forEach(o => {
        this.listaCenarios.push({ label: o.nomeCenario, value: o.id });
      })

      // this.listaCenarios = data.json();

    });
  }

  findByPrimakey(id) {
    this.httpUtilService.post(this.urlControler + '/findById', id).subscribe(data => {
      this.objetoSelecionado = data.json();
    });
  }

}
