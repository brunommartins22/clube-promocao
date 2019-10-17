import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';

import { RaizComponent } from './raiz/raiz.component';
import { AuthenticationGuard, PageUsuarioComponent } from 'padrao';

import { PageCidadeComponent } from './pages/page-cidade/page-cidade.component';
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { PageScantechConfigComponent } from './pages/page-scanntech-config/page-scantech-config.component';
import { PageConsultaPromocaoComponent } from './pages/page-consulta-promocao/page-consulta-promocao.component';


export const routes: Routes = [

    {
        path: 'sys', component: RaizComponent,
        canActivate: [AuthenticationGuard],
        children: [
            { path: '', component: PageHomeComponent },
            { path: 'cidade', component: PageCidadeComponent },
            { path: 'usuario', component: PageUsuarioComponent },
            { path: 'home-page', component: PageHomeComponent },
            { path: 'configuracao-scanntech', component: PageScantechConfigComponent },
            { path: 'consulta-promocao-scanntech', component: PageConsultaPromocaoComponent }
        ]
    },
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' });
