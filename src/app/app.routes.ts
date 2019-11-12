import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard, PageUsuarioComponent } from 'padrao';
import { LoginComponent } from './pages/login/login.component';
import { PageConsultaPromocaoComponent } from './pages/processos/page-consulta-promocao/page-consulta-promocao.component';
import { PageConsultaVendas } from './pages/processos/page-consulta-vendas/page-consulta-vendas.component';
import { PageHomeComponent } from './pages/processos/page-home/page-home.component';
import { PageScantechConfigComponent } from './pages/processos/page-scanntech-config/page-scantech-config.component';
import { PageSincronizacaoVendas } from './pages/processos/page-sincronizacao-vendas/page-sincronizacao-vendas.component';
import { RaizComponent } from './raiz/raiz.component';




export const routes: Routes = [

    {
        path: 'sys', component: RaizComponent,
        canActivate: [AuthenticationGuard],
        children: [
            { path: '', component: PageHomeComponent },
            { path: 'usuario', component: PageUsuarioComponent },
            { path: 'home-page', component: PageHomeComponent },
            { path: 'configuracao-scanntech', component: PageScantechConfigComponent },
            { path: 'consulta-promocao-scanntech', component: PageConsultaPromocaoComponent },
            { path: 'sincronizacao-vendas', component: PageSincronizacaoVendas },
            { path: 'consulta-vendas', component: PageConsultaVendas }
        ]
    },
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' });
