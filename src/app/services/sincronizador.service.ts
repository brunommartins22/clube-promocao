import { Injectable } from '@angular/core';
import { HttpUtilService } from 'padrao';
import { timer } from 'rxjs';
import { Message } from 'primeng/api';

@Injectable({ providedIn: "root" })
export class sincronizador {

    titulo: any = "";
    executando: boolean = false;
    envio: any = "";
    error: any = "";
    visible: boolean = false;
    msgsInfo: Message[] = [];
    msgs: any = "";
    subscribe: any = null;


    constructor(public httpUtilsService: HttpUtilService) {

    }



    public statusProcess() {
        this.httpUtilsService.get("/sincronizador/status").subscribe(data => {
            const resp = data.json();
            this.executando = resp.executando;
            this.envio = resp.envio;
            if (!this.executando) {
                this.msgsInfo = [];
                this.msgsInfo.push({ severity: "success", summary: "", detail: this.msgs });
                setTimeout(() => {
                    this.visible = false;
                    this.subscribe.unsubscribe();
                }, 2500);
            }
        }, erro => {
            this.error = erro.message;
        });
    }

    public stopProcess() {
        this.httpUtilsService.post("/sincronizador/stop", []).subscribe();
    }

    public startAllProcess() {
        this.httpUtilsService.post("/sincronizador/start", []).subscribe();

        const source = timer(1000, 1000);

        this.subscribe = source.subscribe(val =>
            this.statusProcess()
        );

    }

    public startVendaProcess() {
        this.httpUtilsService
            .post("/sincronizador/venda/start", [])
            .subscribe((res) => {
                const source = timer(1000, 1000);

                this.subscribe = source.subscribe(val =>
                    this.statusProcess()
                );
            });
    }

    public startPromocaoProcess() {
        this.httpUtilsService
            .post("/sincronizador/promocao/start", [])
            .subscribe(res => {
                const source = timer(1000, 1000);

                this.subscribe = source.subscribe(val => this.statusProcess());
            });
    }


}
