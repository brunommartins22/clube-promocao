import {Injectable} from '@angular/core';
import {HttpUtilService, AuthenticationService} from 'padrao';

@Injectable({
    providedIn: 'root'
})
export class CstService {

    carregarCSTIPISaida() {
        return [
            {label: 'Selecione ...', value: null},
            {label: '50 - Saída tributada ', value: '50'},
            {label: '51 - Saída tributada com alíquota zero ', value: '51'},
            {label: '52 - Saída isenta ', value: '52'},
            {label: '53 - Saída não-tributada ', value: '53'},
            {label: '54 - Saída imune ', value: '54'},
            {label: '55 - Saída com suspensão ', value: '55'},
            {label: '99 - Outras saídas ', value: '99'}
        ];
    }

    carregarCSTPisCofins() {
        return [
            {label: 'Selecione ...', value: null},
            {
                label: '01 - Operação Tributável (base de cálculo  -  valor da operação alíquota normal (cumulativo/não cumulativo));',
                value: '01'
            }
            , {label: '02 - Operação Tributável (base de cálculo  -  valor da operação (alíquota diferenciada))', value: '02'}
            , {label: '03 - Operação Tributável (base de cálculo  -  quantidade vendida x alíquota por unidade de produto)', value: '03'}
            , {label: '04 - Operação Tributável (tributação monofásica (alíquota zero))', value: '04'}
            , {label: '05 - Operação Tributável (Substituição Tributária)', value: '05'}
            , {label: '06 - Operação Tributável (alíquota zero)', value: '06'}
            , {label: '07 - Operação Isenta da Contribuição', value: '07'}
            , {label: '08 - Operação Sem Incidência da Contribuição', value: '08'}
            , {label: '09 - Operação com Suspensão da Contribuição', value: '09'}
            , {label: '49 - Outras Operações de Saída', value: '49'}
            , {label: '50 - Operação com Direito a Crédito - Vinculada Exclusivamente a Receita Tributada no Mercado Interno', value: '50'}
            , {
                label: '51 - Operação com Direito a Crédito - Vinculada Exclusivamente a Receita Não Tributada no Mercado Interno',
                value: '51'
            }
            , {label: '52 - Operação com Direito a Crédito – Vinculada Exclusivamente a Receita de Exportação', value: '52'}
            , {
                label: '53 - Operação com Direito a Crédito - Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno',
                value: '53'
            }
            , {label: '54 - Operação com Direito a Crédito - Vinculada a Receitas Tributadas no Mercado Interno e de Exportação', value: '54'}
            , {
                label: '55 - Operação com Direito a Crédito - Vinculada a Receitas Não-Tributadas no Mercado Interno e de Exportação',
                value: '55'
            }
            , {
                label: '56 - Operação com Direito a Crédito - Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno, e de Exportação',
                value: '56'
            }
            , {
                label: '60 - Crédito Presumido - Operação de Aquisição Vinculada Exclusivamente a Receita Tributada no Mercado Interno',
                value: '60'
            }
            , {
                label: '61 - Crédito Presumido - Operação de Aquisição Vinculada Exclusivamente a Receita Não-Tributada no Mercado Interno',
                value: '61'
            }
            , {label: '62 - Crédito Presumido - Operação de Aquisição Vinculada Exclusivamente a Receita de Exportação', value: '62'}
            , {
                label: '63 - Crédito Presumido - Operação de Aquisição Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno',
                value: '63'
            }
            , {
                label: '64 - Crédito Presumido - Operação de Aquisição Vinculada a Receitas Tributadas no Mercado Interno e de Exportação',
                value: '64'
            }
            , {
                label: '65 - Crédito Presumido - Operação de Aquisição Vinculada a Receitas Não-Tributadas no Mercado Interno e de Exportação',
                value: '65'
            }
            , {
                label: '66 - Crédito Presumido - Operação de Aquisição Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno, e de Exportação',
                value: '66'
            }
            , {label: '67 - Crédito Presumido - Outras Operações', value: '67'}
            , {label: '70 - Operação de Aquisição sem Direito a Crédito', value: '70'}
            , {label: '71 - Operação de Aquisição com Isenção', value: '71'}
            , {label: '72 - Operação de Aquisição com Suspensão', value: '72'}
            , {label: '73 - Operação de Aquisição a Alíquota Zero', value: '73'}
            , {label: '74 - Operação de Aquisição; sem Incidência da Contribuição', value: '74'}
            , {label: '75 - Operação de Aquisição por Substituição Tributária', value: '75'}
            , {label: '99 - Outras Operações', value: '99'}
        ];
    }

    carregarCSTIcms(){
        return [
            {label: 'Selecione ...', value: null},
            {label:'00 - Tributada integralmente',value:'00'},
            {label:'10 - Tributada e com cobrança do ICMS por substituição tributária',value:'10'},
            {label:'20 - Tributação com redução de base de cálculo',value:'20'},
            {label:'30 - Tributação Isenta ou não tributada e com cobrança do ICMS por substituição tributária',value:'30'},
            {label:'40 - Tributação Isenta',value:'40'},
            {label:'41 - Não tributada',value:'41'},
            {label:'50 - Tributação com Suspensão',value:'50'},
            {label:'51 - Tributação com Diferimento (a exigência do preenchimento das informações do ICMS diferido fica a critério de cada UF)',value:'51'},
            {label:'60 - Tributação ICMS cobrado anteriormente por substituição tributária',value:'60'},
            {label:'70 - Tributação ICMS com redução de base de cálculo e cobrança do ICMS por substituição tributária',value:'70'},
            {label:'90 - Outras',value:'90'},
            {label:'101 - Tributada pelo Simples Nacional com permissão de crédito',value:'101'},
            {label:'102 - Tributada pelo Simples Nacional sem permissão de crédito',value:'102'},
            {label:'103 - Isenção do ICMS no Simples Nacional para faixa de receita bruta',value:'103'},
            {label:'201 - Tributada pelo Simples Nacional com permissão de crédito e com cobrança do ICMS por substituição tributária',value:'201'},
            {label:'202 - Tributada pelo Simples Nacional sem permissão de crédito e com cobrança do ICMS por substituição tributária',value:'202'},
            {label:'203 - Isenção do ICMS no Simples Nacional para faixa de receita bruta e com cobrança do ICMS por substituição tributária',value:'203'},
            {label:'300 - Imune',value:'300'},
            {label:'400 - Não tributada pelo Simples Nacional',value:'400'},
            {label:'500 - ICMS cobrado anteriormente por substituição tributária (substituído) ou por antecipação',value:'500'},
            {label:'900 - Outros',value:'900'}

    ]}

}
