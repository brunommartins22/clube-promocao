import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppRoutes } from './app.routes';


import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { CodeHighlighterModule } from 'primeng/codehighlighter';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { GalleriaModule } from 'primeng/galleria';
import { GrowlModule } from 'primeng/growl';
import { InplaceModule } from 'primeng/inplace';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { LightboxModule } from 'primeng/lightbox';
import { ListboxModule } from 'primeng/listbox';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MultiSelectModule } from 'primeng/multiselect';
import { OrderListModule } from 'primeng/orderlist';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PasswordModule } from 'primeng/password';
import { PickListModule } from 'primeng/picklist';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SlideMenuModule } from 'primeng/slidemenu';
import { SliderModule } from 'primeng/slider';
import { SpinnerModule } from 'primeng/spinner';
import { SplitButtonModule } from 'primeng/splitbutton';
import { StepsModule } from 'primeng/steps';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TerminalModule } from 'primeng/terminal';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { TreeModule } from 'primeng/tree';
import { TreeTableModule } from 'primeng/treetable';
import { VirtualScrollerModule } from 'primeng/virtualscroller';



import { AppComponent } from './app.component';
import { AppRightPanelComponent } from './app.rightpanel.component';
import { AppMenuComponent, AppSubMenuComponent } from './app.menu.component';
import { AppTopBarComponent } from './app.topbar.component';
import { AppFooterComponent } from './app.footer.component';

import { PageModule } from './page.module';
import { RaizComponent } from './raiz/raiz.component';
import { PadraoModule } from 'padrao';
import { environment } from 'src/environments/environment';
import { PageCidadeComponent } from './pages/page-cidade/page-cidade.component';
import { PageClienteComponent } from './pages/page-cliente/page-cliente.component';

import { PageClienteProdutoComponent } from './pages/page-cliente-produto/page-cliente-produto.component';
import { PageCenarioComponent } from './pages/page-cenario/page-cenario.component';
import { PageRegraNcmComponent } from './pages/processos/page-regra-ncm/page-regra-ncm.component';
import { PageRegraRegimeComponent } from './pages/processos/page-regra-regime/page-regra-regime.component';
import { CenarioRegraNcmComponent } from './pages/processos/page-regra-ncm/cenario-regra-ncm/cenario-regra-ncm.component';
import { CenarioRegraRegimeComponent } from './pages/processos/page-regra-regime/cenario-regra-regime/cenario-regra-regime.component';
import { PageDashboardComponent } from './pages/page-dashboard/page-dashboard.component';
import { DadosService } from './pages/page-dashboard/dados.service';
import { PageRegraProdutoComponent } from './pages/processos/page-regra-produto/page-regra-produto.component';
import { PageUploadArquivoComponent } from './pages/processos/page-upload-arquivo/page-upload-arquivo.component';
import { PageProdutoGeralComponent } from './pages/page-produto-geral/page-produto-geral.component';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { PageCnaeComponent } from './pages/page-cnae/page-cnae.component';
import { PageHomeComponent } from './pages/page-home/page-home.component';
registerLocaleData(ptBr)

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutes,
        HttpClientModule,
        BrowserAnimationsModule,
        AccordionModule,
        AutoCompleteModule,
        BreadcrumbModule,
        ButtonModule,
        CalendarModule,
        CardModule,
        CarouselModule,
        ChartModule,
        CheckboxModule,
        ChipsModule,
        CodeHighlighterModule,
        ConfirmDialogModule,
        ColorPickerModule,
        ContextMenuModule,
        DataViewModule,
        DialogModule,
        DropdownModule,
        EditorModule,
        FieldsetModule,
        FileUploadModule,
        FullCalendarModule,
        GalleriaModule,
        GrowlModule,
        InplaceModule,
        InputMaskModule,
        InputSwitchModule,
        InputTextModule,
        InputTextareaModule,
        LightboxModule,
        ListboxModule,
        MegaMenuModule,
        MenuModule,
        MenubarModule,
        MessageModule,
        MessagesModule,
        MultiSelectModule,
        OrderListModule,
        OrganizationChartModule,
        OverlayPanelModule,
        PaginatorModule,
        PanelModule,
        PanelMenuModule,
        PasswordModule,
        PickListModule,
        ProgressBarModule,
        RadioButtonModule,
        RatingModule,
        ScrollPanelModule,
        SelectButtonModule,
        SlideMenuModule,
        SliderModule,
        SpinnerModule,
        SplitButtonModule,
        StepsModule,
        TableModule,
        TabMenuModule,
        TabViewModule,
        TerminalModule,
        TieredMenuModule,
        ToastModule,
        ToggleButtonModule,
        ToolbarModule,
        TooltipModule,
        TreeModule,
        TreeTableModule,
        VirtualScrollerModule,
        PageModule,
        PadraoModule.forRoot(environment.API_URL, environment.GRUPO_SISTEMA)

    ],
    declarations: [
        AppComponent,
        AppRightPanelComponent,
        AppMenuComponent,
        AppSubMenuComponent,
        AppTopBarComponent,
        AppFooterComponent,
        // DashboardDemoComponent,
        // SampleDemoComponent,
        // FormsDemoComponent,
        // DataDemoComponent,
        // PanelsDemoComponent,
        // OverlaysDemoComponent,
        // MenusDemoComponent,
        // MessagesDemoComponent,
        // MessagesDemoComponent,
        // MiscDemoComponent,
        // ChartsDemoComponent,
        // EmptyDemoComponent,
        // FileDemoComponent,
        // DocumentationComponent,
         RaizComponent,


        PageCidadeComponent,
        PageClienteComponent,
        PageClienteProdutoComponent,
        PageCenarioComponent,
        PageRegraNcmComponent,
        PageRegraRegimeComponent,
        CenarioRegraNcmComponent,
        CenarioRegraRegimeComponent,
        PageRegraProdutoComponent,
        PageUploadArquivoComponent,
        PageDashboardComponent,
        PageRegraProdutoComponent,
        PageProdutoGeralComponent,
        PageCnaeComponent,
        PageHomeComponent
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        DadosService,
        { provide: LOCALE_ID, useValue: 'pt' }
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        CenarioRegraNcmComponent,
        CenarioRegraRegimeComponent,
        PageCnaeComponent,
        PageClienteComponent
    ]
})
export class AppModule { }
