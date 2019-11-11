import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css'],
  styles: [`
        .incorret {
            background-color: #B20100 !important;
            color: #ffffff !important;
        }

        .corret {
            background-color: #1CA979 !important;
            color: #ffffff !important;
        }

        .alert-file{
          background-color: #F4900C !importnt;
          color: #ffffff !important;
        }

        .div-pie{
          background-color:#FFFFFF !important;
          border-radius:5px !important;
        }
        .div-bar{
          background-color:#FFFFFF !important;
          border-radius:5px !important;
         
        }
    `
  ],
})
export class PageHomeComponent implements OnInit {

  dadosHome: any[];
  data1: any;
  data2: any;
  options1: any;
  options2: any;



  constructor() {

    this.chartBar();
    this.chartPie();

    this.dadosHome = [
      { field: "1200", brand: "Audi", header: "Clientes Adicionados: " },
      { field: "1000", brand: "BMW", header: "Arquivos Processados: " },
      { field: "2500", brand: "Honda", header: "Produtos Validados: " },
      { field: "1500", brand: "Renault", header: "Produtos Pendentes: " }
    ];


  }

  ngOnInit() {

  }


  chartBar() {
    this.data1 = {
      labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho'],
      datasets: [
        {
          label: 'Clientes Adicionados',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: [100, 59, 50, 75, 65, 35, 48]
        },
        {
          label: 'Clientes Inativos',
          backgroundColor: '#FF6961',
          borderColor: '#7CB342',
          data: [15, 2, 10, 19, 25, 12, 15]
        }
      ]
    }

    this.options1 = {
      title: {
        display: true,
        text: 'Histórico de Cliente',
        fontSize: 12
      },
      legend: {
        position: 'bottom'
      }
    };
  }

  chartPie() {
    this.data2 = {
      labels: ['Clientes Processados','Clientes Pendentes', 'Arquivos Processados','Arquivos Pendentes','Produtos Validados','Produtos Pendentes'],
      datasets: [
        {
          data: [100,10, 100,15, 200,1000],
          backgroundColor: [
            "#4BC0C0",
            "#FF473D",
            "#36A2EB",
            "#EF6216",
            "#95EF95",
            "#FFD870"
          ],
          hoverBackgroundColor: [
            "#4BC0C0",
            "#FF473D",
            "#36A2EB",
            "#EF6216",
            "#95EF95",
            "#FFD870"
          ]
        }]
    };

    this.options2 = {
      title: {
        display: true,
        text: 'Integração ao Cliente',
        fontSize: 12
      },
      legend: {
        position: 'bottom'
      }
    };

  }


}
