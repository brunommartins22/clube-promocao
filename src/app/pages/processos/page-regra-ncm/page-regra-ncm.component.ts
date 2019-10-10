import { Component, ViewChild, ElementRef } from '@angular/core';
import { CrudComponent, DominioEstadoTela } from 'padrao';
import { map } from 'rxjs/operators';
import { CstService } from '../../../services/cst.service';
import { SelectItem } from 'primeng/api';
import { isNumber } from 'util';
import { PageClienteComponent } from '../../page-cliente/page-cliente.component';

@Component({
    selector: 'app-page-regra-ncm',
    templateUrl: './page-regra-ncm.component.html'

})
export class PageRegraNcmComponent extends CrudComponent {

    regime = [];

    disableId = false;

    listaCenarios = [];

    cstService = new CstService();

    listaCSTPisCofins: SelectItem[];

    listaCSTIPISaida: SelectItem[];

    listaCSTICMSSaida: SelectItem[];

    @ViewChild('content', { static: true }) content: ElementRef;

     //*************************** loading methods *********************************
     carregarRegimeTributario() {
        this.regime = [{ label: 'Selecione...', value: null },
        { label: 'Lucro Real', value: 'LUCROREAL' },
        { label: 'Lucro Presumido', value: 'LUCROPRESUMIDO' },
        { label: 'Simples Nacional', value: 'SIMPLESNACIONAL' }];
    }

    carregarCenarios() {

        this.httpUtilService.get('/cenario').subscribe(data => {

            const lista: any[] = data.json();
            this.listaCenarios = new Array();

            this.listaCenarios.push({ label: 'Todos', value: null });

            lista.forEach(o => {
                this.listaCenarios.push({ label: o.nomeCenario, value: o });
            });
        });

    }
    //*************************** end loading methods *********************************

    // sobrescrito
    instance() {

        this.objetoSelecionado = new Object();
        this.objetoSelecionado.tributoFederalPadrao = new Object();
        this.objetoSelecionado.tributoEstadualPadrao = new Object();
        this.objetoSelecionado.cliente = new Object();

    }

    // sobrescrito
    acaoInserir() {
        super.acaoInserir();
        if (this.objetoSelecionado.regimeTributario === undefined) {
            this.objetoSelecionado.regimeTributario = null;
        }
        if (this.objetoSelecionado.cenario === undefined) {
            this.objetoSelecionado.cenario = null;
        }
    }

    // sobrescrito
    acaoAlterar() {
        if (this.config !== undefined) {
            if (this.config.data !== undefined && this.config.data.property !== undefined) {
                this.objetoSelecionado = this.config.data.property;
            }
        }
        super.acaoAlterar();
        if (this.objetoSelecionado.cenario === undefined) {
            this.objetoSelecionado.cenario = null;
        }
    }

    // tslint:disable-next-line:use-lifecycle-interface
    ngOnInit() {
        this.listaCSTPisCofins = this.cstService.carregarCSTPisCofins();
        this.listaCSTIPISaida = this.cstService.carregarCSTIPISaida();
        this.listaCSTICMSSaida = this.cstService.carregarCSTIcms();

        this.campoSelecionadoOrdenacao = 'ncm';
        this.camposOrdenacao.push({ label: 'NCM', value: 'ncm' });
        this.camposOrdenacao.push({ label: 'Regime', value: 'regimeTributario' });
        this.camposOrdenacao.push({ label: 'Cenario', value: 'cenario' });

        this.cols = [
            { field: 'ncm', header: 'NCM', width: '150px' },
            { field: 'nomeRegime', header: 'Regime', width: '150px' },
            { field: 'nomeCenario', header: 'Cenario', width: '250px' },
            { field: 'nomeCliente', header: 'Cliente', width: '350px' },
            // { field: 'tributoFederalPadrao', subfield: 'cstPisEntrada', header: 'CST PIS Ent.', width: '100px' },
            // { field: 'tributoFederalPadrao', subfield: 'aliquotaPisEntrada', header: 'Al. PIS Ent', width: '100px' },
            { field: 'tributoFederalPadrao', subfield: 'cstPisSaidaPadrao', header: 'CST PIS', width: '100px' },
            { field: 'tributoFederalPadrao', subfield: 'aliquotaPisSaidaPadrao', header: 'Al. PIS', width: '100px', decimal: true },
            // { field: 'tributoFederalPadrao', subfield: 'cstCofinsEntrada', header: 'CST COFINS Ent.', width: '120px' },
            // { field: 'tributoFederalPadrao', subfield: 'aliquotaCofinsEntrada', header: 'Al. COFINS Ent.', width: '120px' },
            { field: 'tributoFederalPadrao', subfield: 'cstCofinsSaidaPadrao', header: 'CST COFINS', width: '120px' },
            { field: 'tributoFederalPadrao', subfield: 'aliquotaCofinsSaidaPadrao', header: 'Al. COFINS', width: '100px', decimal: true },
            // { field: 'tributoFederalPadrao', subfield: 'cstIpiEntrada', header: 'CST IPI Ent.', width: '100px' },
            // { field: 'tributoFederalPadrao', subfield: 'aliquotaIpiEntrada', header: 'Al. IPI Ent.', width: '100px' },
            { field: 'tributoFederalPadrao', subfield: 'cstIpiSaidaPadrao', header: 'CTS IPI', width: '100px' },
            { field: 'tributoFederalPadrao', subfield: 'aliquotaIpiSaidaPadrao', header: 'Al. IPI', width: '100px', decimal: true },
            { field: 'tributoEstadualPadrao', subfield: 'cstIcmsSaidaPadrao', header: 'CTS ICMS', width: '100px' },
            { field: 'tributoEstadualPadrao', subfield: 'aliquotaIcmsSaidaPadrao', header: 'Al. ICMS', width: '100px' },
        ];

        this.iniciar('/regra-ncm');

        this.carregarRegimeTributario();
        this.carregarCenarios();

        setTimeout(() => {
            if (this.config !== undefined) {
                if (this.config.data !== undefined && this.config.data.property !== undefined) {
                    this.objetoSelecionado = this.config.data.property;
              
                    if (this.config.data.acao !== '') {

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
            }
        }, 100);
    }

    validar(): boolean {

        if (this.objetoSelecionado.ncm == null || this.objetoSelecionado.ncm === undefined) {
            this.showWarn('Informe o Ncm');
            return false;
        }

        if (isNaN(this.objetoSelecionado.ncm.replace('.', ''))) {
            this.showWarn('Ncm Invalido');
            return false;
        }

        if (Object.keys(this.objetoSelecionado.tributoFederalPadrao).length === 0) {
            this.showWarn('Preencha os tributos');
            return false;
        }

        if (this.objetoSelecionado.tributoFederalPadrao.cstPisSaidaPadrao === undefined
            || this.objetoSelecionado.tributoFederalPadrao.cstPisSaidaPadrao === null) {
            this.showWarn('Selecione um CST do PIS');
            return false;
        }

        if (this.objetoSelecionado.tributoFederalPadrao.cstCofinsSaidaPadrao === undefined
            || this.objetoSelecionado.tributoFederalPadrao.cstCofinsSaidaPadrao === null) {
            this.showWarn('Selecione um CST do COFINS');
            return false;
        }

        if (this.objetoSelecionado.tributoFederalPadrao.cstIpiSaidaPadrao === undefined
            || this.objetoSelecionado.tributoFederalPadrao.cstIpiSaidaPadrao === null) {
            this.showWarn('Selecione um CST do IPI');
            return false;
        }

        if (this.objetoSelecionado.tributoEstadualPadrao.cstIcmsSaidaPadrao === undefined
            || this.objetoSelecionado.tributoEstadualPadrao.cstIcmsSaidaPadrao === null) {
            this.showWarn('Selecione um CST do ICMS');
            return false;
        }

        if (this.objetoSelecionado.cliente.id !== undefined && this.objetoSelecionado.regimeTributario !== null
            && this.objetoSelecionado.regimeTributario !== undefined) {

            this.showWarn('Não é possível definir uma regra informando um regime e um cliente.');
            return false;
        }

        if (this.objetoSelecionado.cliente.id === undefined || this.objetoSelecionado.cliente.id === null
            || this.objetoSelecionado.cliente.id === '') {
            this.objetoSelecionado.cliente = new Object();
        }

        return true;
    }

    setObjeto(objeto: any) {
        this.objetoSelecionado = objeto;
        if (objeto.cliente === undefined) {
            this.objetoSelecionado.cliente = new Object();
        }
    }

    findByPrimakey(id) {
        this.httpUtilService.get(this.urlControler + '/' + id).subscribe(data => {
            const pro = data.json();

            if (pro.cliente === undefined) {
                pro.cliente = new Object();
            }

            this.objetoSelecionado = pro;
        });
    }

    openModalCliente() {
        this.f11Ativo = false;
        this.modalRef = this.modal(PageClienteComponent, 'Cliente', {});
        this.modalRef.onClose.subscribe(res => {
            this.objetoSelecionado.cliente = this.dialogService.dialogComponentRef.instance
                .componentRef.instance.objetoSelecionado;
            this.objetoSelecionado.regimeTributario = null;
            this.f11Ativo = true;
        });
    }

    selecionarCliente() {
        alert(this.objetoSelecionado.cliente.id);
        if (this.objetoSelecionado.cliente.id !== undefined) {
            this.httpUtilService.get('/clientes/' + this.objetoSelecionado.cliente.id).subscribe(data => {
                // alert(data.text());

                if (data.text() === '') {
                    this.showError('Cliente não encontrado');
                    this.objetoSelecionado.cliente.id = null;
                } else {
                    this.objetoSelecionado.cliente = data.json();
                    this.objetoSelecionado.regimeTributario = null;
                }

            });
        }
    }

    selecionarRegime() {
        if (this.objetoSelecionado.regimeTributario != null) {
            this.objetoSelecionado.cliente = new Object();
        }
    }
}
