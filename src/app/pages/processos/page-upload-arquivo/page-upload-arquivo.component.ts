import {Component, ViewChild, ElementRef} from '@angular/core';
import {ProcessoComponent, StringUtils} from 'padrao';
import {PageClienteComponent} from '../../page-cliente/page-cliente.component';
import {RequestOptions} from '@angular/http';

@Component({
    selector: 'app-page-upload-arquivo',
    templateUrl: './page-upload-arquivo.component.html'

})
export class PageUploadArquivoComponent extends ProcessoComponent {

    renderizarListagem = true;
    processandoForm = false;
    processandoLista = false;

    listaCenarios = [];

    processados = [];

    @ViewChild('content', {static: true}) content: ElementRef;

    // tslint:disable-next-line:use-lifecycle-interface
    ngOnInit() {

        this.urlControler = '/arquivos-processar';

        this.cols = [
            {field: 'cliente', header: 'Cliente', width: '150px'},
            {field: 'nome', header: 'Arquivo', width: '150px'},
            {field: 'numeroRegistros', header: 'Registros', width: '150px'},
            {field: 'numeroRegistrosProcessados', header: 'Processados', width: '150px'},
            {field: 'statusArquivo', header: 'Situação', width: '150px'}
        ];

        this.msgs = [];

        this.objetoSelecionado = new Object();
        this.objetoSelecionado.cliente = new Object();
        this.objetoSelecionado.cenario = new Object();

    }

    acaoConfirmar(event, inputFile) {

        console.log(event.files[0]);

        const formData = new FormData();

        if (this.objetoSelecionado.cliente.id === undefined) {
            this.showWarn('Selecione um cliente');
            return;
        } else {
            formData.append('clienteJson', JSON.stringify(this.objetoSelecionado.cliente));
        }

        this.objetoSelecionado.atributoPadrao = new Object();
        this.objetoSelecionado.atributoPadrao.idUsuario = this.auth.getAuthenticatedUser().id;
        this.objetoSelecionado.atributoPadrao.nomeUsuario = this.auth.getAuthenticatedUser().login;
        this.objetoSelecionado.atributoPadrao.dataRegistro = new Date();
        this.objetoSelecionado.atributoPadrao.dominioEvento = '1';
        formData.append('atributoPadraoJson', JSON.stringify(this.objetoSelecionado.atributoPadrao));

        if (event.files === undefined) {
            this.showError('Selecione um arquivo');
            return;
        } else {
            formData.append('file', event.files[0]);
            // this.objetoSelecionado.arquivo = event.files;
        }

        // let json = JSON.stringify(this.objetoSelecionado);

        this.processandoForm = true;

        this.httpUtilService.post(this.urlControler + '/upload', formData, this.getFileHeaders()).subscribe(data => {

            if (data.json().hasOwnProperty('errorCode')) {
                this.showError(data.text());
            } else {
                this.showSuccess('Arquivo Incluido com Sucesso na fila de processamento');
                inputFile.clear();
            }
            this.processandoForm = false;
        }, erro => {
            this.processandoForm = false;

            this.showError(erro);
        });

    }

    openModalCliente() {
        this.f11Ativo = false;
        this.modalRef = this.modal(PageClienteComponent, 'Cliente', {});
        this.modalRef.onClose.subscribe(res => {
            this.objetoSelecionado.cliente = this.dialogService.dialogComponentRef.instance
                .componentRef.instance.objetoSelecionado;

            if (this.objetoSelecionado.cliente.cenarios !== undefined && this.objetoSelecionado.cliente.cenarios.length <= 0) {
                this.showError('Cliente não possui cenarios informados');
                this.objetoSelecionado.cliente = new Object();
            }

            this.f11Ativo = true;
        });
    }

    selecionarCliente() {
        // alert(this.objetoSelecionado.cliente.id);
        if (this.objetoSelecionado.cliente.id !== undefined) {
            this.httpUtilService.get('/clientes/' + this.objetoSelecionado.cliente.id).subscribe(data => {
                // alert(data.text());

                if (data.text() === '') {
                    this.showError('Cliente não encontrado');
                    this.objetoSelecionado.cliente.id = null;
                } else {
                    this.objetoSelecionado.cliente = data.json();
                    if (this.objetoSelecionado.cliente.cenarios !== undefined && this.objetoSelecionado.cliente.cenarios.length <= 0) {
                        this.showError('Cliente não possui cenarios informados');
                        this.objetoSelecionado.cliente = new Object();
                    }
                }

            });
        }
    }

    // @ts-ignore
    getLista(tab) {

        if (tab.index === 1) {
            this.processandoLista = true;

            this.httpUtilService.get(this.urlControler + '/0/999/' + btoa('id') + '/' + btoa('*')).subscribe(data => {

                let lista = [];
                lista = data.json();

                lista.forEach(item => {item.atributoPadrao.dataRegistro = StringUtils.string2Date(item.atributoPadrao.dataRegistro); } );

                this.dados = lista;
                this.processandoLista = false;
            });

            // setTimeout(() => {
            //     // console.log('Test');
            //     this.getLista(tab);
            // }, 10000);
        }

        if (tab.index === 2) {
            this.getProcessados();
        }
    }

    getProcessados(){
        this.processandoLista = true;

        this.httpUtilService.get(this.urlControler + '/0/999/' + btoa('id') + '/' + btoa('FINALIZADO')).subscribe(data => {
            let lista = []
            lista = data.json();

            lista.forEach(item => {
                item.dataInicioProcesso = StringUtils.string2Date(item.dataInicioProcesso);
                item.dataFimProcesso = StringUtils.string2Date(item.dataFimProcesso);
            } );

            this.processados = lista;
            this.processandoLista = false;
        });
    }

    getFileHeaders(): RequestOptions {

        const headers = new Headers();
        headers.append('Content-Type', 'multipart/form-data');

        const headersParams = [
            {
                header: 'sessionId',
                value: this.auth.getAuthenticatedUser().getSessionId(),
            }
        ];

        if (headersParams) {
            for (const header of headersParams) {
                headers.append(header.header, header.value);
            }
        }

        // @ts-ignore
        return new RequestOptions({headers, withCredentials: false});

    }

    data(str: string): Date {
        let formatada = str.substr(0, 4 );
        formatada += '-' + str.substr(4, 2 );
        formatada += '-' + str.substr(6, 2 );
        formatada += ' ' + str.substr(8, 2 );
        formatada += ':' + str.substr(10, 2 );
        formatada += ':' + str.substr(12, 2 );
        // alert(formatada);
        return new Date(formatada);
    }

    // upload(data, userId) {
    //   let uploadURL = `${this.SERVER_URL}/auth/${userId}/avatar`;

    //   return this.httpClient.post<any>(uploadURL, data, {
    //     reportProgress: true,
    //     observe: 'events'
    //   }).pipe(map((event) => {

    //     switch (event.type) {

    //       case HttpEventType.UploadProgress:
    //         const progress = Math.round(100 * event.loaded / event.total);
    //         return { status: 'progress', message: progress };

    //       case HttpEventType.Response:
    //         return event.body;
    //       default:
    //         return `Unhandled event: ${event.type}`;
    //     }
    //   })
    //   );
    // }

}
