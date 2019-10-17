import { Component, Injector } from "@angular/core";
import { ProcessoComponent } from 'padrao';
import { ConfirmationService } from 'primeng/api';

@Component({
    selector: "app-page-sincronizacao-vendas",
    templateUrl: "./page-sincronizacao-vendas.component.html"
})

export class PageSincronizacaoVendas extends ProcessoComponent {

    confirmationService: ConfirmationService;
    tituloSincronizacao: any = "";
    numeroCaixa: number=null;
    numeroCupom: number=null;
    pt: any="";
    isActiveFieldset: boolean = false;

    rangeDates: Date[]=null;
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


    }

    private loadSituacaoDropdown() {
        this.situacaoDropdownSelecionado = null;

        this.dadosSituacaoDropdown.push({ label: "Selecione...", value: null });
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
        this.urlControler = "sincronizacoes";
        this.loadFilialDropdown();
        this.loadSituacaoDropdown();
        this.loadDateByPt();
    }


    loadSearchFilters(){
        this.isActiveFieldset = false;
        setTimeout(() => {
            this.isActiveFieldset = true;
        }, 200);
    }
}