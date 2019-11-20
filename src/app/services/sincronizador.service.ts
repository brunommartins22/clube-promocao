import { Injectable } from '@angular/core';
import { HttpUtilService } from 'padrao';
import { timer } from 'rxjs';
import { Message } from 'primeng/api';

@Injectable({ providedIn: "root" })
export class sincronizador {

    titulo: any = "";
    descricaoProcess: any = "";
    executando: boolean = false;
    envio: any = "";
    error: any = "";
    visible: boolean = false;
    isIconVisible: boolean = false;
    msgsInfo: Message[] = [];
    msgs: any = "";
    subscribe: any = null;
    isVisibleDetail: boolean = false;


    constructor(public httpUtilsService: HttpUtilService) {
    }



    public statusProcess() {
        this.httpUtilsService.get("/sincronizador/status").subscribe(data => {
            const resp = data.json();
            this.isIconVisible = false;
            this.executando = resp.executando;
            this.envio = resp.envio;
            console.log(resp);
            if (resp.envio == "ERRO") {
                this.isIconVisible = true;
                this.error = resp.log;
                this.msgs = "Falha na sincronização de dados !";
                this.msgsInfo = [];
                this.msgsInfo.push({ severity: "error", summary: "", detail: this.msgs });
            } else {

                if (!this.executando) {
                    this.msgsInfo = [];
                    this.msgsInfo.push({ severity: "success", summary: "", detail: this.msgs });
                    setTimeout(() => {
                        this.visible = false;
                        this.subscribe.unsubscribe();
                    }, 2500);
                }
            }
        }, erro => {
            this.error = erro.message;
            this.msgsInfo = [];
            this.msgsInfo.push({ severity: "error", summary: "", detail: "Falha na sincronização de dados !" });
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


    public startReenvioFechamentosProcess(objeto: any) {
        this.httpUtilsService
            .post("/sincronizador/fechamento/reenvio", objeto)
            .subscribe(res => {
                const source = timer(1000, 1000);

                this.subscribe = source.subscribe(val => this.statusProcess());
            });
    }

    public startReenvioVendasProcess(objeto: any) {
        return this.httpUtilsService
            .post("/sincronizador/vendas/desmarcar", objeto);
    }


    public closeDialog() {
        this.subscribe.unsubscribe();
        this.visible = false;

    }

    public moreDetail() {
        this.isVisibleDetail = true;
    }

    public cancelDetail() {
        this.isVisibleDetail = false;
    }


}
