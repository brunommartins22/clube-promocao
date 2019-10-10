import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';

import { RaizComponent } from './raiz/raiz.component';
import { AuthenticationGuard, PageUsuarioComponent } from 'padrao';

import { PageCidadeComponent } from './pages/page-cidade/page-cidade.component';

import { PageClienteComponent } from './pages/page-cliente/page-cliente.component';

import { PageClienteProdutoComponent } from './pages/page-cliente-produto/page-cliente-produto.component';
import { PageCenarioComponent } from './pages/page-cenario/page-cenario.component';
import { PageRegraRegimeComponent } from './pages/processos/page-regra-regime/page-regra-regime.component';
import { PageRegraNcmComponent } from './pages/processos/page-regra-ncm/page-regra-ncm.component';

import { PageRegraProdutoComponent } from './pages/processos/page-regra-produto/page-regra-produto.component';
import { PageUploadArquivoComponent } from './pages/processos/page-upload-arquivo/page-upload-arquivo.component';
import { PageProdutoGeralComponent } from './pages/page-produto-geral/page-produto-geral.component';
import { PageHomeComponent } from './pages/page-home/page-home.component';


export const routes: Routes = [

    {
        path: 'sys', component: RaizComponent,
        canActivate: [AuthenticationGuard],
        children: [
            { path: '', component: PageHomeComponent },
            { path: 'cidade', component: PageCidadeComponent },
            { path: 'usuario', component: PageUsuarioComponent },
            { path: 'cliente', component: PageClienteComponent },
            { path: 'integracao', component: PageClienteProdutoComponent },
            { path: 'cenario', component: PageCenarioComponent },
            { path: 'regra-regime', component: PageRegraRegimeComponent },
            { path: 'regra-ncm', component: PageRegraNcmComponent },
            { path: 'regra-produto', component: PageRegraProdutoComponent },
            { path: 'upload-arquivo', component: PageUploadArquivoComponent },
            { path: 'produtoGeral', component: PageProdutoGeralComponent },
            { path: 'home-page', component: PageHomeComponent }
        ]
    },
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' });
