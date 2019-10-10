import {Component} from '@angular/core';
import {CrudComponent, StringUtils} from 'padrao';
import {SelectItem} from 'primeng/api';


@Component({
    selector: 'app-page-cenario',
    templateUrl: './page-cenario.component.html',
})
export class PageCenarioComponent extends CrudComponent {

    listaEstados: SelectItem[];


    // tslint:disable-next-line:use-lifecycle-interface
    ngOnInit() {
        this.campoSelecionadoOrdenacao = 'id';
    this.camposOrdenacao.push({ label: 'Código', value: 'id' });
    this.camposOrdenacao.push({ label: 'Nome', value: 'nomeCenario' });
    this.camposOrdenacao.push({ label: 'Estado', value: 'estado.uf' });
        super.iniciar('/cenario');
        this.carregarEstados();
        this.cols = [
            {field: 'id', header: 'Codigo', width: '80px'},
            {field: 'nomeCenario', header: 'Descrição', width: '300px'},
            {field: 'estado', subfield: 'uf', header: 'Estado Emitente', width: '120px'}
        ];

    }

    validar() {

        if (this.objetoSelecionado.estado == null) {
            this.showError('Estado não informado');
            this.setarFocus('estado');
            return false;
        }

        if (StringUtils.isEmpty(this.objetoSelecionado.nomeCenario)) {
            this.showError('Preencha o nome');
            this.setarFocus('nomeCenario_input');
            return false;
        }

        return true;
    }

    carregarEstados() {
        this.httpUtilService.get('/estados').subscribe(data => {

            this.listaEstados = [{label: 'Selecione ...', value: null}];

            const lista: any[] = data.json();

            lista.forEach(estado => {
                this.listaEstados.push({label: estado.uf, value: estado});
            });
        });
    }

    acaoInserir(): void {
        super.acaoInserir();
        this.setarFocus('estado');
    }

    acaoAlterar(objeto?: any): void {
        super.acaoAlterar(objeto);
        this.setarFocus('estado');
    }

}
