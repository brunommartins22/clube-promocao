import { Component, Injector } from '@angular/core';
import { ProcessoComponent } from 'padrao';
import { ConfirmationService, Message } from 'primeng/api';
import { stringify } from '@angular/compiler/src/util';

@Component({
    selector: 'app-page-scanntech-config',
    templateUrl: './page-scanntech-config.component.html',
})

export class PageScantechConfigComponent extends ProcessoComponent {

    confirmationService: ConfirmationService;
    tituloConfiguracao: any = "";
    intervalo: number = null;
    status: any = "";
    msgsInfo: any = "";
    msgsFilial: Message[] = [];
    codigoScanntech: any = "";
    url: any = "";


    renderizarConfiguracao: boolean = false;
    renderizarUrl: boolean = false
    renderizarFilial: boolean = false;
    isVisibleSenha: boolean = false;
    isCheck: boolean = false;

    // List instance
    dadosUrl: any = new Array();
    dadosFilial: any = new Array();
    dadosFilialDropdown: any = [];
    // Selection models
    configuracaoSelecionada: any = new Array();
    configuracaoItemSelecionada: any = null;
    urlSelecionada: any = null;
    filialSelecionada: any = null;
    filialDropdownSelecionada: any = null;

    //***************** load methods ****************/
    private loadFilialDropdown(objeto: any) {

        this.dadosFilialDropdown = [];
        this.filialDropdownSelecionada = null;
        this.codigoScanntech = 0;
        this.dadosFilialDropdown.push({ label: "Selecione ...", value: null });

        this.httpUtilService.get("/filialscanntech/loadAllFilial").subscribe(data => {
            if (data.json().hasOwnProperty('errorCode')) {
                this.toastError('Erro', data.text());
            } else {

                let resp = data.json();
                if (resp != null && resp != undefined && resp != []) {
                    resp.forEach(r => {
                        this.dadosFilialDropdown.push({ label: r.codigoFilial + " - " + r.nomeFilial, value: r })
                    });
                    this.filialDropdownSelecionada = objeto;
                    if (this.filialDropdownSelecionada != null) {
                        this.codigoScanntech = this.filialDropdownSelecionada.codigoScanntech;
                    }
                }
            }

        }, erro => {
            this.errorMessage(erro.message);
        });
    }

    private errorMessage(message: any) {
        this.errorMessageinit(message);
        setTimeout(() => {
            this.msgsInfo = [];
        }, 3000);
    }

    private sucessMessage(message: any) {
        this.sucessMessageInit(message);
        setTimeout(() => {
            this.msgsInfo = [];
        }, 3000);
    }

    //********** Init Config ***********/
    private sucessMessageInit(message: any) {
        this.msgsInfo = [];
        this.msgsInfo.push({ severity: "success", summary: "", detail: message });
    }
    private errorMessageinit(message: any) {
        this.msgsInfo = [];
        this.msgsInfo.push({ severity: 'error', summary: '', detail: message });
      
    }
    private infoMessageInit(message: any) {
        this.msgsInfo = [];
        this.msgsInfo.push({ severity: "info", summary: "", detail: message });
    }

    //********* Filial ************/
    private warnMessage(message: any) {
        this.msgsFilial = [];
        this.msgsFilial.push({ severity: 'warn', summary: '', detail: message });
    }

    //****************** end methods ****************/

    constructor(injector: Injector) {
        super(injector);
        this.confirmationService = injector.get(ConfirmationService);
    };

    ngOnInit() {
        this.tituloConfiguracao = "Configuração Clube de Promoção";
        this.urlControler = "/configuracoes";
        this.initConfig();
    }

    //************************* Load Configuracao ************************/

    initConfig() {
        this.httpUtilService.get(this.urlControler).subscribe(data => {
            if (data.json().hasOwnProperty('errorCode')) {
                this.toastError('Erro', data.text());
            } else {
                this.configuracaoSelecionada = (data.json())[0];
                this.intervalo = this.configuracaoSelecionada.intervaloSincronizacao;
                if (this.configuracaoSelecionada.configuracaoItem != undefined && this.configuracaoSelecionada.configuracaoItem != null) {
                    this.configuracaoSelecionada.configuracaoItem.sort(function (a, b) {
                        return a.id - b.id;
                    })
                }
                this.infoMessageInit("Configurações de processamento Scanntech, baseado no sistema de Clube de Promoção.");
            }
        }, erro => {
            this.errorMessage(erro.message);
        });

    }


    onRowSelectConfiguracao(event) {
        this.configuracaoItemSelecionada = event.data;
    }

    onRowUnselectConfiguracao(event) {
        this.configuracaoItemSelecionada = event.data;
        this.editarConfiguracao();

    }

    atualizarConfiguracao() {
        this.configuracaoSelecionada.intervaloSincronizacao = this.intervalo;
        let json = JSON.stringify(this.configuracaoSelecionada);
        this.httpUtilService.put(this.urlControler, json).subscribe(data => {
            this.configuracaoSelecionada = data.json();
            this.sucessMessageInit("Configuração atualizada com sucesso.");
            setTimeout(() => {
                this.infoMessageInit("Configurações de processamento Scanntech, baseado no sistema de Clube de Promoção.");
            }, 2500);
        }, erro => {
            this.toastError(erro.message);
        });
    }

    adicionarConfiguracao() {
        this.msgsInfo = [];
        this.configuracaoItemSelecionada = {
            id: null,
            usuario: null,
            senha: null,
            codigoEmpresa: null,
            empresaPrincipal: null,
            listaUrl: [],
            listaFilial: []

        };
        this.status = "1";
        this.renderizarFilial = false;
        this.renderizarUrl = false;
        this.warnMessage("As filiais participantes deverão conter o código respectivo da Scanntech. "
            + "Lojas sem esta coluna preenchida não participarão do envio de informações "
            + "e nem da aceitação de promoções de parceiros Scanntech.");
        setTimeout(() => {
            this.renderizarConfiguracao = true;
        }, 200);
    }

    editarConfiguracao() {
        this.msgsInfo = []
        this.status = "2";
        this.renderizarFilial = false;
        this.renderizarUrl = false;
        this.warnMessage("As filiais participantes deverão conter o código respectivo da Scanntech. "
            + "Lojas sem esta coluna preenchida não participarão do envio de informações "
            + "e nem da aceitação de promoções de parceiros Scanntech.");
        setTimeout(() => {
            this.renderizarConfiguracao = true;
        }, 200);
    }

    confirmarConfiguracao() {

        if (this.configuracaoItemSelecionada != null) {
            let json = "";
            switch (this.status) {
                case "1": {
                    if (this.configuracaoSelecionada.configuracaoItem == undefined || this.configuracaoSelecionada.configuracaoItem == null) {
                        this.configuracaoSelecionada.configuracaoItem = new Array();
                    }
                    this.configuracaoSelecionada.configuracaoItem.push(this.configuracaoItemSelecionada);

                    break
                }
                case "2": {
                    for (let i = 0; i < this.configuracaoSelecionada.configuracaoItem.length; i++) {
                        if (this.configuracaoSelecionada.configuracaoItem[i].id === this.configuracaoItemSelecionada.id) {
                            this.configuracaoSelecionada.configuracaoItem[i] = this.configuracaoItemSelecionada;
                            break;
                        }
                    }
                    break
                }
            }
            json = JSON.stringify(this.configuracaoSelecionada);

            this.httpUtilService.put(this.urlControler, json).subscribe(data => {

                this.cancelarConfiguracao();
                this.toastSuccess("Configuração salva com sucesso.");

            }, erro => {
                this.errorMessage(erro.message);
            });
        }

    }

    cancelarConfiguracao() {
        this.renderizarConfiguracao = false;
        this.configuracaoItemSelecionada = null;
        this.status = null;
        this.initConfig();
    }

    //************************* Dados Filial ****************************/

    onRowSelectFilial(event) {
        this.filialSelecionada = event.data;
    }

    onRowUnselectFilial(event) {
        this.filialSelecionada = event.data;
        this.editarFilial();

    }

    adicionarFilial() {
        this.renderizarFilial = true;
        this.filialSelecionada = null;
        this.status = "1";
        this.loadFilialDropdown(null);
    }

    editarFilial() {
        if (this.filialSelecionada == null) {
            this.errorMessage("Nenhuma filial selecionada.");
            return;
        }
        this.renderizarFilial = true;
        this.status = "2";
        this.loadFilialDropdown(this.filialSelecionada);
    }

    removerFilial() {
        if (this.filialSelecionada == null) {
            this.errorMessage("Nenhuma filial selecionada.");
            return;
        }
        this.showWarn('Filial selecionada será removida da listagem.');
        this.renderizarFilial = true;
        this.status = '3';
        this.loadFilialDropdown(this.filialSelecionada);
    }

    confirmarFilial() {
        if (this.filialDropdownSelecionada != null) {
            let msg = '';
            let isExist = false;
            if (this.status == '1') {
                if (this.configuracaoItemSelecionada.listaFilial == undefined || this.configuracaoItemSelecionada.listaFilial == null) {
                    this.configuracaoItemSelecionada.listaFilial = new Array();
                }

                this.configuracaoItemSelecionada.listaFilial.forEach(f => {
                    if (f.codigoFilial === this.filialDropdownSelecionada.codigoFilial) {
                        isExist = true;
                        msg = 'Filial já informada anteriormente na listagem';
                        return;
                    }
                });
            }

            if (!isExist) {
                this.filialDropdownSelecionada.codigoScanntech = this.codigoScanntech;
                switch (this.status) {
                    case "1": {
                        this.configuracaoItemSelecionada.listaFilial.push(this.filialDropdownSelecionada);
                        msg = 'Filial adicionada com sucesso, salve a configuração para que as alterações tenham efeito.';
                        break
                    }
                    case "2": {
                        if (this.filialDropdownSelecionada.codigoFilial !== this.filialSelecionada.codigoFilial) {
                            for (let i = 0; i < this.configuracaoItemSelecionada.listaFilial.length; i++) {
                                if (this.configuracaoItemSelecionada.listaFilial[i].codigoFilial === this.filialSelecionada.codigoFilial) {
                                    this.configuracaoItemSelecionada.listaFilial[i] = this.filialDropdownSelecionada;
                                    break;
                                }
                            }
                        }
                        msg = 'Filial atualizada com sucesso, salve a configuração para que as alterações tenham efeito.';
                        break
                    }
                    case "3": {
                        for (let i = 0; i < this.configuracaoItemSelecionada.listaFilial.length; i++) {
                            if (this.configuracaoItemSelecionada.listaFilial[i].codigoFilial === this.filialSelecionada.codigoFilial) {
                                this.configuracaoItemSelecionada.listaFilial.splice(i, 1);
                                break;
                            }
                        }
                        msg = 'Filial removida com sucesso, salve a configuração para que as alterações tenham efeito.';
                        break;

                    }
                }
                this.configuracaoItemSelecionada.listaFilial.sort(function (a, b) {
                    return a.codigoFilial - b.codigoFilial;
                });
                this.sucessMessage(msg);
                this.cancelarFilial();
            } else {
                this.errorMessage(msg);
            }
        }
    }

    cancelarFilial() {
        this.renderizarFilial = false;
        this.filialSelecionada = null;
        this.filialDropdownSelecionada = null;
        this.status = null;
    }

    //************************* Dados Scanntech ****************************/
    onRowSelectUrl(event) {
        this.urlSelecionada = event.data;
    }

    onRowUnselectUrl(event) {
        this.urlSelecionada = event.data;
        this.editarUrl();
    }

    adicionarUrl() {
        this.renderizarUrl = true;
        this.url = null;
        this.status = "1";

    }

    editarUrl() {
        this.renderizarUrl = true;
        this.status = "2";
        this.url = this.urlSelecionada.valor.substring(7);

    }

    removerUrl() {
        if (this.urlSelecionada == null) {
            this.errorMessage("Nenhuma URL selecionada.");
            return;
        }
        this.showWarn('URL selecionada será removida da listagem.');
        this.renderizarUrl = true;
        this.status = '3';
        this.url = this.urlSelecionada.valor.substring(7);
    }

    confirmarUrl() {
        if (this.url != null && this.url != '') {
            let msg = '';
            let isExist = false;
            if (this.status !== '3') {
                if (this.configuracaoItemSelecionada.listaUrl == undefined || this.configuracaoItemSelecionada.listaUrl == null) {
                    this.configuracaoItemSelecionada.listaUrl = new Array();
                }

                this.configuracaoItemSelecionada.listaUrl.forEach(u => {
                    if (u.valor === this.url) {
                        isExist = true;
                        msg = 'URL já informada anteriormente na listagem';
                        return;
                    }
                });
            }

            if (!isExist) {
                switch (this.status) {
                    case "1": {
                        const createUrl = {
                            valor: "http://" + this.url
                        }
                        this.configuracaoItemSelecionada.listaUrl.push(createUrl);
                        msg = 'URL adicionada com sucesso, salve a configuração para que as alterações tenham efeito.';
                        break
                    }
                    case "2": {
                        if (this.url !== this.urlSelecionada.valor.substring(7)) {
                            for (let i = 0; i < this.configuracaoItemSelecionada.listaUrl.length; i++) {
                                if (this.configuracaoItemSelecionada.listaUrl[i].valor === this.urlSelecionada.valor) {
                                    this.configuracaoItemSelecionada.listaUrl[i].valor = "http://" + this.url;
                                    break;
                                }
                            }
                        }
                        msg = 'URL atualizada com sucesso, salve a configuração para que as alterações tenham efeito.';
                        break
                    }
                    case "3": {
                        for (let i = 0; i < this.configuracaoItemSelecionada.listaUrl.length; i++) {
                            if (this.configuracaoItemSelecionada.listaUrl[i].valor === this.urlSelecionada.valor) {
                                this.configuracaoItemSelecionada.listaUrl.splice(i, 1);
                                break;
                            }
                        }
                        msg = 'URL removida com sucesso, salve a configuração para que as alterações tenham efeito.';
                        break;

                    }
                }
                this.configuracaoItemSelecionada.listaUrl.sort(function (a, b) {
                    return a.id - b.id;
                });
                this.sucessMessage(msg);
                this.cancelarUrl();
            } else {
                this.errorMessage(msg);
            }

        }
    }

    cancelarUrl() {
        this.renderizarUrl = false;
        this.urlSelecionada = null;
        this.url = null;
        this.status = null;
    }




}