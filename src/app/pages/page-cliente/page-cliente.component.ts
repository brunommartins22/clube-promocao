import { Component } from '@angular/core';
import { CrudComponent, FiltroParametro, StringUtils } from 'padrao';
import { PageCidadeComponent } from '../page-cidade/page-cidade.component';
import { PageCenarioComponent } from '../page-cenario/page-cenario.component';
import { PageCnaeComponent } from '../page-cnae/page-cnae.component';

@Component({
    selector: 'app-page-cliente',
    templateUrl: './page-cliente.component.html',
})
export class PageClienteComponent extends CrudComponent {
    pessoas = [];
    regimes = [];

    cols2: any[];

    listaEstado: any;
    listaCidade: any;

    activeIndex: number;

    codigoFiltro: number;
    nomeFiltro: string;
    tipoPessoaFiltro: string;

    listaCenarios = [];
    cenarioComboSelecionado: any;
    cenarioSelecionado: any;
    renderizarCenario: any;
    statusCenario: string;

    colsAtividade: any[];

    atividadeSelecionada: any;
    cnaeSelecionado: any;
    renderizarAtividade: any;
    statusAtividade: string;

    historicoArquivos = false;
    arquivosEnviados = [];
    processandoArquivos = false;

    private carregarPessoas() {
        this.pessoas.push({ label: 'Selecione ...', value: null });
        this.pessoas.push({ label: 'Pessoa Juridica', value: 'JURIDICA' });
        this.pessoas.push({ label: 'Pessoa Fisica', value: 'FISICA' });

    }
    private carregarRegime() {
        this.regimes.push({ label: 'Selecione ...', value: null });
        this.regimes.push({ label: 'Lucro Real', value: 'LUCROREAL' });
        this.regimes.push({ label: 'Lucro Presumido', value: 'LUCROPRESUMIDO' });
        this.regimes.push({ label: 'Simples Nacional', value: 'SIMPLESNACIONAL' });
    }

    // tslint:disable-next-line:use-lifecycle-interface
    ngOnInit() {


        this.carregarPessoas();

        this.carregarRegime();
        this.filtroPadrao = false;
        super.iniciar('/clientes');

        this.activeIndex = 0;
        this.cols = [
            { field: 'id', header: 'ID', width: '80px' },
            { field: 'cpfCnpj', header: 'CPF/CNPJ', width: '140px' },
            { field: 'razaoSocial', header: 'Cliente', width: '400px' },
            // { field: 'nomeFantasia', header: 'Nome Fantasia', width: '400px' },
            { field: 'tipoCliente', header: 'Tipo Pessoa', width: '100px' },
            { field: 'tipoRegime', header: 'Regime', width: '140px' },
            { field: 'situacao', header: 'Situação', width: '70px' },
        ];




    }

    acaoInserir() {


        super.acaoInserir();
        this.activeIndex = 0;

        setTimeout(() => {
            this.setarFocus('razaoSocial_input');
        }, 100);

        this.carregarColumnCenario();
        this.carregarColumnAtividades();


    }

    instance() {
        super.instance();
        this.objetoSelecionado.endereco = new Object();
        this.objetoSelecionado.tipoCliente = 'JURIDICA';
        this.activeIndex = 0;
    }


    acaoAlterar() {

        super.acaoAlterar();
        this.activeIndex = 0;
        setTimeout(() => {
            if (this.objetoSelecionado.cenarios != null && this.objetoSelecionado.cenarios != undefined) {
                this.objetoSelecionado.cenarios.sort(function (a, b) {
                    return a.id - b.id;
                });
            }
        }, 100);
        this.carregarColumnCenario();
        this.carregarColumnAtividades();

    }

    openModalCidade() {
        this.f11Ativo = false;
        this.modalRef = this.modal(PageCidadeComponent, 'Cidade', {});
        this.modalRef.onClose.subscribe(res => {
            this.objetoSelecionado.cidade = this.dialogService.dialogComponentRef.instance
                .componentRef.instance.objetoSelecionado;
            this.f11Ativo = true;
        });
    }


    validar() {


        const nomeCampoNomeRazaoSocial: string = this.objetoSelecionado.tipoCliente === 'FISICA' ? 'Nome do Cliente' : 'Razão Social';
        const nomeCampoNomeCpfCnpj: string = this.objetoSelecionado.tipoCliente === 'FISICA' ? 'CPF' : 'CNPJ';


        if (StringUtils.isEmpty(this.objetoSelecionado.razaoSocial)) {

            this.showError(`${nomeCampoNomeRazaoSocial} não informado!`);
            this.activeIndex = 0;
            this.setarFocus('razaoSocial_input');
            return false;
        }

        if (StringUtils.isEmpty(this.objetoSelecionado.tipoCliente)) {
            this.showError('Tipo Pessoa não informado');
            this.activeIndex = 0;
            this.setarFocus('tipoCliente');
            return false;
        }


        if (StringUtils.isEmpty(this.objetoSelecionado.cpfCnpj)) {
            this.showError(`${nomeCampoNomeCpfCnpj} não informado`);
            this.activeIndex = 0;
            this.setarFocus('cpfCnpj_input');
            return false;
        }

        if (StringUtils.isEmpty(this.objetoSelecionado.rgIe)) {
            this.showError('IE/RG não informado');
            this.activeIndex = 0;
            this.setarFocus('rgIe_input');
            return false;
        }

        if (this.objetoSelecionado.tipoPessoa === 'JURIDICA') {

            if (StringUtils.isEmpty(this.objetoSelecionado.im)) {
                this.showError('IM não informado');
                this.activeIndex = 0;
                this.setarFocus('im');
                return false;
            }

            if (StringUtils.isEmpty(this.objetoSelecionado.ieSt)) {
                this.showError('IeSt não informado');
                this.activeIndex = 0;
                this.setarFocus('ieSt');
                return false;
            }

            if (StringUtils.isEmpty(this.objetoSelecionado.suframa)) {
                this.showError('Suframa não informado');
                this.activeIndex = 0;
                this.setarFocus('suframa');
                return false;
            }

        }

        if (StringUtils.isEmpty(this.objetoSelecionado.endereco.endereco)) {
            this.showError('Endereco não informado');
            this.activeIndex = 1;
            this.setarFocus('cep_input');

            return false;
        }

        return true;
    }


    filtrar() {

        this.filtroParametro.clear();

        if (!StringUtils.isEmpty(this.nomeFiltro)) {
            this.filtroParametro.addItem('nomeCliente', this.nomeFiltro);
        }


        if (this.codigoFiltro != null) {
            this.filtroParametro.addItem('codigo', this.codigoFiltro.toString());
        }

        if (this.tipoPessoaFiltro != null) {
            this.filtroParametro.addItem('tipoPessoa', this.tipoPessoaFiltro);
        }

        super.filtrar();
    }


    keytab(o) {
        console.log(o);
    }

    carregarColumnCenario() {
        if (this.objetoSelecionado.cenarios == null || this.objetoSelecionado.cenarios === undefined) {
            this.objetoSelecionado.cenarios = new Array();
        }
        this.renderizarCenario = false;
        this.cols2 = [
            { field: 'id', header: 'ID', width: '120px' },
            { field: 'nomeCenario', header: 'Cenário' },
            { field: 'estado', subfield: 'uf', header: 'Estado' }
        ];
        //this.carregarCenario();
    }

    carregarCenario() {
        if (this.objetoSelecionado.endereco.estado == undefined || this.objetoSelecionado.endereco.estado == null) {
            this.showError('Estado não Informado!!');
            return;
        }


        this.httpUtilService.get('/cenario/loadCenarioByUf/' + this.objetoSelecionado.endereco.estado.id).subscribe(data => {

            if (data.json().hasOwnProperty('errorcode')) {
                this.showError(data.text());
            }

            const lista: any[] = data.json();
            this.listaCenarios = [];
            this.listaCenarios.push({ label: 'Selecione ...', value: null });

            lista.forEach(o => {
                this.listaCenarios.push({ label: o.estado.sigla + " - " + o.nomeCenario, value: o });
            });

        }, erro => {
            this.showError(erro);
        });


    }

    incluirCenario() {
        this.cenarioComboSelecionado = null;
        this.statusCenario = '1';
        this.renderizarCenario = true;
        this.carregarCenario();

    }



    editarCenario(objeto) {
        this.renderizarCenario = true;
        this.cenarioComboSelecionado = this.cenarioSelecionado;
        this.statusCenario = '2';
        this.carregarCenario();
    }

    removerCenario() {
        this.showWarn('Cenário selecionado será removido da listagem');
        this.renderizarCenario = true;
        this.statusCenario = '3';
        this.cenarioComboSelecionado = this.cenarioSelecionado;
    }

    adicionarCenario() {
        if (this.cenarioComboSelecionado != null) {
            this.limparMensagem();
            let msg = '';
            let isExist = false;
            if (this.statusCenario !== '3') {
                this.objetoSelecionado.cenarios.forEach(c => {
                    if (c.id === this.cenarioComboSelecionado.id) {
                        isExist = true;
                        msg = 'Cenário já informado anteriormente na listagem';
                        return;
                    }
                });
            }

            if (!isExist) {
                switch (this.statusCenario) {
                    case '1': {
                        this.objetoSelecionado.cenarios.push(this.cenarioComboSelecionado);
                        this.objetoSelecionado.cenarios.sort(function (a, b) {
                            return a.id - b.id;
                        });
                        this.carregarColumnCenario();
                        msg = 'Cenário adicionado com sucesso, salve o cliente para que as alterações tenham efeito.';
                        break;
                    }
                    case '2': {
                        if (this.cenarioComboSelecionado.id !== this.cenarioSelecionado.id) {
                            for (let i = 0; i < this.objetoSelecionado.cenarios.length; i++) {
                                if (this.objetoSelecionado.cenarios[i].id === this.cenarioSelecionado.id) {
                                    this.objetoSelecionado.cenarios[i] = this.cenarioComboSelecionado;
                                    break;
                                }
                            }

                        }
                        msg = 'Cenário atualizado com sucesso, salve o cliente para que as alterações tenham efeito.';
                        break;
                    }
                    case '3': {
                        for (let i = 0; i < this.objetoSelecionado.cenarios.length; i++) {
                            if (this.objetoSelecionado.cenarios[i].id === this.cenarioSelecionado.id) {
                                this.objetoSelecionado.cenarios.splice(i, 1);
                                break;
                            }
                        }
                        msg = 'Cenário removido com sucesso, salve o cliente para que as alterações tenham efeito';
                        break;
                    }
                }
                this.showSuccess(msg);
                this.renderizarCenario = false;
            } else {
                this.showError(msg);
            }
        } else {
            this.showError('Cenário não informado');
        }
    }

    cancelarCenario() {
        this.renderizarCenario = false;
    }

    openModalCenario() {
        this.f11Ativo = false;
        this.modalRef = this.modal(PageCenarioComponent, 'Cenário', {});
        this.modalRef.onClose.subscribe(res => {
            // this.objetoSelecionado.cliente = this.dialogService.dialogComponentRef.instance
            //     .componentRef.instance.objetoSelecionado;
            // this.f11Ativo = true;
        });
    }

    setCenario(objeto: any) {
        this.cenarioSelecionado = objeto;
    }

    // ---------------------------------------- atividades ----------------------------

    carregarColumnAtividades() {
        if (this.objetoSelecionado.atividades == null || this.objetoSelecionado.atividades === undefined) {
            this.objetoSelecionado.atividades = new Array();
        }
        this.renderizarAtividade = false;
        this.colsAtividade = [
            { field: 'codigo', header: 'Código', width: '150px' },
            { field: 'descricao', header: 'Descrição' }
        ];
    }

    incluirAtividade() {
        this.cnaeSelecionado = new Object();
        this.statusAtividade = '1';
        this.renderizarAtividade = true;
    }

    editarAtividade(objeto) {
        this.renderizarAtividade = true;
        this.cnaeSelecionado = this.atividadeSelecionada;
        this.statusAtividade = '2';
    }

    removerAtividade() {
        this.showWarn('A atividade selecionada será removida da listagem');
        this.renderizarAtividade = true;
        this.statusAtividade = '3';
        this.cnaeSelecionado = this.atividadeSelecionada;
    }

    adicionarAtividade() {
        if (this.cnaeSelecionado != null) {
            let msg = '';
            let isExist = false;
            if (this.statusAtividade !== '3') {
                this.objetoSelecionado.atividades.forEach(c => {
                    if (c.id === this.cnaeSelecionado.id) {
                        isExist = true;
                        msg = 'Atividade já informado anteriormente na listagem';
                        return;
                    }
                });
            }

            if (!isExist) {
                switch (this.statusAtividade) {
                    case '1': {
                        this.objetoSelecionado.atividades.push(this.cnaeSelecionado);
                        // this.carregarColumnAtividade();
                        msg = 'Atividade adicionada com sucesso, salve o cliente para que as alterações tenham efeito ';
                        break;
                    }
                    case '2': {
                        if (this.cnaeSelecionado.id !== this.cnaeSelecionado.id) {
                            for (let i = 0; i < this.objetoSelecionado.atividades.length; i++) {
                                if (this.objetoSelecionado.atividades[i].id === this.atividadeSelecionada.id) {
                                    this.objetoSelecionado.atividades[i] = this.atividadeSelecionada;
                                    break;
                                }
                            }
                        }
                        msg = 'Atividade atualizada com sucesso, salve o cliente para que as alterações tenham efeito';
                        break;
                    }
                    case '3': {
                        for (let i = 0; i < this.objetoSelecionado.atividades.length; i++) {
                            if (this.objetoSelecionado.atividades[i].id === this.atividadeSelecionada.id) {
                                this.objetoSelecionado.atividades.splice(i, 1);
                                break;
                            }
                        }
                        msg = 'Atividade removida com sucesso, salve o cliente para que as alterações tenham efeito';
                        break;
                    }
                }
                this.showSuccess(msg);
                this.renderizarAtividade = false;
            } else {
                this.showError(msg);
            }
        } else {
            this.showError('Atividade não informada');
        }
    }

    cancelarAtividade() {
        this.renderizarAtividade = false;
    }

    selecionarCnae() {
        // alert(this.cnaeSelecionado.codigo);
        if (this.cnaeSelecionado.codigo !== undefined) {
            this.httpUtilService.get('/cnae' + '/0/1/' + btoa('id') + '/' + btoa(this.cnaeSelecionado.codigo)).subscribe(data => {
                // alert(data.text());
                if (data.text() === '[]') {
                    this.showError('Cnae não encontrado');
                    this.cnaeSelecionado = new Object();
                } else {
                    const lista = data.json()
                    this.cnaeSelecionado = lista[0];
                }
            });
        }
    }

    openModalCnae() {
        this.f11Ativo = false;
        this.modalRef = this.modal(PageCnaeComponent, 'CNAE', {});
        this.modalRef.onClose.subscribe(res => {
            this.cnaeSelecionado = this.dialogService.dialogComponentRef.instance
                .componentRef.instance.objetoSelecionado;
            this.f11Ativo = true;
        });
    }

    setAtividade(objeto: any) {
        this.atividadeSelecionada = objeto;
    }

    acaoArquivosRecebidos() {
        if (this.objetoSelecionado.id !== undefined) {
            this.historicoArquivos = true;
            this.getArquivosRecebidos();
        } else {
            this.toastWarn('Selecione um cliente');
        }
    }

    voltarArquivosRecebidos() {
        this.historicoArquivos = false;
    }

    getArquivosRecebidos() {
        if (this.objetoSelecionado.id !== undefined) {
            this.processandoArquivos = true;

            const payload = new FiltroParametro()
            payload.posicaoInicial = 0;
            payload.quantidadeRegistros = 999;
            payload.addItem('clienteId', this.objetoSelecionado.id);

            this.httpUtilService.post('/arquivos-processar/findRange', payload).subscribe(data => {

                let lista = [];
                lista = data.json();

                lista.forEach(item => { item.atributoPadrao.dataRegistro = StringUtils.string2Date(item.atributoPadrao.dataRegistro); });

                this.arquivosEnviados = lista;
                this.processandoArquivos = false;
            });
        }

    }

}
