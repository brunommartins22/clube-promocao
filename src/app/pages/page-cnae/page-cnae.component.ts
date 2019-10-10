import {Component} from '@angular/core';
import {CrudComponent, StringUtils} from 'padrao';

@Component({
    selector: 'app-page-cnae',
    templateUrl: './page-cnae.component.html',
})
export class PageCnaeComponent extends CrudComponent {

    // tslint:disable-next-line:use-lifecycle-interface
    ngOnInit() {
        super.iniciar('/cnae');

        this.campoSelecionadoOrdenacao = 'descricao';
        this.camposOrdenacao.push({label: 'Descrição', value: 'descricao'});
        this.camposOrdenacao.push({label: 'Cóodigo', value: 'codigo'});

        this.cols = [
            {field: 'id', header: 'ID', width: '80px' },
            {field: 'codigo', header: 'codigo', width: '150px'},
            {field: 'descricao', header: 'Descrição'},
        ];

    }

    validar() {

        if (this.objetoSelecionado.codigo == null) {
            this.showError('codigo não informado');
            this.setarFocus('codigo');
            return false;
        }

        if (StringUtils.isEmpty(this.objetoSelecionado.descricao)) {
            this.showError('Preencha a descrição');
            this.setarFocus('descricao');
            return false;
        }

        return true;
    }

    acaoInserir(): void {
        super.acaoInserir();
        this.setarFocus('codigo');
    }

    acaoAlterar(objeto?: any): void {
        super.acaoAlterar(objeto);
        this.setarFocus('codigo');
    }

}
