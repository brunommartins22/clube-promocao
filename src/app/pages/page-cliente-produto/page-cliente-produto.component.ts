import { Component, Injector } from "@angular/core";
import { ProcessoComponent } from "padrao";
import { CstService } from 'src/app/services/cst.service';
import { PageRegraNcmComponent } from '../processos/page-regra-ncm/page-regra-ncm.component';
import { PageRegraProdutoComponent } from '../processos/page-regra-produto/page-regra-produto.component';
import { PageRegraRegimeComponent } from '../processos/page-regra-regime/page-regra-regime.component';
import { ConfirmationService } from 'primeng/api';

@Component({
    selector: 'app-page-cliente-produto',
    templateUrl: './page-cliente-produto.component.html',
    styles: [`
        .incorret {
            background-color: #FFE399 !important;
            color: black !important;
        }
        .divergent {
            background-color: #EE9EAF !important;
            color: black !important;
        }

        .corret {
            background-color: #7FBCEC !important;
            color: black !important;
        }
    `
    ],
})
export class PageClienteProdutoComponent extends ProcessoComponent {

    cols1: any[];
    cols2: any[];
    produtos: any[];
    renderizarListagemCliente: any;
    renderizarListagemProdutoCliente: any;
    renderizarProduto: any;
    dadosClienteProduto: any;
    dadosCenarios: any;
    dadosProdutoCliente: any;
    dadosProdutoCenario: any;
    dadosIsCheck: any;
    campoFiltroClienteProduto: any;
    tituloProdutoCliente: any;
    clienteSelecionado: any;
    produtoSelecionado: any;

    codigoCliente: number;
    nomeCliente: any;


    listaTipoPessoa = [];
    listaOrdenacao = [];
    listaCenarios = [];
    listaStatus = [];
    listaRegras = [];
    listaCSTPisCofins = [];
    listaCSTIPISaida = [];
    listaCSTIcms = [];
    listaEstado = [];

    tipoPessoaSelecionado: any;
    ordenacaoSelecionada: any;
    cenarioSelecionado: any;
    regraSelecionadaSearch: any;
    statusSelecionado: any;
    estadoSelecionado: any;
    capituloSelecionado: any;

    nomeProduto: any;
    ncm: any;
    regraInformada: any;
    regraSelecionadaEdit: any;
    respEdit: any = "";
    ncmorcest: any = "";

    cstService = new CstService();

    displayProdutoCenario: boolean;
    displayRegras: boolean;
    isDisabledField: boolean;
    isActiveFieldset: boolean;
    isSelectedAll: boolean;

    produtosValidados:number = 0;


    confirmationService: ConfirmationService;


    //*************************** loading methods *********************************


    private loadClienteProduto(objeto: any) {
        this.httpUtilService.post(this.urlControler + "/loadClientProductAll", objeto).subscribe(data => {
            if (data.json().hasOwnProperty('errorCode')) {
                this.toastError('Erro', data.text());
            } else {
                this.dadosClienteProduto = data.json();
            }
        }, erro => {
            this.toastError(erro);
        });
    }
    private loadTipoPessoa() {
        this.listaTipoPessoa = new Array();
        this.listaTipoPessoa.push({ label: "selecione...", value: null });
        this.listaTipoPessoa.push({ label: "Física", value: "FISICA" });
        this.listaTipoPessoa.push({ label: "Jurídica", value: "JURIDICA" });
        this.tipoPessoaSelecionado = null;
    }

    private loadOrdenacaoCliente() {
        this.listaOrdenacao = new Array();
        this.listaOrdenacao.push({ label: "Selecione...", value: null });
        this.listaOrdenacao.push({ label: "Código", value: "id" });
        this.listaOrdenacao.push({ label: "Razão Social/Nome", value: "razao_social" });
        this.ordenacaoSelecionada = null;
    }


    private loadStatus() {
        this.statusSelecionado = null;
        this.listaStatus = new Array();
        this.listaStatus.push({ label: 'Selecione ...', value: null });
        this.listaStatus.push({ label: 'Pendente', value: 'Pendente' });
        this.listaStatus.push({ label: 'validado', value: 'Validado' });
        this.listaStatus.push({ label: 'Inativo', value: 'Inativo' });
    }

    private loadRegras() {
        this.listaRegras = new Array();
        this.listaRegras.push({ label: "Selecione ...", value: null });
        this.listaRegras.push({ label: "Produto", value: "PRODUTO" });
        this.listaRegras.push({ label: "NCM", value: "NCM" });
        this.listaRegras.push({ label: "Regime Tributário", value: "REGIME" });
    }

    private loadEstado() {
        this.httpUtilService.get("/estados").subscribe(data => {
            let resp = data.json();
            if (resp != null) {
                this.listaEstado = new Array();
                this.listaEstado.push({ label: 'Selecione ...', value: null });
                resp.forEach(o => {
                    this.listaEstado.push({ label: o.uf, value: o });
                });

                this.estadoSelecionado = null;
            }
        });
    }


    // botao direito
    menuBotaoDireito = [
        { label: 'Regra Regime', icon: 'fa fa-cubes', command: (event) => { this.openModalRegime(); } },
        { label: 'Regra NCM', icon: 'fa fa-cubes', command: (event) => { this.openModalNcm(); } },
        { label: 'Regra Produto', icon: 'fa fa-cubes', command: (event) => { this.openModalProduto(); } },
        { label: 'Alterar NCM', icon: 'fa fa-pencil-square-o', command: (event) => { this.showDialogEditValueNcmOrCest('NCM') } },
        { label: 'Alterar CEST', icon: 'fa fa-pencil-square-o', command: (event) => { this.showDialogEditValueNcmOrCest('CEST') } },
        { label: 'Inativar Produto', icon: 'fa fa-exclamation-circle' },
        { label: 'Aderir Valor Sugerido', icon: 'fa fa-refresh', command: (event) => { this.processConfirmationInBatch() } }
    ];

    openModalRegime() {
        this.f11Ativo = false;

        let estado = 'INSERIR';
        const property = {
            id: null,
            regimeTributario: this.clienteSelecionado.tipoRegime,
            cenario: null,
            tributoFederalPadrao: new Object(),
            tributoEstadualPadrao: new Object()
        };

        if (this.cenarioSelecionado !== null && this.cenarioSelecionado !== undefined) {
            property.cenario = this.cenarioSelecionado;
        }


        if (this.produtoSelecionado.dominioRegrasInformado == 'REGIME') {
            estado = 'ALTERAR';
            property.id = this.produtoSelecionado.regraId;
            property.tributoEstadualPadrao = this.produtoSelecionado.tributoEstadualPadrao;
            property.tributoFederalPadrao = this.produtoSelecionado.tributoFederalPadrao;
        }


        this.modalRef = this.modal(PageRegraRegimeComponent, 'Regra Regime', property, estado);
        this.modalRef.onClose.subscribe(res => {
            let regraRegime = this.dialogService.dialogComponentRef.instance
                .componentRef.instance.objetoSelecionado;

            if (regraRegime != null) {

                for (let i = 0; i < this.dadosProdutoCenario.length; i++) {
                    if (this.dadosProdutoCenario[i].id === this.produtoSelecionado.id) {
                        this.produtoSelecionado.regraId = regraRegime.id;
                        this.produtoSelecionado.dominioRegrasInformadoBotaoDireito = 'REGIME';
                        this.produtoSelecionado.dominioRegrasInformado = 'REGIME';
                        this.produtoSelecionado.tributoEstadualPadrao = regraRegime.tributoEstadualPadrao;
                        this.produtoSelecionado.tributoFederalPadrao = regraRegime.tributoFederalPadrao;
                        this.dadosProdutoCenario[i] = this.produtoSelecionado;
                        break;
                    }
                }
            }
        });
    }

    openModalNcm() {
        this.f11Ativo = false;

        let estado = 'INSERIR';
        const property = {
            id: null,
            regimeTributario: this.clienteSelecionado.tipoRegime,
            cenario: null,
            ncm: null,
            cliente: new Object(),
            tributoFederalPadrao: new Object(),
            tributoEstadualPadrao: new Object()
        };

        if (this.cenarioSelecionado !== null && this.cenarioSelecionado !== undefined) {
            property.cenario = this.cenarioSelecionado;
        }

        if (this.produtoSelecionado != null && this.produtoSelecionado.produtoCliente.ncmInformado != null) {
            property.ncm = this.produtoSelecionado.produtoCliente.ncmInformado;
        }


        if (this.produtoSelecionado.dominioRegrasInformado == 'NCM') {
            estado = 'ALTERAR';
            property.id = this.produtoSelecionado.regraId;
            property.tributoEstadualPadrao = this.produtoSelecionado.tributoEstadualPadrao;
            property.tributoFederalPadrao = this.produtoSelecionado.tributoFederalPadrao;
        }

        this.modalRef = this.modal(PageRegraNcmComponent, 'Regra NCM', property, estado);
        this.modalRef.onClose.subscribe(res => {
            let regraNcm = this.dialogService.dialogComponentRef.instance
                .componentRef.instance.objetoSelecionado;

            if (regraNcm != null) {

                this.loadProdutoCenario(this.posicaoInicial, this.registrosPorPagina);
            }

        });
    }

    openModalProduto() {
        this.f11Ativo = false;

        let estado = 'INSERIR';
        const property = {
            id: null,
            regimeTributario: this.clienteSelecionado.tipoRegime,
            cenario: null,
            eanProduto: null,
            codigoProduto: null,
            cliente: new Object(),
            tributoFederalPadrao: new Object(),
            tributoEstadualPadrao: new Object()
        };
        if (this.cenarioSelecionado !== null && this.cenarioSelecionado !== undefined) {
            property.cenario = this.cenarioSelecionado;
        }

        if (this.produtoSelecionado.produtoCliente.ean !== undefined && this.produtoSelecionado.produtoCliente.ean != null) {
            property.eanProduto = this.produtoSelecionado.produtoCliente.ean;
        } else if ((this.produtoSelecionado.produtoCliente.codigoProduto !== undefined && this.produtoSelecionado.produtoCliente.codigoProduto != null) && (this.produtoSelecionado.produtoCliente.cliente !== undefined && this.produtoSelecionado.produtoCliente.cliente != null)) {
            property.codigoProduto = this.produtoSelecionado.produtoCliente.codigoProduto;
            property.cliente = this.produtoSelecionado.produtoCliente.cliente;
        }

        if (this.produtoSelecionado.dominioRegrasInformado == 'PRODUTO') {
            estado = 'ALTERAR';
            property.id = this.produtoSelecionado.regraId;
            property.tributoEstadualPadrao = this.produtoSelecionado.tributoEstadualPadrao;
            property.tributoFederalPadrao = this.produtoSelecionado.tributoFederalPadrao;
        }

        this.modalRef = this.modal(PageRegraProdutoComponent, 'Regra Produto', property, estado);
        this.modalRef.onClose.subscribe(res => {
            let regraProduto = this.dialogService.dialogComponentRef.instance
                .componentRef.instance.objetoSelecionado;

            if (regraProduto != null) {
                for (let i = 0; i < this.dadosProdutoCenario.length; i++) {
                    if (this.dadosProdutoCenario[i].id === this.produtoSelecionado.id) {
                        this.produtoSelecionado.regraId = regraProduto.id;
                        this.produtoSelecionado.dominioRegrasInformadoBotaoDireito = 'PRODUTO';
                        this.produtoSelecionado.dominioRegrasInformado = 'PRODUTO';
                        this.produtoSelecionado.tributoEstadualPadrao = regraProduto.tributoEstadualPadrao;
                        this.produtoSelecionado.tributoFederalPadrao = regraProduto.tributoFederalPadrao;
                        this.dadosProdutoCenario[i] = this.produtoSelecionado;
                        break;
                    }
                }
            }
        });
    }

    statusOnChange() {
        if (this.statusSelecionado == null || this.statusSelecionado == 'Inativo') {
            this.regraSelecionadaSearch = null;
        }
    }


    //*************************** end loading methods *********************************
    constructor(injector: Injector) {
        super(injector);
        this.confirmationService = injector.get(ConfirmationService);
    };

    ngOnInit() {

        this.initClient();
    }


    initClient() {
        this.loadCliente();
    }

    loadCliente() {
        this.tituloProdutoCliente = "INTEGRAÇÃO AO CLIENTE";
        this.objetoSelecionado = new Object();
        this.produtoSelecionado = new Object();
        this.urlControler = "/produtoclientes";
        this.nomeCliente = null;
        this.loadTipoPessoa();
        this.loadOrdenacaoCliente();
        this.loadClienteProduto({
            "codigo": null,
            "nome": "",
            "ordenacao": "id"
        });
        this.renderizarListagemCliente = true;
        this.renderizarListagemProdutoCliente = false;
        this.cols1 = [
            { field: "clienteId", header: "Codigo", width: "80px" },
            { field: "regime", header: "Regime Tributário", width: "155px" },
            { field: "cpfCnpj", header: "Cpf/Cnpj", width: "150px" },
            { field: "nomeCliente", header: "Cliente", width: "350px" },
            { field: "qtdRegistro", header: "Registros Totais", width: "160px" }
        ];
    }

    searchClientOnFields() {
        let body = {
            "codigo": this.codigoCliente,
            "nome": this.nomeCliente,
            "ordenacao": this.ordenacaoSelecionada = 'id'
        };
        this.loadClienteProduto(body);
    }

    edit(objeto) {
        this.editClienteSelecionado(objeto);
    }


    editClienteSelecionado(objeto) {
        this.httpUtilService.get("/clientes/" + objeto.clienteId).subscribe(data => {
            this.clienteSelecionado = data.json();
            this.initProdutoCenario();
        });


    }


    initProdutoCenario() {
        if (this.clienteSelecionado != null) {
            this.tituloProdutoCliente = this.clienteSelecionado.cpfCnpj + " → " + this.clienteSelecionado.razaoSocial + " → " + this.clienteSelecionado.tipoRegime;

            this.cenarioSelecionado = null;
            this.nomeProduto = null;
            this.ncm = null;
            this.produtoSelecionado = null;
            this.dadosProdutoCenario = new Array();
            this.quantidadeRegistros = 0;
            this.regraSelecionadaSearch = null;
            this.capituloSelecionado = null;


            this.clienteSelecionado.cenarios.sort(function (a, b) {
                return a.id - b.id;
            });

            this.dadosCenarios = this.clienteSelecionado.cenarios;
            this.listaCenarios = new Array();
            this.listaCenarios.push({ label: "Selecione ...", value: null });
            this.dadosCenarios.forEach(o => {
                this.listaCenarios.push({ label: o.estado.sigla + " - " + o.nomeCenario, value: o });
            });

            if (this.dadosCenarios.length == 1) {
                this.cenarioSelecionado = this.dadosCenarios[0];
            }

            this.loadEstado();
            this.loadStatus();
            this.loadRegras();

            this.renderizarListagemCliente = false;
            this.renderizarListagemProdutoCliente = true;
            this.renderizarProduto = false;
            this.configPadrao = {

                header: '80%',
                width: '80%',
                closable: true,
                closeOnEscape: true,
                autoZIndex: true,
                data: {
                    isModal: true,
                    acao: '',
                    property: {}
                }

            };
            this.isActiveFieldset = false;
            this.registrosPorPagina = 50;
        }
    }


    searchProdutoCenario() {
        this.isActiveFieldset = false;
        if (this.cenarioSelecionado == null) {
            this.toastError('Erro', "Cenário não informado !!");
            return;
        }
        this.posicaoInicial = 0;
        this.loadProdutoCenario(this.posicaoInicial, this.registrosPorPagina);

        setTimeout(() => {
            this.isActiveFieldset = true;
        }, 100);

    }

    clearSearch() {
        this.cenarioSelecionado = null;
        this.statusSelecionado = null;
        this.capituloSelecionado = null;
        this.regraSelecionadaSearch = null;
        this.nomeProduto = null;
        this.ncm = null;
        this.dadosProdutoCenario = new Array();
        this.posicaoInicial = 0;
        this.quantidadeRegistros = 0;
        this.produtoSelecionado = null;
        this.isActiveFieldset = false;
        this.isSelectedAll = false;
    }


    loadProdutoCenario(inicial: any, final: any) {

        let body = { "clienteId": this.clienteSelecionado.id, "cenarioId": this.cenarioSelecionado.id, "produto": this.nomeProduto, "ncm": this.ncm, "capitulo": this.capituloSelecionado, "regra": this.regraSelecionadaSearch, "status": this.statusSelecionado, "inicial": inicial, "final": final };

        this.httpUtilService.post(this.urlControler + "/loadProdutoCenarioCount", body).subscribe(data => {
            this.quantidadeRegistros = data.json();
        });

        this.httpUtilService.post(this.urlControler + "/loadClientSelected", body).subscribe(data => {

            if (data.json().hasOwnProperty('errorCode')) {
                this.toastError('Erro', data.text());
                this.dadosProdutoCenario = new Array();

            } else {
                this.dadosProdutoCenario = data.json();
                this.isSelectedAll = false;
                this.produtosValidados=0;
                this.dadosProdutoCenario.forEach(o => {
                    if (o.confirmado) {
                        this.produtosValidados++;
                    }
                });

            }
        }, erro => {

            this.toastError(erro);
            this.dadosProdutoCenario = new Array();
        });

    }

    paginate(objeto: any) {
        this.registrosPorPagina = objeto.rows;
        this.posicaoInicial = (objeto.first);

        this.loadProdutoCenario(objeto.first, objeto.rows);
    }

    onRowSelect(event) {
        this.produtoSelecionado = event.data;
    }

    onRowUnselect(event) {
        this.produtoSelecionado = event.data;
        if (!this.produtoSelecionado.isCheck) {
            this.editProdutoSelecionado();
        }
    }


    loadValidationCkeckList(options) {
        if (options == 'ALL') {
            for (let i = 0; i < this.dadosProdutoCenario.length; i++) {
                if (!this.dadosProdutoCenario[i].confirmado) {
                    this.dadosProdutoCenario[i].isCheck = this.isSelectedAll;
                }
            }
        } else {
            if (!options) {
                this.isSelectedAll = options;
            } else {
                let countConfirmado = 0;
                let countCheck = 0;
                for (let i = 0; i < this.dadosProdutoCenario.length; i++) {
                    if (!this.dadosProdutoCenario[i].confirmado && this.dadosProdutoCenario[i].produtoCliente.ativo) {
                        if (this.dadosProdutoCenario[i].isCheck) {
                            countCheck++;
                        }
                    } else {
                        countConfirmado++;
                    }
                }
                let countGeral = this.dadosProdutoCenario.length - countConfirmado;
                if ((countGeral - countCheck) == 0) {
                    this.isSelectedAll = options;
                }
            }
        }
    }



    editProdutoSelecionado() {
        if (this.produtoSelecionado != null) {
            this.tituloProdutoCliente += " → " + this.cenarioSelecionado.estado.sigla + " - " + this.cenarioSelecionado.nomeCenario;
            this.listaCSTPisCofins = this.cstService.carregarCSTPisCofins();
            this.listaCSTIPISaida = this.cstService.carregarCSTIPISaida();
            this.listaCSTIcms = this.cstService.carregarCSTIcms();
            this.regraSelecionadaEdit = this.produtoSelecionado.dominioRegrasInformado;
            this.regraInformada = (this.produtoSelecionado.dominioRegrasInformado != null && this.produtoSelecionado.dominioRegrasInformado == 'PRODUTO' ? 'Produto' : this.produtoSelecionado.dominioRegrasInformado != null && this.produtoSelecionado.dominioRegrasInformado == 'REGIME' ? 'Regime Tributário' : this.produtoSelecionado.dominioRegrasInformado);
            this.displayRegras = false;
            this.isDisabledField = (this.produtoSelecionado.dominioRegras == this.produtoSelecionado.dominioRegrasInformado || this.produtoSelecionado.confirmado == true);
            this.renderizarListagemCliente = false;
            this.renderizarListagemProdutoCliente = true;
            this.renderizarProduto = true;

            if (!this.produtoSelecionado.produtoCliente.ativo) {
                this.showError(this.produtoSelecionado.produtoCliente.log);
            }
            // console.log(this.produtoSelecionado);
        } else {
            this.toastError('Erro', "Nenhum produto selecionado !!");
        }
    }

    showDialog() {
        this.displayRegras = true;
        this.loadRegras();
    }

    closeDialog(objeto: any) {
        this.displayRegras = false;
        this.regraSelecionadaEdit = objeto;
        this.regraInformada = (objeto == 'PRODUTO' ? 'Produto' : objeto == 'REGIME' ? 'Regime Tributário' : objeto);
        this.isDisabledField = false;
        this.produtoSelecionado.isEdited = true;

    }

    restoreDataOnInit() {
        this.produtoSelecionado.isEdited = false;
        this.regraSelecionadaEdit = this.produtoSelecionado.dominioRegrasInformado;
        this.regraInformada = (this.produtoSelecionado.dominioRegrasInformado != null && this.produtoSelecionado.dominioRegrasInformado == 'PRODUTO' ? 'Produto' : this.produtoSelecionado.dominioRegrasInformado != null && this.produtoSelecionado.dominioRegrasInformado == 'REGIME' ? 'Regime Tributário' : this.produtoSelecionado.dominioRegrasInformado);
        this.isDisabledField = true;
        this.produtoSelecionado.produtoCliente.ncmInformado = this.produtoSelecionado.produtoCliente.ncmCliente;
        this.produtoSelecionado.produtoCliente.cestInformado = this.produtoSelecionado.produtoCliente.cestCliente;
        this.produtoSelecionado.tributoFederalInformado.cstPisSaidaInformado = this.produtoSelecionado.tributoFederalCliente.cstPisSaidaCliente;
        this.produtoSelecionado.tributoFederalInformado.aliquotaPisSaidaInformado = this.produtoSelecionado.tributoFederalCliente.aliquotaPisSaidaCliente;
        this.produtoSelecionado.tributoFederalInformado.cstCofinsSaidaInformado = this.produtoSelecionado.tributoFederalCliente.cstCofinsSaidaCliente;
        this.produtoSelecionado.tributoFederalInformado.aliquotaCofinsSaidaInformado = this.produtoSelecionado.tributoFederalCliente.aliquotaCofinsSaidaCliente;
        this.produtoSelecionado.tributoFederalInformado.cstIpiSaidaInformado = this.produtoSelecionado.tributoFederalCliente.cstIpiSaidaCliente;
        this.produtoSelecionado.tributoFederalInformado.aliquotaIpiSaidaInformado = this.produtoSelecionado.tributoFederalCliente.aliquotaIpiSaidaCliente;
        this.produtoSelecionado.tributoEstadualInformado.cstIcmsSaidaInformado = this.produtoSelecionado.tributoEstadualCliente.cstIcmsSaidaCliente;
        this.produtoSelecionado.tributoEstadualInformado.aliquotaIcmsSaidaInformado = this.produtoSelecionado.tributoEstadualCliente.aliquotaIcmsSaidaCliente;
    }

    confirmProdutoCliente() {
        if (this.produtoSelecionado != null) {
            if (this.produtoSelecionado.dominioRegras != this.regraSelecionadaEdit) {
                this.confirmationService.confirm({
                    message: 'O Registro será alterado p/ a nova Regra Informada, você confirma a atualização dos dados submetidos ?',
                    accept: () => {
                        this.processConfirmation();
                    },
                    reject: () => {
                        return;
                    }
                });
            } else {
                this.processConfirmation();
            }
        }
    }

    processConfirmation() {
        this.produtoSelecionado.dominioRegrasInformado = this.regraSelecionadaEdit;
        let json = JSON.stringify(this.produtoSelecionado);
        this.httpUtilService.post(this.urlControler + "/confirmClientRule", json).subscribe(data => {


            this.loadProdutoCenario(this.posicaoInicial, this.registrosPorPagina);
            this.renderizarProduto = false;
            this.toastSuccess('Registro Alterado com Sucesso!');

        }, erro => {
            this.showError(erro.message);
            setTimeout(() => {
                this.msgs = [];
            }, 2500);
        });
    }

    cancel() {
        if (!this.renderizarListagemCliente && this.renderizarListagemProdutoCliente && !this.renderizarProduto) {
            this.loadCliente();
        } else {
            this.tituloProdutoCliente = this.clienteSelecionado.cpfCnpj + " → " + this.clienteSelecionado.razaoSocial + " → " + this.clienteSelecionado.tipoRegime;
            if (!this.produtoSelecionado.confirmado && this.produtoSelecionado.isEdited && this.produtoSelecionado.produtoCliente.ativo) {
                this.restoreDataOnInit();
            }
            this.renderizarProduto = false;
            this.produtoSelecionado = null;
            this.msgs = [];
            //this.loadProdutoCenario(this.posicaoInicial, this.registrosPorPagina);
        }

    }

    processConfirmationInBatch() {

        this.dadosIsCheck = null;
        for (let p = 0; p < this.dadosProdutoCenario.length; p++) {
            if (this.dadosProdutoCenario[p].isCheck) {
                if (this.dadosIsCheck == null) {
                    this.dadosIsCheck = new Array();
                }
                this.dadosIsCheck.push(this.dadosProdutoCenario[p]);
            }
        }
        if (this.dadosIsCheck == null) {
            this.toastError("Error", "Nenhum produto selecionado !!");
            return;
        }

        this.httpUtilService.post(this.urlControler + "/confirmClientRuleOnBatchProduct", this.dadosIsCheck).subscribe(data => {

            this.isSelectedAll = false;
            this.loadProdutoCenario(this.posicaoInicial, this.registrosPorPagina);
            this.toastSuccess('Registro(s) Alterado(s) com Sucesso!');

        }, erro => {
            this.toastError("Error:", erro.message);
        });
    }


    showDialogEditValueNcmOrCest(resp: string) {
        this.dadosIsCheck = null;
        for (let p = 0; p < this.dadosProdutoCenario.length; p++) {
            if (this.dadosProdutoCenario[p].isCheck) {
                if (this.dadosIsCheck == null) {
                    this.dadosIsCheck = new Array();
                }
                this.dadosIsCheck.push(this.dadosProdutoCenario[p]);
            }
        }
        if (this.dadosIsCheck == null) {
            this.toastError("Error", "Nenhum produto selecionado !!");
            return;
        }
        this.displayProdutoCenario = true;
        this.respEdit = resp;
        this.ncmorcest = "";
        setTimeout(() => {
            document.getElementById('ncmorcest_input').focus();
        }, 100);
    }

    closeDialogEditValueNcmOrCest() {
        this.displayProdutoCenario = false;
        this.respEdit = null;
        this.ncmorcest = null;
    }


    editValueNcmOrCestbyInformed() {

        let errorEdit = null;
        if (this.ncmorcest != undefined && this.ncmorcest != null && this.ncmorcest != '' && this.ncmorcest.length < (this.respEdit == 'NCM' ? 8 : 7)) {
            errorEdit = this.respEdit + " com quantidade de caracteres menor que " + (this.respEdit == 'NCM' ? 8 : 7) + " dígitos !!";
        } else if (this.ncmorcest == undefined || this.ncmorcest == null || this.ncmorcest == '') {
            errorEdit = this.respEdit + " não informado !!";
        }

        if (errorEdit != null) {
            this.toastError("Error:", errorEdit);
            return;
        }

        for (let p = 0; p < this.dadosIsCheck.length; p++) {
            if (this.respEdit == 'NCM') {
                this.dadosIsCheck[p].produtoCliente.ncmInformado = this.ncmorcest;
            } else {
                this.dadosIsCheck[p].produtoCliente.cestInformado = this.ncmorcest;
            }
        }

        this.httpUtilService.post(this.urlControler + "/editValueNcmOrCestbyInformed/" + (this.respEdit == 'NCM'), this.dadosIsCheck).subscribe(data => {

            if (data.json().hasOwnProperty('errorCode')) {
                this.showError(data.text().replace("Error:", ""));
            } else {
                this.loadProdutoCenario(this.posicaoInicial, this.registrosPorPagina);
                this.closeDialogEditValueNcmOrCest();
                this.toastSuccess('Registro(s) Alterado(s) com Sucesso!');
            }
        }, erro => {
            this.toastError("Error:", erro.message);
        });

    }


}
