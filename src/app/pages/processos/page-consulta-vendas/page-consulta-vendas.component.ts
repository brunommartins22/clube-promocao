import { Component, Injector } from "@angular/core";
import { ProcessoComponent, StringUtils } from 'padrao';
import { ConfirmationService } from 'primeng/api';
import { loading } from 'src/app/services/loading.service';

@Component({
    selector: "app-page-consulta-vendas",
    templateUrl: "./page-consulta-vendas.component.html",
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

export class PageConsultaVendas extends ProcessoComponent {

    confirmationService: ConfirmationService;
    tituloConsultaVendas: any = "";
    isActiveFieldset: boolean = false;
    pt: any = null;
    descricaoPromocao: any = null;



    rangeDates: Date[] = null;
    dadosFilialDropdown: any = [];
    dadosFiltro: any = [];


    filialDropdownSelecionada: any = null;



    //******************** methods ************************/

    private loadFilialDropdown() {

        this.dadosFilialDropdown = [];
        this.filialDropdownSelecionada = null;

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


    //******************** end methods ********************/


    constructor(injector: Injector, public loading: loading) {
        super(injector);
        this.confirmationService = injector.get(ConfirmationService);
    }

    ngOnInit() {
        this.loading.getIsVisible();
        this.tituloConsultaVendas = "Vendas Promocionais";
        this.urlControler = "/notasaiitens";
        this.loadFilialDropdown();
        this.loadDateByPt();
        this.registrosPorPagina = 50;
        this.quantidadeRegistros = 0;
        this.loading.getNotIsVisible();
    }

    loadSearchFilters(isPaginate: boolean) {
        this.loading.getIsVisible();
        this.isActiveFieldset = isPaginate;

        const map = {
            codigoFilial: this.filialDropdownSelecionada != null ? this.filialDropdownSelecionada.codigoFilial : null,
            descricaoPromocao: this.descricaoPromocao,
            datas: this.rangeDates == undefined || this.rangeDates == null ? [] : this.rangeDates,
            inicial: this.posicaoInicial,
            final: this.registrosPorPagina
        }

        this.httpUtilService.post(this.urlControler + "/findItensByFilters", map).subscribe(data => {


            const resp = data.json();
            this.quantidadeRegistros = resp.count;
            this.dadosFiltro = resp.list;

            this.isActiveFieldset = true;
            this.loading.getNotIsVisible();
            if (!isPaginate) {
                this.toastSuccess("Pesquisa realizada com sucesso.");
            }
        }, erro => {
            this.loading.getNotIsVisible();
            this.dadosFiltro = null;
            this.toastError(erro.message);
        });
    }


    clearSearchFilters() {
        this.loading.getIsVisible();
        this.isActiveFieldset = false;

        this.loadFilialDropdown();
        this.descricaoPromocao = null;
        this.rangeDates = null;

        this.dadosFiltro = null;
        this.loading.getNotIsVisible();
    }

    paginate(objeto: any) {
        this.registrosPorPagina = objeto.rows;
        this.posicaoInicial = (objeto.first);

        this.loadSearchFilters(true);
    }


}