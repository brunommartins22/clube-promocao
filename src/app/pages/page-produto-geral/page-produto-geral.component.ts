import { Component } from '@angular/core';
import { CrudComponent, StringUtils } from 'padrao';
@Component({
  selector: 'app-page-produto-geral',
  templateUrl: './page-produto-geral.component.html'
})
export class PageProdutoGeralComponent extends CrudComponent {
  ngOnInit() {
    super.iniciar("/produtos");
    this.cols = [
      { field: "id", header: "ID", width: "120px" },
      { field: "nomeProduto", header: "Nome do Produto", width: "500px" },
      { field: "ean", header: "EAN", width: "100px" },
      { field: "ncm", header: "NCM", width: "100px" },
      { field: "cest", header: "CEST", width: "100px" },
    ];

  }
  validar() {
    if (StringUtils.isEmpty(this.objetoSelecionado.nomeProduto)) {
      this.showError("Nome do Produto não informado!");
      this.setarFocus("nomeProduto");
      return false;
    }

    if (this.objetoSelecionado.ean == null) {
      this.showError("EAN não informado!");
      this.setarFocus("ean");
      return false;
    }

    if (StringUtils.isEmpty(this.objetoSelecionado.ncm)) {
      this.showError("NCM não informado!");
      this.setarFocus("ncm");
      return false;
    }
    if (StringUtils.isEmpty(this.objetoSelecionado.cest)) {
      this.showError("CEST não informado!");
      this.setarFocus("cest");
      return false;
    }
    return true;
  }
}
