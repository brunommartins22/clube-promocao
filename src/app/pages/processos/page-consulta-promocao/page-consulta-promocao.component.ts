import { Component, Injector } from "@angular/core";
import { ProcessoComponent, StringUtils } from 'padrao';
import { ConfirmationService, Message } from 'primeng/api';
import { loading } from 'src/app/services/loading.service';
import { sincronizador } from 'src/app/services/sincronizador.service';

@Component({
    selector: "app-page-consulta-promocao",
    templateUrl: "./page-consulta-promocao.component.html",
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
            background-color: #CCF7D4 !important;
            color: black !important;
        }
    `
    ],
})

export class PageConsultaPromocaoComponent extends ProcessoComponent {

    confirmationService: ConfirmationService;
    tituloConsulta: any = "";
    msgsFilter: Message[] = [];
    situacao: any = null;
    pt: any = null;
    rangeDates: Date[]
    tituloPromocao: any = null;
    autorPromocao: any = null;
    isActiveFieldset: boolean = false;
    renderizarFilters: boolean = false;

    filialDropdownSelecionada: any = null;
    situacaoDropdownSelecionado: any = null;
    tipoDropdownSelecionado: any = null;
    filtroSelecionado: any = null;
    itemFiltroSelecionado: any = null;

    dadosFilialDropdown: any = [];
    dadosSituacaoDropdown: any = [];
    dadosTipoDropdown: any = [];
    dadosFiltro: any = [];

    countAtivos: number = 0;
    countInativos: number = 0;
    countPendentes: number = 0;
    countRejeitados: number = 0;




    //***************** methods ***************/

    private loadFilialDropdown() {

        this.dadosFilialDropdown = [];
        this.filialDropdownSelecionada = null;
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
                }
            }

        }, erro => {
            this.errorMessage(erro.message);
        });
    }

    private loadSituacaoDrodown() {
        this.situacaoDropdownSelecionado = null;
        this.dadosSituacaoDropdown.push({ label: "Todas", value: null });
        this.dadosSituacaoDropdown.push({ label: "Ativa", value: "A" });
        this.dadosSituacaoDropdown.push({ label: "Inativa", value: "I" });
        this.dadosSituacaoDropdown.push({ label: "Pendente", value: "P" });
        this.dadosSituacaoDropdown.push({ label: "Rejeitada", value: "R" });
    }

    private loadTipoDropdown() {
        this.tipoDropdownSelecionado = null;
        this.dadosTipoDropdown.push({ label: "Todos", value: null });
        this.dadosTipoDropdown.push({ label: "Presente Adicional", value: 1 });
        this.dadosTipoDropdown.push({ label: "Leva M Paga N", value: 2 });
        this.dadosTipoDropdown.push({ label: "Desconto Variável", value: 3 });
        this.dadosTipoDropdown.push({ label: "Desconto Adicional", value: 4 });
        this.dadosTipoDropdown.push({ label: "Preço Fixo", value: 5 });
        this.dadosTipoDropdown.push({ label: "Desconto Fixo", value: 6 });
    }


    private errorMessage(message: any) {
        this.msgsFilter = [];
        this.msgsFilter.push({ severity: 'error', summary: '', detail: message });
        setTimeout(() => {
            this.msgsFilter = [];
        }, 3000);
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

    //*************************** end Methods ***************************/

    constructor(injector: Injector, public loading: loading, public sincronizador: sincronizador) {
        super(injector);
        this.confirmationService = injector.get(ConfirmationService);
       
    };

    ngOnInit() {
        this.loading.getIsVisible();
        this.tituloConsulta = "Consulta de Promoção Scanntech"
        this.urlControler = "/promocoes";
        this.loadFilialDropdown();
        this.loadSituacaoDrodown();
        this.loadDateByPt();
        this.loadTipoDropdown();
        this.renderizarFilters = false;
        this.registrosPorPagina = 50;
        this.quantidadeRegistros = 0;
        this.loading.getNotIsVisible();
    }


    loadSearchFilters(isPaginate: boolean) {
        this.loading.getIsVisible();
        this.isActiveFieldset = isPaginate;
        const map = {
            codigoFilial: this.filialDropdownSelecionada != null ? this.filialDropdownSelecionada.codigoFilial : null,
            tipo: this.tipoDropdownSelecionado,
            situacao: this.situacaoDropdownSelecionado,
            tituloPromocao: this.tituloPromocao,
            autorPromocao: this.autorPromocao,
            validade: this.rangeDates == null ? [] : this.rangeDates,
            inicial: this.posicaoInicial,
            final: this.registrosPorPagina
        }
        this.httpUtilService.post(this.urlControler + "/findTabpromocaoByFilters", map).subscribe(data => {

            const resp = data.json();

            this.quantidadeRegistros = resp.count;
            this.dadosFiltro = resp.promocoes;

            this.countAtivos = resp.countAtivos;
            this.countInativos = resp.countInativos;
            this.countPendentes = resp.countPendentes;
            this.countRejeitados = resp.countRejeitados;

            this.isActiveFieldset = true;
            this.loading.getNotIsVisible();
            if (!isPaginate) {
                this.toastSuccess("Pesquisa realizada com sucesso.")
            }
        }, erro => {
            this.loading.getNotIsVisible();
            this.toastError(erro.message);
            this.dadosFiltro = null;
        })
    }


    clearSearchFilters() {
        this.loading.getIsVisible();
        this.isActiveFieldset = false;
        this.loadFilialDropdown();
        this.loadTipoDropdown();
        this.loadSituacaoDrodown();
        this.tituloPromocao = null;
        this.autorPromocao = null;
        this.rangeDates = null;
        this.dadosFiltro = null;
        this.filtroSelecionado = null;
        this.loading.getNotIsVisible();
    }

    onRowSelect(event) {
        this.filtroSelecionado = event.data;
    }

    onRowUnselect(event) {
        this.filtroSelecionado = event.data;

        this.editSearchFilters();

    }

    paginate(objeto: any) {
        this.registrosPorPagina = objeto.rows;
        this.posicaoInicial = (objeto.first);

        this.loadSearchFilters(true);
    }

    editSearchFilters() {
        if (this.filtroSelecionado != null) {
            this.renderizarFilters = true;
        } else {
            this.toastError("Nenhum registro selecionado.");
        }
    }

    sincronzarPromocao() {
        this.sincronizador.visible = true;
        this.sincronizador.titulo = "Baixando Promoções";
        this.sincronizador.descricaoProcess = "Download";
        this.sincronizador.executando = true;
        this.sincronizador.msgs = "Download de Promoções realizado com sucesso."
        this.sincronizador.startPromocaoProcess();

    }
    //******************************** item selecionado ************************************/

    onRowSelectItem(event) {
        this.itemFiltroSelecionado = event.data;
    }

    onRowUnselectItem(event) {
        this.itemFiltroSelecionado = event.data;

    }

    cancelItemSelected() {
        this.renderizarFilters = false;
        this.filtroSelecionado = null;
        this.itemFiltroSelecionado = null;
    }


}