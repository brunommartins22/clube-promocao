import { Component, Injector } from "@angular/core";
import { ProcessoComponent, StringUtils } from 'padrao';
import { ConfirmationService } from 'primeng/api';

@Component({
    selector: "app-page-sincronizacao-vendas",
    templateUrl: "./page-sincronizacao-vendas.component.html"
})

export class PageSincronizacaoVendas extends ProcessoComponent {

    confirmationService: ConfirmationService;
    tituloSincronizacao: any = "";
    loading: boolean = false;
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



    //******************** methods ************************/

    private loadFilialDropdown() {
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


    //******************** end methods ********************/



    constructor(injector: Injector) {
        super(injector);
        this.confirmationService = injector.get(ConfirmationService);
    }

    ngOnInit() {
        this.tituloSincronizacao = "Sincronização de Vendas";
        this.urlControler = "/sincronizacoes";
        this.loadFilialDropdown();
        this.loadSituacaoDropdown();
        this.loadDateByPt();
    }


    loadSearchFilters() {
        this.loading = true;
        this.isActiveFieldset = false;
        const map = {
            codigoFilial: this.filialDropdownSelecionado != null ? this.filialDropdownSelecionado.codigoFilial : null,
            numeroCaixa: this.numeroCaixa,
            numeroCupom: this.numeroCupom,
            situacao: this.situacaoDropdownSelecionado,
            datasEnvio: this.rangeDates == null ? [] : this.rangeDates
        }

        this.httpUtilService.post(this.urlControler + "/loadSearchFilters", map).subscribe(data => {

            this.dadosFiltro = data.json();
            this.dadosFiltro.forEach(o => {
                o.dataEnvio = StringUtils.string2Date(o.dataEnvio);
            });

            this.isActiveFieldset = true;
            this.loading = false;
            this.toastSuccess("Pesquisa realizada com sucesso.")
        }, erro => {
            this.loading = false;
            this.dadosFiltro = null;
            this.toastError(erro.message);
        })
    }


    clearSearchFilters() {
        this.loading = true;
        this.isActiveFieldset = false;

        this.loadFilialDropdown();
        this.numeroCaixa = null;
        this.numeroCupom = null;
        this.loadSituacaoDropdown();
        this.rangeDates = null;

        this.dadosFiltro = null;
        this.loading = false;
    }
}