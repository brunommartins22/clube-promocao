import { Component, Injector } from "@angular/core";
import { ProcessoComponent, StringUtils } from 'padrao';
import { ConfirmationService, Message } from 'primeng/api';
import { sincronizador } from 'src/app/services/sincronizador.service';
import { loading } from 'src/app/services/loading.service';

@Component({
    selector: "app-page-sincronizacao-vendas",
    templateUrl: "./page-sincronizacao-vendas.component.html",
    styles: [`

        .divergent {
            background-color: #EE9EAF !important;
            color: black !important;
        }

        .corret {
            background-color: #CCF7D4 !important;
            color: black !important;
        }
    `
    ],
})

export class PageSincronizacaoVendas extends ProcessoComponent {

    confirmationService: ConfirmationService;
    tituloSincronizacao: any = "";
    numeroCaixa: number = null;
    numeroCupom: number = null;
    pt: any = "";
    isActiveFieldset: boolean = false;


    rangeDates: Date[] = null;
    dadosFilialDropdown: any = [];
    dadosSituacaoDropdown: any = [];
    dadosFiltro: any = [];


    filialDropdownSelecionado: any = null;
    situacaoDropdownSelecionado: any = null;
    filtroSelecionado: any = null;



    display: boolean = false;


    //****************** Dialog Reenvio ******************/
    isDisplayReenvio: boolean = false;

    rangeDatesDialog: Date[] = null;
    dadosTipoReenvio: any = [];

    tipoReenvioSelecionado: any = null;

    numeroCaixaDialog: number = null;

    msgsDialog: Message[] = [];


    //******************** methods ************************/

    private loadFilialDropdown() {

        this.dadosFilialDropdown = [];
        this.filialDropdownSelecionado = null;

        this.dadosFilialDropdown.push({ label: "Selecione...", value: null });

        //******** Popular um model dentro de um DropDown *********/
        this.httpUtilService.get("/filialscanntech/loadAllFilial").subscribe(data => {
            let dados = data.json();

            dados.forEach(o => {
                this.dadosFilialDropdown.push({ label: o.codigoFilial + " - " + o.nomeFilial, value: o });
            });

        }, erro => {
            this.toastError(erro.message);
        });


    }

    private loadSituacaoDropdown() {
        this.situacaoDropdownSelecionado = null;
        //*********** Popular(Colocar) os itens dentro do DropDown ****************/
        this.dadosSituacaoDropdown.push({ label: "Selecione...", value: null });
        this.dadosSituacaoDropdown.push({ label: "Enviado", value: "E" });
        this.dadosSituacaoDropdown.push({ label: "Erro", value: "R" });
        this.dadosSituacaoDropdown.push({ label: "Pendente", value: "P" });

    }

    private loadDateByPt() {
        this.pt = {
            firstDayOfWeek: 0,
            dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
            dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
            dayNamesMin: ["Do", "Se", "Te", "Qa", "Qi", "Se", "Sa"],
            monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
            monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Aug", "Set", "Out", "Nov", "Dez"],
            today: 'Hoje',
            clear: 'Limpar',
            dateFormat: 'dd/MM/yyyy',
            weekHeader: 'Wk'
        };
    }

    private loadTipoEnvio() {
        this.tipoReenvioSelecionado = null;
        this.dadosTipoReenvio = new Array();
        this.dadosTipoReenvio.push({ label: "Selecione ...", value: null });
        this.dadosTipoReenvio.push({ label: "Venda(s)", value: "V" });
        this.dadosTipoReenvio.push({ label: "Fechamento(s)", value: "F" });
    }

    private errorMessage(message: any) {
        this.errorMessageinit(message);
        setTimeout(() => {
            this.msgsDialog = [];
        }, 3000);
    }

    private errorMessageinit(message: any) {
        this.msgsDialog = [];
        this.msgsDialog.push({ severity: 'error', summary: '', detail: message });

    }

    //******************** end methods ********************/



    constructor(injector: Injector, public sincronizador: sincronizador, public loading: loading) {
        super(injector);
        this.confirmationService = injector.get(ConfirmationService);
    }

    ngOnInit() {
        this.loading.getIsVisible();
        this.tituloSincronizacao = "Consulta de Vendas";
        this.urlControler = "/sincronizacoes";
        this.loadFilialDropdown();
        this.loadSituacaoDropdown();
        this.loadDateByPt();
        this.registrosPorPagina = 50;
        this.quantidadeRegistros = 0;
        this.loading.getNotIsVisible();
    }


    loadSearchFilters(isPaginate: boolean) {
        this.loading.getIsVisible();
        this.isActiveFieldset = isPaginate;
        const map = {
            codigoFilial: this.filialDropdownSelecionado != null ? this.filialDropdownSelecionado.codigoFilial : null,
            numeroCaixa: this.numeroCaixa,
            numeroCupom: this.numeroCupom,
            situacao: this.situacaoDropdownSelecionado,
            datasEnvio: this.rangeDates == null ? [] : this.rangeDates,
            inicial: this.posicaoInicial,
            final: this.registrosPorPagina

        }

        this.httpUtilService.post(this.urlControler + "/loadSearchFilters", map).subscribe(data => {

            const resp = data.json();
            this.quantidadeRegistros = resp.count;
            this.dadosFiltro = resp.list;
          
            this.isActiveFieldset = true;
            this.loading.getNotIsVisible();
            if (!isPaginate) {
                this.toastSuccess("Pesquisa realizada com sucesso.")
            }
        }, erro => {
            this.loading.getNotIsVisible();
            this.dadosFiltro = null;
            this.toastError(erro.message);
        })
    }

    paginate(objeto: any) {
        this.registrosPorPagina = objeto.rows;
        this.posicaoInicial = (objeto.first);

        this.loadSearchFilters(true);
    }


    clearSearchFilters() {
        this.loading.getIsVisible();
        this.isActiveFieldset = false;

        this.loadFilialDropdown();
        this.numeroCaixa = null;
        this.numeroCupom = null;
        this.loadSituacaoDropdown();
        this.rangeDates = null;

        this.dadosFiltro = null;
        this.loading.getNotIsVisible();
    }



    sincronzarVendas() {
        this.sincronizador.visible = true;
        this.sincronizador.titulo = "Enviando Vendas";
        this.sincronizador.descricaoProcess = "Upload";
        this.sincronizador.executando = true;
        this.sincronizador.msgs = "Sincronização de vendas realizado com sucesso."
        this.sincronizador.startVendaProcess();

    }
    //*************************** dialog reevio ***************************/

    showReenvio() {
        this.msgsDialog=[];
        this.rangeDatesDialog = null;
        this.numeroCaixaDialog = null;
        this.loadTipoEnvio();
        this.isDisplayReenvio = true;
    }

    confirmReenvio() {
        this.loading.getIsVisible();
        if (this.rangeDatesDialog == null || this.rangeDatesDialog == undefined || this.rangeDatesDialog == []) {
            this.errorMessage("Período para sincronização não informado.");
            return;
        }
        if (this.tipoReenvioSelecionado == null || this.tipoReenvioSelecionado == undefined) {
            this.errorMessage("Tipo de reenvio não infomado.");
            return;
        }

        const map = {
            datasReenvio: this.rangeDatesDialog == null ? [] : this.rangeDatesDialog,
            tipo: this.tipoReenvioSelecionado,
            numCaixa: this.numeroCaixaDialog
        }

        if (this.tipoReenvioSelecionado == 'V') {

            this.sincronizador.startReenvioVendasProcess(map)
                .subscribe(data => {
                    this.loading.getNotIsVisible();
                    if (data.json().hasOwnProperty('errorCode')) {
                        this.toastError(data.text());
                    } else {
                        this.toastSuccess('Vendas desmarcadas');
                    }
                }, erro => {
                    this.loading.getNotIsVisible();
                    this.toastError(erro.message)
                });

        } else {
            this.loading.getNotIsVisible();
            this.sincronizador.visible = true;
            this.sincronizador.descricaoProcess = "Upload";
            this.sincronizador.executando = true;
            this.sincronizador.titulo = "Reenviando Fechamento(s)";
            this.sincronizador.msgs = "Reenvio de Fechamento(s) realizado com sucesso.."
            this.sincronizador.startReenvioFechamentosProcess(map);
        }


        this.cancelReenvio();

    }


    cancelReenvio() {
        this.rangeDatesDialog = null;
        this.numeroCaixaDialog = null
        this.tipoReenvioSelecionado = null;
        this.isDisplayReenvio = false;
    }


}
