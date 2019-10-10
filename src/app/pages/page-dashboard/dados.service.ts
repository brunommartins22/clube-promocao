import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DadosService {

	readonly dados = [
        ['Janeiro', 33],
        ['Fevereiro', 68],
        ['Março', 49],
        ['Abril', 15],
        ['Maio', 80],
        ['Junho', 27]
    ]


    readonly dadosforma = [
        ['Dinheiro', 30],
        ['Débito', 30],
        ['Credito', 30],

    ]


    readonly dadosreceber = [
        ['2010', 16, 24, 50,  '']
    ]


    readonly dadospagar = [
        ['2010', 16, 24, 50,  '']
    ]

	constructor() {}

    obterDadosForma(): Observable<any> {
        return new Observable(observable => {
            observable.next(this.dadosforma);
            observable.complete();
        });
    }


    obterDadosContaReceber(): Observable<any> {
        return new Observable(observable => {
            observable.next(this.dadosreceber);
            observable.complete();
        });
    }


    obterDadosContaRPagar(): Observable<any> {
        return new Observable(observable => {
            observable.next(this.dadospagar);
            observable.complete();
        });
    }


    /**
	 * Retorna um observable contendo os dados a serem
	 * exibidos no gráfico.
	 *
	 * @return Observable<any>
	 */
	obterDados(): Observable<any> {
		return new Observable(observable => {
			observable.next(this.dados);
			observable.complete();
		});
	}





}
