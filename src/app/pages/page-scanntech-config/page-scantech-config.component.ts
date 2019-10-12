import { Component, Injector } from '@angular/core';
import { ProcessoComponent } from 'padrao';
import { ConfirmationService } from 'primeng/api';

@Component({
    selector: 'app-page-scanntech-config',
    templateUrl: './page-scanntech-config.component.html',
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

export class PageScantechConfigComponent extends ProcessoComponent  {
     
    confirmationService: ConfirmationService;
    tituloConfiguracao:any="";



    constructor(injector: Injector) {
        super(injector);
        this.confirmationService = injector.get(ConfirmationService);
    };

    ngOnInit() {
     this.tituloConfiguracao = "Configuração Clube de Promoção";
     this.urlControler = "/configuracoes";
    }


}