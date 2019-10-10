

import { Component, OnInit } from '@angular/core';
import {colors} from '@angular/cli/utilities/color';
import {DadosService} from './dados.service';


declare var google: any;

@Component({
    selector: 'app-page-dashboard',
    templateUrl: './page-dashboard.component.html'

})
export class PageDashboardComponent implements OnInit {

    private dados: any;
    private dadaosforma: any;
    private dadaoscontareceber: any;
    private dadaoscontapagar: any;

    constructor(private dadosService: DadosService) {

    }

    ngOnInit() {
        this.dadosService.obterDados().subscribe(
            dados => {
                this.dados = dados;
                this.init();
            });

        this.dadosService.obterDadosForma().subscribe(
            dados => {
                this.dadaosforma = dados;
                this.init();
            });


        this.dadosService.obterDadosContaReceber().subscribe(
            dados => {
                this.dadaoscontareceber = dados;
                this.init();
            });

        this.dadosService.obterDadosContaReceber().subscribe(
            dados => {
                this.dadaoscontapagar  = dados;
                this.init();
            });

    }

    /**
     * Inicializa a API de gráficos com delay de 1 segundo,
     * o que permite a integração da API com o Angular.
     *
     * @return void
     */
    init(): void {
        if(typeof(google) !== 'undefined') {
            google.charts.load('current', {'packages':['corechart','bar','timeline']});

            setTimeout(() => {
                google.charts.setOnLoadCallback(this.exibirGraficos());
            }, 1000);
        }
    }

    /**
     * Método chamado assim que a API de gráficos é inicializada.
     * Reponsável por chamar os métodos geradores dos gráficos.
     *
     * @return void
     */
    exibirGraficos(): void {
        this.exibir3dPieChart();
        this.exibirTimelineReceber();
        this.exibirTimelinePagar();
    }


    exibirTimelinePagar(): void {
        var options = {
            width: 400,
            height: 300,
            legend: { position: 'top', maxLines: 1 },
            bar: { groupWidth: '30%' },
            isStacked: true,
            title: 'Conta a Pagar',
            chart: { title: 'Conta a Pagar',
                subtitle: 'Conta a Pagar' },
        };
        var chart = new google.visualization.BarChart(document.getElementById("timeline_pagar"));
        chart.draw(this.obterDataTableContaPagar(), options);
    }

    obterDataTableContaPagar(): any {
        var data = google.visualization.arrayToDataTable([
            ['Genre', 'Á vencer', 'Vencendo', 'Vencido', { role: 'annotation' } ],
            ['2010', 16, 24, 50,  ''],
        ]);
        return data
    }



    exibirTimelineReceber(): void {
        var options = {
            width: 400,
            height: 300,
            legend: { position: 'top', maxLines: 1 },
            title: 'Conta a Receber',
            chart: { title: 'Conta a Receber',
                    subtitle: 'Conta a Receber',
            },
            bar: { groupWidth: '30%' },
            isStacked: true,
        };
        var chart = new google.visualization.BarChart(document.getElementById("timeline_receber"));
        chart.draw(this.obterDataTableContaReceber(), options);
    }

    obterDataTableContaReceber(): any {
        var data = google.visualization.arrayToDataTable([
            ['Genre', 'Á vencer', 'Vencendo', 'Vencido', { role: 'annotation' } ],
            ['2010', 16, 24, 50,  ''],
        ]);
        return data
    }



    /**
     * Exibe o gráfico Pie Chart em 3D.
     *
     * @return void
     */
    exibir3dPieChart(): void {
        const el = document.getElementById('3d_pie_chart');
        const chart = new google.visualization.PieChart(el);

        var options = {
            title: 'Formas de Pagamento',
            chartArea: {width: '50%'},
            width: 400,
            height: 300,
            is3D: true,

        };

        chart.draw(this.obterDataTableFormaPagamento(), options);
    }



    /**
     * Cria e retorna o objeto DataTable da API de gráficos,
     * responsável por definir os dados do gráfico.
     *
     * @return any
     */
       obterDataTableFormaPagamento(): any {
        const data = new google.visualization.DataTable();

        data.addColumn('string', 'Forma');
        data.addColumn('number', 'Valor');
        data.addRows(this.dadaosforma);

        return data;
    }





}
