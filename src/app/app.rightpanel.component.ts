import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {AppComponent} from './app.component';
import {ScrollPanel} from 'primeng/primeng';
import { RaizComponent } from './raiz/raiz.component';

@Component({
    selector: 'app-rightpanel',
    templateUrl: './app.rightpanel.component.html'
})
export class AppRightPanelComponent implements AfterViewInit {

    @ViewChild('scrollRightPanel', { static: true }) rightPanelMenuScrollerViewChild: ScrollPanel;

    constructor(public app: RaizComponent) {}

    ngAfterViewInit() {
        setTimeout(() => {this.rightPanelMenuScrollerViewChild.moveBar(); }, 100);
    }

    onTabChange(event) {
        setTimeout(() => {this.rightPanelMenuScrollerViewChild.moveBar(); }, 450);
    }
}
